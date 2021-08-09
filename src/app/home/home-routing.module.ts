import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActividadesComponent } from './pages/actividades/actividades.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { MultimediaComponent } from './pages/multimedia/multimedia.component';



const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [

      {
        path:'multimedia',
        component: MultimediaComponent
      },
      {
        path:'actividades',
        component: ActividadesComponent
      },
      {
        path:'contacto',
        component: ContactoComponent
      },
      {
        path:'**',
        redirectTo:''
      }

    ]

  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
