import { Component, OnInit } from '@angular/core';
import { CeldasService } from '../services/celdas/celdas.service';
import { VehiculosService } from '../services/vehiculos/vehiculos.service';

@Component({
  selector: 'app-celdas',
  templateUrl: './celdas.component.html',
  styleUrls: ['./celdas.component.css']
})
export class CeldasComponent implements OnInit {
  celdas:any;
  arrayvehiculos:any = {
    id:null,
    placa:null,
    marca:null,
    created_at:null,
    update_at:null
}
  constructor(private servicioCeldas:CeldasService,private servicioVehiculos:VehiculosService) { }

  ngOnInit() {
    this.traerDatos()
    this.traerVehiculos()
  }
  traerDatos(){
    this.servicioCeldas.buscarCeldasOcupadas().then((data)=>{
      this.celdas = data
    })
  }
  traerVehiculos(){
    this.servicioVehiculos.get()
    .subscribe((data)=>{
      let dataAntes = JSON.stringify(data)
      let dataValores = JSON.parse(dataAntes)
       if(dataValores.length){
          this.arrayvehiculos = dataValores
          console.log(this.arrayvehiculos)
        }
      })
  }
}
