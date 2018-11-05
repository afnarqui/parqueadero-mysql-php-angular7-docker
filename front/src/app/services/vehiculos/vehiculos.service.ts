import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Vehiculo } from 'src/app/interfaces/Vehiculo';
@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  url = environment.URL_SERVICIOS_LOCALES;
  constructor(private http:HttpClient) { }
  
  get(){
    return this.http.get(`${this.url}/vehiculos`)
  }
  guardar(vehiculo:Vehiculo){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    
    return this.http.post(`${this.url}/vehiculos`,vehiculo,{headers:headers});
  }  
  actualizar(vehiculo:Vehiculo){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    debugger
    return this.http.put(`${this.url}/vehiculo/${vehiculo.id}`,vehiculo,{headers:headers});
  }  
}
