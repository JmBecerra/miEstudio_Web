import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { Pago } from '../interfaces/pagos.interface';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private myAppUrl="https://localhost:5001/";
  private myApiUrl="api/Pago/";

  constructor(private http: HttpClient) { }

  getPagosUsuario(idUsuario: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + "GetPagoByIdUsuario/" + idUsuario);

  }
  savePago(pago: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, pago);
  }

  updatePago(idPago: number, pago:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + idPago, pago);
  }

  deletePago(idPago: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + idPago);
  }
}
