import { Component, OnInit } from '@angular/core';
import { CeldasService } from '../services/celdas/celdas.service';
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
  constructor(private servicioCeldas:CeldasService) { }

  ngOnInit() {
    this.traerDatos()
  }
  traerDatos(){
    this.servicioCeldas.buscarCeldasOcupadas().then((data)=>{
      this.celdas = data
    })
  }
}
