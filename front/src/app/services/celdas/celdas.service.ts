import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { VehiculosParqueados } from 'src/app/interfaces/VehiculosParqueados';
import { VehiculosParqueadosService } from '../vehiculosparqueados/vehiculos-parqueados.service';
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
  constructor(private http:HttpClient,private servicioVehiculosParqueadosService:VehiculosParqueadosService) { }
  get(){
    return this.http.get(`${this.url}/celdas`)
  }
  buscarCeldasOcupadas(){
    let promise = new Promise((resolve,reject)=>{
      this.get()
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
             resolve(this.celdas)
             
          }else{
            this.celdas = dataValores
            resolve(this.celdas)
          }
        },(error)=>{
          reject([])
        })
    },
    (error)=>{
      reject([])
    })
    })
    return promise
  }
  private agrupar( arr:any, tamano:number ){
    let nuevoArreglo = [];
    for( let i = 0; i<arr.length; i+=tamano ){
      nuevoArreglo.push( arr.slice(i, i+tamano) );
    }

    return nuevoArreglo;

  }

}
