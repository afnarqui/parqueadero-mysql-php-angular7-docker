import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../services/vehiculos/vehiculos.service';
import { CeldasService } from '../services/celdas/celdas.service';
import { VehiculosParqueadosService } from '../services/vehiculosparqueados/vehiculos-parqueados.service';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { IfStmt } from '@angular/compiler';
import { Vehiculo } from '../interfaces/Vehiculo';
import { VehiculosParqueados } from '../interfaces/VehiculosParqueados';
import { VehiculosParqueadosPagos } from '../interfaces/vehiculosParqueadosPagos';
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-celdas',
  templateUrl: './celdas.component.html',
  styleUrls: ['./celdas.component.css'],
  animations: [
      trigger('openClose', [
          state('collapsed, void', style({height:'0px'})),
          state('expanded', style({height:'*'})),
          transition('collapsed <=> expanded',[animate(300,style({height:'*'})),
              animate(300)])
  
      ])
  ]  
})
export class CeldasComponent implements OnInit {
  url = environment.URL_SERVICIOS_LOCALES;
  movies:any
  celdas:any;
  data:any = []
  public placa:any ="";
  public marca:any = "";
  public formState: string = 'collapsed'
  public formStatebool:boolean= false
  vehiculo:Vehiculo = {
    placa: null,
    marca:null,
  }
  editar:boolean = false;
  id:any;
  fecha_entrada:Date;
  vehiculosparqueados:VehiculosParqueados = {
    vehiculos_id:null,
    celdas_id:null,
    fecha_entrada:null,
    fecha_salida:null,
    estado:null
  }
  arrayvehiculosparqueadero:VehiculosParqueados[] = [];
  arrayvehiculosparqueaderoProcesados:VehiculosParqueadosPagos[] = [];
  arrayvehiculosparqueaderoTodos:VehiculosParqueadosPagos[] = [];
  textoboton:string = 'Ingresar vehículo';
  arrayvehiculos:any = {
    id:null,
    placa:null,
    marca:null,
    created_at:null,
    update_at:null
}
  namealegra:any=''
  constructor(private servicioVehiculos:VehiculosService,private servicioCeldas:CeldasService,
              private servicioVehiculosParqueadosService:VehiculosParqueadosService
    ) {
      this.servicioCeldas.getAlegra().subscribe((data)=>{


        debugger
      },(error)=>{
        debugger
      })
   }

  ngOnInit() {
    this.traerDatos()
    
  }

  traerDatos(){
    this.traerVehiculos();
    this.buscarCeldasOcupadas();
  }

  traerVehiculos(){
    this.servicioVehiculos.get()
    .subscribe((data)=>{
      let dataAntes = JSON.stringify(data)
      let dataValores = JSON.parse(dataAntes)
      
        if(dataValores.length){
          this.arrayvehiculos = dataValores
        }
      })
  }


  buscarCeldasOcupadas(){
    this.servicioCeldas.get()
    .subscribe((data)=>{
      let dataAntes = JSON.stringify(data)
      let dataValores = JSON.parse(dataAntes)

      this.servicioVehiculosParqueadosService.get()
        .subscribe((valoresparqueadero)=>{
          if(valoresparqueadero){
            let cadenavaloresparqueadero = JSON.stringify(valoresparqueadero)
            let arrayvaloresparqueadero = JSON.parse(cadenavaloresparqueadero)
              this.arrayvehiculosparqueadero =  arrayvaloresparqueadero
              
              for(let i = 0 ; i < dataValores.length;i++){
                for(let k = 0;k < arrayvaloresparqueadero.length;k++){
                  
                  if(dataValores[i].id === arrayvaloresparqueadero[k].celdas_id && arrayvaloresparqueadero[k].estado == 'P'){
                    
                    dataValores[i]['color'] = 'card text-white bg-success mb-3'
                    let placanueva = this.arrayvehiculos.filter((item)=>{
                     
                      
                      return item.id ==arrayvaloresparqueadero[k].vehiculos_id
                    })
                    dataValores[i]['placa'] = placanueva[0].placa;
                    
                  }else{
                  
                  }
                }
              }
              
        
             let nuevaData = this.agrupar(dataValores, 10 );

             this.celdas = nuevaData
             
             
          }else{
            this.celdas = dataValores
          }
        },(error)=>{
          console.log(error);
        })
    },
    (error)=>{
       console.log(error)
    })
  }

  private agrupar( arr:any, tamano:number ){
    let nuevoArreglo = [];
    for( let i = 0; i<arr.length; i+=tamano ){
      nuevoArreglo.push( arr.slice(i, i+tamano) );
    }

    return nuevoArreglo;

  }

