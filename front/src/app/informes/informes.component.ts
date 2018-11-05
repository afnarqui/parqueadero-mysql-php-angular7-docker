import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { ActivatedRoute } from '@angular/router';
import { VehiculosService } from '../services/vehiculos/vehiculos.service';
import { CeldasService } from '../services/celdas/celdas.service';
import { VehiculosParqueadosService } from '../services/vehiculosParqueados/vehiculos-parqueados.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  datosPaginaSeguridad:any[] = []
  datosPaginaSeguridadReal:any[] = []
  parsedData:any
  parsedDataReal:any
  parseDataHeader:any
  id:any
  arrayvehiculos:any
  arrayceldas:any
  arrayparqueados:any
  visualizarDescarga:boolean=false;
  constructor(
    private  servicioVehiculosParqueadosService:VehiculosParqueadosService,
    private servicioCeldas:CeldasService,private servicioVehiculos:VehiculosService,private papa:Papa,private activatedRoute:ActivatedRoute) { 

    this.datosPaginaSeguridad = []
    this.datosPaginaSeguridad = [
      { "titulo":"Celdas","id":1},
        { "titulo":"Vehículos","id":2}
    ]

    this.datosPaginaSeguridadReal = [
     {  "titulo":"Distribución celdas","id":1,'nombre':'celdas'},
     {  "titulo":"Vehículos en el parqueadero","id":2,'nombre':'vehiculos'},
     {  "titulo":"Celdas más ocupadas","id":2,'nombre':'celdasocupadas'}
    ]
    
   }

  ngOnInit() {
   this.buscarDatos()
  }
  
  buscarDatos(){
    this.traerVehiculos();
    this.buscarCeldas();
    this.buscarHistorialParqueadero();
  }
  buscarHistorialParqueadero(){
    this.servicioVehiculosParqueadosService.get()
    .subscribe((data)=>{
      let dataAntes = JSON.stringify(data)
      let dataValores = JSON.parse(dataAntes)
        if(dataValores.length){
          this.arrayparqueados = dataValores
        }
      })
  }
  buscarCeldas(){
    this.servicioCeldas.get()
    .subscribe((data)=>{
      let dataAntes = JSON.stringify(data)
      let dataValores = JSON.parse(dataAntes)
      
        if(dataValores.length){
          this.arrayceldas = dataValores
        }
      })
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

  visualizarInforme(item:any){
    let data:any
    switch(item){
      case 'celdas' :
      data = this.visualizarDistribucionCeldas()
      break;
      case 'vehiculos' :
        data = this.visualizarTiempoTranscurridoVehiculos()
      break;
      case 'celdasocupadas' :
        data = this.celdasMasUtilizadas()
      break;  
      
    }
    return data
  }

  armarInforme(nombre:any){
    let data = this.visualizarInforme(nombre)
    this.generarGrid(data);
  }


  generarGrid(data:any){

    let cadena = ''
    let cabeza = ''
    let eliminarCampo = false

    let dataNueva = []
    let dataNuevaTemp = []
    if(data.length>1){
      eliminarCampo = true
    }

    for(var i = 0; i< data.length;i++){
      if(i==0){
        cadena+= `${ Object.keys(data[i])},`
        i = data.length + 1
      }
    }
    cadena = cadena.substr(cadena.length - 1, 1) == ',' ? cadena.substring(0, cadena.length - 1) : cadena;
    cadena  = cadena + '\n'

    for (let item of data) {
      for (const key of Object.keys(item)) {
        cadena+=`${item[key]},`
        }
        cadena=`${cadena}\n`
    }


    
    cadena = cadena.substr(cadena.length - 1, 1) == ',' ? cadena.substring(0, cadena.length - 1) : cadena;


    let realvalorgrid = ''
    

    realvalorgrid = `${cadena}`

    this.parsedData = this.papa.parse(realvalorgrid).data
    
    
      this.parseDataHeader =  this.parsedData[0]

    
    if(eliminarCampo){
      this.parsedData.splice(0,1)
    }

    this.parsedDataReal = this.parsedData
    debugger
    this.visualizarDescarga = true
  }


  descargar(name:any){
    let csv = this.papa.unparse({
      fields: this.parsedData,
      data: this.parseDataHeader
    })

    var blob = new Blob([csv])
    var a = window.document.createElement("a")
    a.href = window.URL.createObjectURL(blob)
    a.download = name + '.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }


  visualizarDistribucionCeldas(){
    let data = this.celdasConFecha('F')

    if(data.length>0){
      let agregarCelda = 0
      for(let i = 0;i <this.arrayceldas.length;i++){
        agregarCelda = 0
        for(let k = 0; k < this.arrayvehiculos.length;k++){
          if(data[i]!==undefined){
           
            if(data[i].id === this.arrayvehiculos[k].id){
              data[i]['placa'] = this.arrayvehiculos[k].placa
              data[i]['marca'] = this.arrayvehiculos[k].marca
              agregarCelda = -1
            }
         }
        }
        if(agregarCelda==0){
          data.push({
            celda:this.arrayceldas[i].id,
            nombre:this.arrayceldas[i].nombre,
            fecha_entrada:'',
            estado:'Sin asignar',
            id:'',
          })  
          agregarCelda = -1       
        }else{
          agregarCelda = -1
        }
      }
    }

    return data
  }


  visualizarTiempoTranscurridoVehiculos(){
    let data = []
    let cantidadVehiculos = this.arrayvehiculos.length
    let cantidadDistribuidas = this.arrayparqueados.length
    
    if(cantidadDistribuidas>0 && cantidadVehiculos>0){
      for(let i = 0; i <  cantidadVehiculos;i++){
        for(let k = 0; k < cantidadDistribuidas;k++){
          if(this.arrayvehiculos[i].id === this.arrayparqueados[k].vehiculos_id){
            let valor = this.valorPagar(this.arrayparqueados[k].fecha_entrada)
            let valornuevo = 0;
            let cadena = '';

            if(valor!==undefined){
              valornuevo = valor[0].valor;
              cadena = valor[0].cadena;
            }
            
            
            data.push({
              celda:'C'+ JSON.stringify(this.arrayparqueados[k].celdas_id),
              fecha_entrada:this.arrayparqueados[k].fecha_entrada,
              valor:valornuevo,
              tiempo:cadena,
              estado: this.arrayparqueados[k].estado === 'P' ? 'Pendiente' : 'Facturado',
              placa: this.arrayvehiculos[k].placa,
              marca: this.arrayvehiculos[k].marca,
            })
          }
        }
      }
    }
    return data
  }

  valorPagar(fecha){
   return this.servicioCeldas.buscarValorPagar(fecha)
  }
  celdasConFecha(estado:any){
    let data = []
    let cantidadCeldas = this.arrayceldas.length
    let cantidadDistribuidas = this.arrayparqueados.length
    
    if(cantidadDistribuidas>0 && cantidadCeldas>0){
      for(let i = 0; i < cantidadCeldas;i++){
        for(let k = 0; k < cantidadDistribuidas;k++){
          if(this.arrayceldas[i].id === this.arrayparqueados[k].id && this.arrayparqueados[k].estado !==estado){
            data.push({
              celda:this.arrayceldas[i].id,
              nombre:this.arrayceldas[i].nombre,
              fecha_entrada:this.arrayparqueados[k].fecha_entrada,
              estado:this.arrayparqueados[k].estado === 'P' ? 'Pendiente' : 'Facturado',
              id:this.arrayparqueados[k].vehiculos_id,
            })
            
          }
        }
      }
    }
    return data
  }



  celdasMasUtilizadas(){
    let data = []
    let cantidadDistribuidas = this.arrayparqueados.length
    
    if(cantidadDistribuidas>0){
  
        for(let k = 0; k < cantidadDistribuidas;k++){
          let valor = this.valorPagar(this.arrayparqueados[k].fecha_entrada)
          let segundos = '';

          if(valor!==undefined){
            segundos = valor[0].segundos
          }

            data.push({
              celda:this.arrayparqueados[k].id,
              nombre:'C'+ JSON.stringify(this.arrayparqueados[k].celdas_id),
              segundos:segundos
            })
            
          }
      
    }


    return data
  }
}
