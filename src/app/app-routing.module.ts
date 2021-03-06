import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
{
  path:'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
},
{
  path:'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
{
  path:'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  canLoad:[ AuthGuard ],
  canActivate: [ AuthGuard ]
},
{
  path:'**',
  redirectTo:'home'
}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
