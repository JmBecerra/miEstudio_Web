import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  private myAppUrl="https://localhost:5001/";
  private myApiUrl="api/Medicion/";

  constructor(private http: HttpClient) { }

  getMedicionesUsuario(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetMedicionesUsuario/'+ id);
  }

  saveMedicion(medicion: any, idUsuario: number): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + idUsuario, medicion);
  }

  updateMedicion(idMedicion: number, medicion: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + idMedicion, medicion);
  }

  deleteMedicion(idMedicion: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + idMedicion);
  }

  
}
