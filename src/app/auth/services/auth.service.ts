import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Auth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';
import { map , tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myAppUrl : string = environment.myAppUrl;
  private _auth: Auth | undefined;
  

  get auth(): Auth{
    return {...this._auth! }
  }

  constructor(private http: HttpClient) { }


  verificacionAutencicacion(): Observable<boolean>{
    if( !localStorage.getItem('token')){
      return of
      (false);
    }

    return this.http.get<Auth>(`${this.myAppUrl}/api/Usuario/GetUserByEmail/${this._auth?.email}`)
      .pipe(
        map( auth =>  {
          this._auth = auth;
          console.log( auth);
          return true;
        })
      )
  }


  login(email: string){
  
    return this.http.get<Auth>(`${this.myAppUrl}/api/Usuario/GetUserByEmail/${email}` )
            .pipe (
              tap( auth => this._auth = auth),
              tap (auth => localStorage.setItem('token', auth.idUsuario)),
              
            );

           
  }

  logout(){
    this._auth = undefined;
  }

}
