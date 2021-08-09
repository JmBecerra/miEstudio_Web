import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './pages/clientes/clientes.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { MultimediaComponent } from './pages/multimedia/multimedia.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
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
        {
          path:'nuevo',
          component: NuevoClienteComponent
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
