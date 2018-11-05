import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { VehiculosParqueados } from 'src/app/interfaces/VehiculosParqueados';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class VehiculosParqueadosService {
  url = environment.URL_SERVICIOS_LOCALES;
  constructor(private http:HttpClient) { }
  get(){
    return this.http.get(`${this.url}/vehiculosparqueados`)
  }
  guardar(vehiculosparqueados:VehiculosParqueados){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    
    return this.http.post(`${this.url}/vehiculosparqueados`,vehiculosparqueados,{headers:headers});
  }  
  actualizar(vehiculosparqueados:VehiculosParqueados){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put(`${this.url}/vehiculosparqueados/${vehiculosparqueados.id}`,vehiculosparqueados,{headers:headers});
  }  
  

  
}
