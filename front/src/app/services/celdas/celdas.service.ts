import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { VehiculosParqueados } from 'src/app/interfaces/VehiculosParqueados';
import { VehiculosParqueadosService } from '../vehiculosparqueados/vehiculos-parqueados.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class CeldasService {
  url = environment.URL_SERVICIOS_LOCALES;
  celdas:any;
  arrayvehiculosparqueadero:VehiculosParqueados[] = [];
  arrayvehiculos:any = {
    id:null,
    placa:null,
    marca:null,
    created_at:null,
    update_at:null
}
  constructor(private http:HttpClient,private servicioVehiculosParqueadosService:VehiculosParqueadosService,
    private servicioParqueadero:VehiculosParqueadosService) { }
    get(){
      return this.http.get(`${this.url}/celdas`)
    }

    getAlegra(){
      return this.http.get(`https://app.alegra.com/api/v1/contacts`)
    }    

    guardarFacturaAlegra(){

    }
  
    buscarValorPagar(fechaentrada:any){
      let fechafinal = this.devolverFecha();
      var fecha1 = moment(fechaentrada);
      var fecha2 = moment(fechafinal);
      let years = fecha2.diff(fecha1, 'years');
      let months = fecha2.diff(fecha1, 'months');
      let days = fecha2.diff(fecha1, 'days');
      let hours = fecha2.diff(fecha1, 'hours');
      let minutos = fecha2.diff(fecha1, 'm');
      let segundos = fecha2.diff(fecha1, 's');
      let valor = segundos * 30;
      let data = [
        {'valor':valor,'cadena':` segundos ${segundos} minutos ${minutos} horas ${hours} dias ${days} meses ${months} años ${years}`,'segundos':` ${segundos}` }
      ]
   
      return data;
   
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
  
  
    public dividirFilas( arr:any, tamano:number ){
      let nuevoArreglo = [];
      for( let i = 0; i<arr.length; i+=tamano ){
        nuevoArreglo.push( arr.slice(i, i+tamano) );
      }
  
      return nuevoArreglo;
  
    }
  
  
    valorAleatorio(array:any,celdas:any,minOrmax:any,celda:any,obligarabuscarprimerosvalores:any){
      let random = []
      debugger
      if(celda!=-1){
            if(celda<=10){
              if(celdas[1][celda - 1]['color'] !== undefined) {
                random.push(celda + 9);
              }
            }
      }else{
        let recorrer = minOrmax < 10 ? 10 : 20;
        if(obligarabuscarprimerosvalores==1 && celda==-1){
          recorrer = 10
          minOrmax = 8
        }
        for(var i = 0; i < recorrer; i++) {
          let restarDiez = minOrmax <= 10 ? 0 : 10;
          let restar = restarDiez == 10 ? 10 : 0;
          let valorcelda = minOrmax < 10 ? 0 : 1;
            let valori=i
            let valorcadena = [Number(celdas[valorcelda][i]['id'])]  
            let valorNumero = Number(valorcadena[0])
            valorNumero= valorcelda == 1 && i == 0 ? -1 : 0;
            let nuevoValorNumero=Number(valori)
            if(celdas[valorcelda][nuevoValorNumero]['color'] === undefined) {
              random.push(nuevoValorNumero + 1 + restar);
            }
            if(i>0 && random.length>0){
              i = recorrer + 1
            }
        }
      }
      // let valor = Math.floor(Math.random() * (inicial - 1) + 1);
      return random[0]
    }
    buscarCeldaAleatoria(celdas:any,celda:any,obligararecorrer:any){
      // validamos la celdas que no exista,que no exista para otra placa,que la celda anterior este desocupada para colocarla ahí
      debugger
      let valor = -1
       return new Promise((resolve,reject)=>{
        
        this.servicioParqueadero.get()
          .subscribe((data)=>{
        
            let cdata = JSON.stringify(data)
            let adata = JSON.parse(cdata)
            let cantidad = adata.length
            debugger
            let redistribuir = this.reDistribuirCeldas(celdas)
            if(redistribuir>0){
              obligararecorrer = 1
            }else{
              obligararecorrer = cantidad >10 ? -1 : 1
            }
            
            valor = this.valorAleatorio(adata,celdas,cantidad,celda,obligararecorrer)
            resolve(valor)
          },(error)=>{
            reject(-1)
            console.log(error)
          })
    })
   }
  
   reDistribuirCeldas(celdas:any){
     let cantidad = 0
  
    for(var i = 0; i < celdas[0].length; i++) {
  
        if(celdas[0][i]['color'] === undefined) {
          cantidad+=1
        }
       
    }
    
    return cantidad
   }
   guardarAlegra(vehiculosparqueados:VehiculosParqueados){
    
    let valorPagar = this.buscarValor(vehiculosparqueados.fecha_entrada)
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    let dataAlegra =
    {
      "date":vehiculosparqueados.fecha_entrada,
      "dueDate": vehiculosparqueados.fecha_entrada,
      "client": 1,
      "items" : [
        {
          "id": 1,
          "price" : 30,
          "quantity" : valorPagar
          }
        ]
    }
    return this.http.post(`https://app.alegra.com/api/v1/invoices`,dataAlegra,{headers:headers});
            
           

  }

  buscarValor(fechaentrada:any){
    let fechafinal = this.devolverFecha();
    var fecha1 = moment(fechaentrada);
    var fecha2 = moment(fechafinal);
    let segundos = fecha2.diff(fecha1, 's');
    let valor = segundos;

    return valor;
 
  }  
  
  }