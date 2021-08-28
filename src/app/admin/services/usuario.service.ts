import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myAppUrl="https://localhost:5001/";
  private myApiUrl="api/Usuario/";

  constructor(private http: HttpClient) { }

  getUsuario(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  getlistsuarios(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteUsuario(id: number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveUsuario( cliente: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, cliente);
  }

  getlastId(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + "GetLastId" );
  }

  updateUsuario(id: number,cliente: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, cliente)
  }
}
