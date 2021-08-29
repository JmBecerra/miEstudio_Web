import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>| Promise<boolean>  {

    return this.authService.verificacionAutencicacion()
    .pipe(
      tap( estaAuteticado=> {
        if(!estaAuteticado){
          console.log('no esta logeado');
          this.router.navigate(['auth/login']);
        }
      }) 
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean>| Promise<boolean>  {
      return this.authService.verificacionAutencicacion()
      .pipe(
        tap( estaAuteticado=> {
          if(!estaAuteticado){
            console.log('no esta logeado');
            this.router.navigate(['auth/login']);
          }
        }) 
      );
  }
}
