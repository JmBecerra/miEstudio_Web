import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './pages/clientes/clientes.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { MultimediaComponent } from './pages/multimedia/multimedia.component';
import { NuevaActividadClienteComponent } from './components/nueva-actividad-cliente/nueva-actividad-cliente.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { NuevoPagoClienteComponent } from './components/nuevo-pago-cliente/nuevo-pago-cliente.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { InfoClienteComponent } from './pages/info-cliente/info-cliente.component';


const routes: Routes = [
  {

    path:'',
      component: HomeAdminComponent,
      children: [
        {
          path:'clientes',
          component: ClientesComponent
        },
        {
          path:'multimedia',
          component: MultimediaComponent
        },
        {
          path:'configuracion',
          component: ConfiguracionComponent
        },
        {
          path:'reservas',
          component: ReservasComponent
        },
        // {
        //   path: 'editarCliente/:id',
        //   component: NuevoClienteComponent
        // },
        {
          path:'nuevoCliente',
          component: NuevoClienteComponent
        },
        // {
        //   path:'nuevaActividad:/:id',
        //   component: NuevaActividadClienteComponent
        // },
        {
          path: 'nuevoPago:/:id',
          component: NuevoPagoClienteComponent
        },
        {
          path:'info/:id',
          component: InfoClienteComponent
        },
        {
          path:'**',
          redirectTo:'clientes'
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
export class AdminRoutingModule { }
