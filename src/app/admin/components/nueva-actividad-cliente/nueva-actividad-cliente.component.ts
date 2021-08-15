import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';

import { ActividadListado } from '../../interfaces/actividades.interface';
import { MatTableDataSource } from '@angular/material/table';



const ELEMENT_DATA: ActividadListado[] = [
  {tipo:'Fuerza',nivel:'Inicacion',dia:'Lunes', hora:'17:00', ocupacion: 5},
  {tipo:'Resistencia',nivel:'Inicacion',dia:'Lunes', hora:'18:00', ocupacion: 5},
  {tipo:'HIIT',nivel:'Intermedio',dia:'Lunes', hora:'20:00', ocupacion: 5},

  {tipo:'Mind',nivel:'Iniciacion',dia:'Martes', hora:'17:00', ocupacion: 5},
  {tipo:'Pilates',nivel:'Intermedio',dia:'Martes', hora:'18:00', ocupacion: 5},
  {tipo:'Hipopresivos',nivel:'Iniciacion',dia:'Martes', hora:'19:00', ocupacion: 3},

  {tipo:'Mind',nivel:'Inicacion',dia:'Miercoles', hora:'17:00', ocupacion: 5},
  {tipo:'HIIT',nivel:'Intermedio',dia:'Miercoles', hora:'18:00', ocupacion: 5},
  {tipo:'Burn',nivel:'Iniciacion',dia:'Miercoles', hora:'19:00', ocupacion: 5},

  {tipo:'Mind',nivel:'Intermedio',dia:'Jueves', hora:'17:00', ocupacion: 5},
  {tipo:'Pilates',nivel:'Intermedio',dia:'Jueves', hora:'18:00', ocupacion: 5},
  {tipo:'Hipopresivos',nivel:'Intermedio',dia:'Jueves', hora:'19:00', ocupacion: 5},

  {tipo:'Mind',nivel:'Inicacion',dia:'Miercoles', hora:'17:00', ocupacion: 5},
  {tipo:'Resistencia',nivel:'Intermedio',dia:'Miercoles', hora:'18:00', ocupacion: 5},
  {tipo:'Power',nivel:'Avanzado',dia:'Viernes', hora:'20:00', ocupacion: 5},

];

@Component({
  selector: 'app-nueva-actividad-cliente',
  templateUrl: './nueva-actividad-cliente.component.html',
  styles: [`
  table{
    width: 100%;
  }
  button{
    margin-right: 10px;
  }
  `
  ]
})
export class NuevaActividadClienteComponent implements OnInit {

  @Input() cliente: number = 0;
  
  displayedColumns =
  ['tipo', 'nivel', 'dia', 'hora', 'ocupacion', 'select'];
  dataSource = new MatTableDataSource<ActividadListado>(ELEMENT_DATA)
  selection = new SelectionModel<ActividadListado>(true, []);
  hidden: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.hidden = false;
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ActividadListado): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tipo + 1}`;
  }

  addNew(){
   
  }

  guardar(){
   
  }
  cancelar(){
    this.hidden = true;
      
  }
}
