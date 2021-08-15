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
import { ActividadesClienteComponent } from './components/actividades-cliente/actividades-cliente.component';
import { PagosClienteComponent } from './components/pagos-cliente/pagos-cliente.component';
import { MedicionesClienteComponent } from './components/mediciones-cliente/mediciones-cliente.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { NuevaActividadClienteComponent } from './components/nueva-actividad-cliente/nueva-actividad-cliente.component';
import { NuevoPagoClienteComponent } from './components/nuevo-pago-cliente/nuevo-pago-cliente.component';
import { NuevaMedicionClienteComponent } from './components/nueva-medicion-cliente/nueva-medicion-cliente.component';




@NgModule({
  declarations: [
    ClientesComponent,
    MultimediaComponent,
    ConfiguracionComponent,
    ReservasComponent,
    HomeAdminComponent,
    NuevoClienteComponent,
    InfoClienteComponent,
    ActividadesClienteComponent,
    PagosClienteComponent,
    MedicionesClienteComponent,

    ConfirmarComponent,
     NuevaActividadClienteComponent,
     NuevoPagoClienteComponent,
     NuevaMedicionClienteComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
