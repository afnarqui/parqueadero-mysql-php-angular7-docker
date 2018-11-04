import { Component, OnInit } from '@angular/core';
import { CeldasService } from '../services/celdas/celdas.service';
import { VehiculosParqueadosService } from '../services/vehiculosparqueados/vehiculos-parqueados.service';
import { VehiculosParqueados } from '../interfaces/VehiculosParqueados';
@Component({
  selector: 'app-celdas',
  templateUrl: './celdas.component.html',
  styleUrls: ['./celdas.component.css']
})
export class CeldasComponent implements OnInit {
  celdas:any;
  arrayvehiculosparqueadero:VehiculosParqueados[] = [];
  arrayvehiculos:any = {
    id:null,
    placa:null,
    marca:null,
    created_at:null,
    update_at:null
}
  constructor(private servicioCeldas:CeldasService,private servicioVehiculosParqueadosService:VehiculosParqueadosService) { }

  ngOnInit() {
    this.traerDatos()
  }
  traerDatos(){
    this.buscarCeldasOcupadas();
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

}
