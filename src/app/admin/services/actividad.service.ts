import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private myAppUrl="https://localhost:5001/";
  private myApiUrl="api/Actividad/";

  constructor(private http: HttpClient) { }

  getActividadesUsuario(idUsuario: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + "GetActividadUsuario/" + idUsuario);
  }
  getNoActividadesUsuario(idUsuario: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + "GetNoActividadUsuario/" + idUsuario);
  }

  getActividades(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  saveActividadUsuario(idUsuario: number, idAactividad: number): Observable<any>{
    return this.http.post(this.myAppUrl +  this.myApiUrl + "CreateActividadUsuario/" + idUsuario, idAactividad);
  }

  deleteActividadUsuario(idActividadUsuario: number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + "DeleteActividadUsuario/" + idActividadUsuario);
  }
  
}
