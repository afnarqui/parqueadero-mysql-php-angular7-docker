import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  url = environment.URL_SERVICIOS_LOCALES;
  constructor(private http:HttpClient) { }
  
  get(){
    return this.http.get(`${this.url}/vehiculos`)
  }
}