  buscarPlaca(placaafn:any,i:any){
   this.editar = false;   
   setTimeout(() => {
     
    
   if(placaafn['value']!==""){
       this.vehiculo.placa = placaafn['value']
   }else{
        placaafn['value'] = ""
       return
   }  
    if(this.vehiculo.placa===""){
        return false
    }
    let placa = this.vehiculo.placa
    
    if(placa.length>3){
    this.formState = 'expanded'
    this.formStatebool = true
     this.servicioVehiculos.get()
     .subscribe((data)=>{
       let dataAntes = JSON.stringify(data)
       let dataValores = JSON.parse(dataAntes)
       
         if(dataValores.length){
             let nuevaplaca = placa.toLowerCase()
             dataValores.forEach(element => {
                 if(element.placa.toLowerCase() === nuevaplaca ){
                   let placavehiculo = element.placa;
                   let marcavehiculo = element.marca;
                   this.vehiculo.placa = element.placa;
                   this.vehiculo.marca = element.marca;
                   this.vehiculo.id = element.id;
                   
                   let valorCelda = this.arrayvehiculosparqueadero.filter(item => item.estado !== "F" && item.vehiculos_id === element.id);
                   let texto = ''
                   let datosProcesados = []
                   
                   if(valorCelda.length>0){
                     let id = valorCelda[0].id;
                     let celdas_id = valorCelda[0].celdas_id;
                     let fecha_entrada = valorCelda[0].fecha_entrada;
                     let vehiculos_id = valorCelda[0].vehiculos_id;
          
                     let cantidadAgrupada = this.celdas[0].length;
                     for(let z = 0;z <cantidadAgrupada;z++){
                        if(this.celdas[0][z].id === celdas_id){
                         texto = 'Ingresar vehículo';
                         this.celdas[0][z].color = 'card text-white bg-danger mb-3';
                         this.celdas[0][z].fecha_entrada = fecha_entrada;
                         this.celdas[0][z].vehiculos_id = vehiculos_id;
                         this.celdas[0][z].id = id;
                         this.celdas[0][z].placavehiculo = placavehiculo;
                         this.celdas[0][z].marcavehiculo = marcavehiculo;
                         this.celdas[0][z].celdas_id= celdas_id;
                         this.celdas[0][z].fecha_salida = null ;
                         this.celdas[0][z].estado = "P";
                         datosProcesados.push(this.celdas[0][z])
                       }
                       if(this.celdas[1][z].id === celdas_id){
                        texto = 'Ingresar vehículo';
                        this.celdas[1][z].color = 'card text-white bg-danger mb-3';
                        this.celdas[1][z].fecha_entrada = fecha_entrada;
                        this.celdas[1][z].vehiculos_id = vehiculos_id;
                        this.celdas[1][z].id = id;
                        this.celdas[1][z].placavehiculo = placavehiculo;
                        this.celdas[1][z].marcavehiculo = marcavehiculo;
                        this.celdas[1][z].celdas_id= celdas_id;
                        this.celdas[1][z].fecha_salida = null ;
                        this.celdas[1][z].estado = "P";
                        datosProcesados.push(this.celdas[1][z])
                      }
                     }
   
                     if(datosProcesados.length>0){
                       this.buscardatosProcesados(datosProcesados)
                       this.textoboton = texto;
                       this.editar = true;  
                     }
                   }
                   

                 }
             });
         }else{
             this.formState = 'expanded'
             this.formStatebool = true

         }
     },(error)=>{
         console.log(error)
     })
    }
     }, 3000);

 }  


