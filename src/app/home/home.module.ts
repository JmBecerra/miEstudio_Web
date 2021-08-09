import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';

import { HomeComponent } from './pages/home/home.component';
import { MultimediaComponent } from './pages/multimedia/multimedia.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';

@NgModule({
  declarations: [
    HomeComponent,
    MultimediaComponent,
    ActividadesComponent,
    ContactoComponent,
    HomeScreenComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
