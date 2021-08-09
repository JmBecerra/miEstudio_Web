import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MultimediaComponent } from './pages/multimedia/multimedia.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { InfoClienteComponent } from './pages/info-cliente/info-cliente.component';



@NgModule({
  declarations: [
    ClientesComponent,
    MultimediaComponent,
    ConfiguracionComponent,
    ReservasComponent,
    HomeAdminComponent,
    NuevoClienteComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