 buscarPlacaUnica(laplaca:any){
        let placa = laplaca

        this.formState = 'expanded'
        this.formStatebool = true
         this.servicioVehiculos.get()
         .subscribe((data)=>{
           let dataAntes = JSON.stringify(data)
           let dataValores = JSON.parse(dataAntes)
           let datosProcesados = []
             if(dataValores.length){
                 let nuevaplaca = placa.toLowerCase()
                 dataValores.forEach(element => {
                     if(element.placa.toLowerCase() === nuevaplaca ){
                       let placavehiculo = element.placa;
                       let marcavehiculo = element.marca;
                       this.vehiculo.placa = element.placa;
                       this.vehiculo.marca = element.marca;
                       this.vehiculo.id = element.id;
                       
                       let valorCelda = this.arrayvehiculosparqueadero.filter(item => item.estado === "P" && item.vehiculos_id === element.id);
                       let texto = ''
                       
                       if(valorCelda.length>0){
                         let id = valorCelda[0].id;
                         let celdas_id = valorCelda[0].celdas_id;
                         let fecha_entrada = valorCelda[0].fecha_entrada;
                         let vehiculos_id = valorCelda[0].vehiculos_id;
                      
                         
                         let cantidadAgrupada = this.celdas[0].length;
                         for(let z = 0;z <cantidadAgrupada;z++){
                            if(this.celdas[0][z].id === celdas_id){
                             texto = 'Pagar';
                             this.celdas[0][z].color = 'card text-white bg-danger mb-3';
                             this.celdas[0][z].fecha_entrada = fecha_entrada;
                             this.celdas[0][z].vehiculos_id = vehiculos_id;
                             this.celdas[0][z].id = id;
                             this.celdas[0][z].placavehiculo = placavehiculo;
                             this.celdas[0][z].marcavehiculo = marcavehiculo;
                             this.celdas[0][z].celdas_id= celdas_id;
                             this.celdas[0][z].fecha_salida = null ;
                             this.celdas[0][z].estado = "P";
                             datosProcesados.push(this.celdas[0][z])
                           }
                           if(this.celdas[1][z].id === celdas_id){
                            texto = 'Pagar';
                            this.celdas[1][z].color = 'card text-white bg-danger mb-3';
                            this.celdas[1][z].fecha_entrada = fecha_entrada;
                            this.celdas[1][z].vehiculos_id = vehiculos_id;
                            this.celdas[1][z].id = id;
                            this.celdas[1][z].placavehiculo = placavehiculo;
                            this.celdas[1][z].marcavehiculo = marcavehiculo;
                            this.celdas[1][z].celdas_id= celdas_id;
                            this.celdas[1][z].fecha_salida = null ;
                            this.celdas[1][z].estado = "P";
                            datosProcesados.push(this.celdas[1][z])
                          }
                         }
                         
                         if(datosProcesados.length>0){
                           this.buscardatosProcesados(datosProcesados)
                           this.textoboton = texto;
                           this.editar = true;  
                         }
                       }
                       

                     }
                 });
             }else{
                 this.formState = 'expanded'
                 this.formStatebool = true

             }
         },(error)=>{
             console.log(error)
         })
 }

 toggleForm(){
  this.formState = (this.formState == 'collapsed') ? 'expanded' : 'collapsed'
  this.formStatebool = !this.formStatebool
  if(!this.formStatebool){
    this.placa = '';
  }
}
label(){
  
  if(this.formState  === 'collapsed'){
    this.vehiculo.placa = ''
  }
  return (this.formState == 'collapsed') ? 'Ingrese la marca' : 'Ocultar'
}
icon(){
return (this.formState == 'collapsed') ? 'arrow-dropright-circle' : 'arrow-dropleft-circle'
}    
mensajeToast(mensaje: string) {
  alert(mensaje);
}     

limpiar(){
  this.vehiculo.placa='';
  this.vehiculo.marca='';
  this.formState = 'collapsed'
  this.formStatebool = false
  this.textoboton = 'Ingresar vehículo';
  this.editar = false;
}
guardar(){
  if(this.vehiculo.placa!==null && this.vehiculo.marca!==null){
    if(!this.editar){
      this.servicioVehiculos.guardar(this.vehiculo)
      .subscribe((data)=>{
        
        this.vehiculosparqueados.estado = 'P';

        this.vehiculosparqueados.fecha_entrada = this.devolverFecha();
        this.vehiculosparqueados.fecha_salida = this.vehiculosparqueados.fecha_entrada;
        this.vehiculosparqueados.vehiculos_id = data['id'];
        let placa = this.vehiculo.placa

        let celdas_id
        this.servicioCeldas.buscarCeldaAleatoria(this.celdas,-1,1).then((data)=>{
          celdas_id = data;
          this.vehiculosparqueados.celdas_id = celdas_id;
   
          this.servicioVehiculosParqueadosService.guardar(this.vehiculosparqueados)
          .subscribe((data)=>{
            this.limpiar();
            this.traerDatos()
            console.log(data)
          },(error)=>{
            this.limpiar();
            this.traerDatos()
            console.log(error)
          })
        })
      },(error)=>{
        
        console.log(error);
      })
    }else{
    }
    
  }else{
    if(this.vehiculo.placa===null){
      alert('La placa es obligatoria verifique..');
      return
    }
    if(this.vehiculo.marca===null){
      alert('La marca es obligatoria verifique..');
      return
    }    
  }
}
devolverFecha(): string{
  var f = new Date();
  let fechaSinFormato = f.getFullYear() + "-" +  (f.getMonth() +1) +  "-" + f.getDate() 
  let horas = f.getHours();
  let minutos = f.getMinutes();
  let segundos = f.getSeconds();
  let fecha = this.formatearCadena(fechaSinFormato)
  return `${fecha} ${horas}:${minutos}:${segundos}`
 }

