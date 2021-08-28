import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../interfaces/cliente.interface';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.component.html',
  styles: [
  ]
})
export class InfoClienteComponent implements OnInit {

  cliente!:Cliente;
  
  id:number=0;
  //opcion:number =0;
  constructor( private activatedRoute: ActivatedRoute,
               private usuarioService: UsuarioService) { 
               
               }

  ngOnInit(): void {
    
    this.activatedRoute.params
    .subscribe(pms =>{
     this.id = pms['id'];
    });
    this.recuperarDartos(this.id);

    //this.opcion = 1;
  }

  recuperarDartos(idUsuario: number){
    this.usuarioService.getUsuario(idUsuario)
        .subscribe(cliente =>{
          
          this.cliente = cliente;
        });
  }

}
