import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { ClienteListado, Cliente } from '../../interfaces/cliente.interface';
import { UsuarioService } from '../../services/usuario.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Subscription } from 'rxjs';

// const ELEMENT_DATA: ClienteListado[] = [
//   {id:1,nombre:'Jose Maria',apellidos: 'Becerra Viles',telefono:'669755676',email: 'jmbecerraviles@gmail.com'},
//   {id:2,nombre:'Maria',apellidos: 'Viles Pâche',telefono:'669778899',email: 'mariaviles@gmail.com'},
//   {id:3,nombre:'Juan',apellidos: 'Becerra Almaraz',telefono:'772111222',email: 'juanbecerraalamaraz@gmail.com'},
//   {id:4,nombre:'Ana',apellidos: 'Pache Correas',telefono:'669000999',email: 'anapachecorreas@gmail.com'},
//   {id:5,nombre:'Luis',apellidos: 'Gonzalez Martinez',telefono:'667555666',email: 'luisgonzalezmartinez@gmail.com'},

// ];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
    `
  table {
    width: 100%;
  }

  button {
    margin: 16px 8px;
  } 
    `
  ]
})


export class ClientesComponent implements OnInit{

  
    cliente!:Cliente;
    clienteSubscription!: Subscription

    displayedColumns =
    ['id', 'nombre', 'apellidos', 'telefono', 'email', 'pagado', 'acciones'];

    dataSource = [];

    constructor(private router: Router,
                private usuarioService: UsuarioService,
                private toastr: ToastrService,
                private dialog: MatDialog){}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.clienteSubscription = this.usuarioService.getlistsuarios()
      .subscribe(data => {
        //console.log(data);
        this.dataSource = data;
      }, error => {
        console.log(error);
      });
  }


    addNew(){
      this.router.navigate(['./admin/nuevoCliente']);
    }

    edit(cliente: Cliente){
      this.router.navigate(['./admin/info', cliente.idUsuario]);
      //this.toastr.success("Test","test");
      
    }
    delete(cliente: Cliente){
      const dialog = this.dialog.open(ConfirmarComponent, {
        width: '250px',
       data: {...cliente}
      });
  
      dialog.afterClosed().subscribe(
        (result) => {
          if (result) {
            var delteCliente = this.usuarioService.deleteUsuario(cliente.idUsuario)
            this.clienteSubscription = delteCliente
            .subscribe(resp => {
              this.toastr.error('El usuario fue elimnado con exito','Usuario eliminado')
              this.obtenerUsuarios();
            }, error =>{
              console.log(error);
            });
          }
        }
      );
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      if(this.clienteSubscription){this.clienteSubscription.unsubscribe()};
    }
  }






