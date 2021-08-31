import { Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { ClienteListado, Cliente } from '../../interfaces/cliente.interface';
import { UsuarioService } from '../../services/usuario.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Subscription } from 'rxjs';


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
        width: '400px',
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