 formatearCadena(cadena){
  let valorinicial = cadena.length
  let primero,segundo,ultimo
  primero = cadena.substr(0,4)
  segundo = cadena.substr(5,2)
  ultimo = cadena.substr(valorinicial - 2, valorinicial)    
  if(valorinicial != 10){
    let recorrer = cadena.split('-')
    for(var i = 0; i < recorrer.length;i++) {
      if(i == 1 && recorrer[i].length == 1) {
        segundo = `0${recorrer[i]}`
      }
      if(i == 2 && recorrer[i].length == 1){
        ultimo = `0${recorrer[i]}`
      }
    }
  }
  return `${primero}-${segundo}-${ultimo}`
}
buscardatosProcesados(data:any){
  let valor = this.servicioCeldas.buscarValorPagar(data[0].fecha_entrada)
  let valornuevo = valor[0].valor;
  let cadena = valor[0].cadena;
  this.arrayvehiculosparqueaderoProcesados = [];
  this.arrayvehiculosparqueaderoProcesados.push({
    id:data[0].id,
    vehiculos_id:data[0].vehiculos_id,
    celdas_id:data[0].celdas_id,
    fecha_entrada:data[0].fecha_entrada,
    fecha_salida:data[0].fecha_salida,
    estado:data[0].estado,
    created_at:data[0].created_at,
    update_at:data[0].update_at,
    nombrecelda:data[0].nombre,
    placavehiculo:data[0].placavehiculo,
    marcavehiculo:data[0].marcavehiculo,
    valorpagar:valornuevo,
    cadena:cadena,
  })  
 
}
Pagar(item:any){
  this.paga(item);
}
paga(item:any){
  let celdas_anterior = item.celdas_id
  let vehiculoActualizar:VehiculosParqueados = {
    id:item.id,
    vehiculos_id:item.vehiculos_id,
    celdas_id:item.celdas_id,
    fecha_entrada:item.fecha_entrada,
    fecha_salida:this.devolverFecha(),
    estado:'F',
    created_at:item.created_at,
    update_at:item.update_at
  }
  
  this.servicioVehiculosParqueadosService.actualizar(vehiculoActualizar)
    .subscribe((data)=>{
      debugger
      this.servicioCeldas.guardarAlegra(vehiculoActualizar)
      .subscribe((dataAlegra)=>{
        debugger
            let lacelda = celdas_anterior
          
            this.servicioCeldas.buscarCeldaAleatoria(this.celdas,lacelda,-1).then((data)=>{
              let id = lacelda
              let celdas_id:any = data;
            
      
              if(celdas_id>9){
                if( this.celdas[1][id - 1]['color'] !== undefined) {
                  this.arrayvehiculosparqueaderoProcesados = [];
                  this.actualizarCelda(this.celdas[1][id - 1],id,celdas_id)
                }
              }else{
                this.arrayvehiculosparqueaderoProcesados = [];
                this.actualizarCelda(this.celdas[0][id - 1],id,celdas_id)
              }
              this.limpiar();
              this.traerDatos()
              let celdaId = data['celdas_id'];
              this.celdas[celdaId]['color'] = 'card text-white bg-secondary mb-3'
            })
  
        alert('Factura pagada con exito');
      },(error)=>{
        debugger
      })

    },(error)=>{
      console.log(error)})
}

actualizarCelda(item:any,celdaactualizar:any,celdaanterior:any){
  
  let celda = celdaactualizar
  let celdaanter = celdaanterior
  this.servicioVehiculosParqueadosService.get()
  .subscribe((data)=>{
    
    let cdata = JSON.stringify(data)
    let adata = JSON.parse(cdata)
    let vehiculoId
    let fecha
    let id

    for(let i =0;i<adata.length;i++){
      if(adata[i].celdas_id == celdaanter + 1 ){
        
        vehiculoId = adata[i].vehiculos_id
        fecha = adata[i].fecha_entrada
        id = adata[i].id
        i = adata.length + 1
        

      }
    }

    let vehiculoActualizar:VehiculosParqueados = {
      id:id,
      vehiculos_id:vehiculoId,
      celdas_id:celda,
      fecha_entrada:fecha,
      estado:'P',
    }
    this.arrayvehiculosparqueaderoProcesados = [];
    this.servicioVehiculosParqueadosService.actualizar(vehiculoActualizar)
    .subscribe((data)=>{
      
      this.limpiar()
      this.traerDatos()
    },(error)=>{
      
    })

  },(error)=>{
    console.log(error)
  })

}
pagarValidando(item:any){
    this.arrayvehiculosparqueaderoProcesados = [];
    this.buscarPlacaUnica(item.placa);
}

}
