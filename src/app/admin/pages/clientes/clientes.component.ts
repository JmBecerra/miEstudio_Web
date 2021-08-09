import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteListado, Cliente } from '../../interfaces/cliente.interface';
import { element } from 'protractor';



const ELEMENT_DATA: ClienteListado[] = [
  {id:1,nombre:'Jose Maria',apellidos: 'Becerra Viles',telefono:'669755676',email: 'jmbecerraviles@gmail.com'},
  {id:2,nombre:'Maria',apellidos: 'Viles Pâche',telefono:'669778899',email: 'mariaviles@gmail.com'},
  {id:3,nombre:'Juan',apellidos: 'Becerra Almaraz',telefono:'772111222',email: 'juanbecerraalamaraz@gmail.com'},
  {id:4,nombre:'Ana',apellidos: 'Pache Correas',telefono:'669000999',email: 'anapachecorreas@gmail.com'},
  {id:5,nombre:'Luis',apellidos: 'Gonzalez Martinez',telefono:'667555666',email: 'luisgonzalezmartinez@gmail.com'},

];

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


export class ClientesComponent {

  @Input() cliente!:Cliente;

  displayedColumns =
  ['id', 'nombre', 'apellidos', 'telefono', 'email', 'pagado', 'acciones'];
    dataSource = ELEMENT_DATA;

    constructor(private router: Router){}
    
  addColumn() {
    // const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    // this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    // if (this.columnsToDisplay.length) {
    //   this.columnsToDisplay.pop();
    }

    addNew(){
      this.router.navigate(['./admin/nuevo']);
    }

    edit(cliente: any){
      console.log(element);
      //this.router.navigate(['../admin/info', cliente.id]);
    }
    delete(element: any){

    }
  }






