import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  private myAppUrl="https://localhost:5001/";
  private myApiUrl="api/Tarifa/";

  constructor(private http: HttpClient) { }

  getTarifasUsuario(idUsuario: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + "GetTarifasByIdUsuario/" + idUsuario);

  }

}
