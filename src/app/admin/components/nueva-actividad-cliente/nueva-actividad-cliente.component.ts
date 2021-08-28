import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';

import { ActividadListado } from '../../interfaces/actividades.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ActividadService } from '../../services/actividad.service';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';



// const ELEMENT_DATA: ActividadListado[] = [
//   {tipo:'Fuerza',nivel:'Inicacion',dia:'Lunes', hora:'17:00', ocupacion: 5},
//   {tipo:'Resistencia',nivel:'Inicacion',dia:'Lunes', hora:'18:00', ocupacion: 5},
//   {tipo:'HIIT',nivel:'Intermedio',dia:'Lunes', hora:'20:00', ocupacion: 5},

//   {tipo:'Mind',nivel:'Iniciacion',dia:'Martes', hora:'17:00', ocupacion: 5},
//   {tipo:'Pilates',nivel:'Intermedio',dia:'Martes', hora:'18:00', ocupacion: 5},
//   {tipo:'Hipopresivos',nivel:'Iniciacion',dia:'Martes', hora:'19:00', ocupacion: 3},

//   {tipo:'Mind',nivel:'Inicacion',dia:'Miercoles', hora:'17:00', ocupacion: 5},
//   {tipo:'HIIT',nivel:'Intermedio',dia:'Miercoles', hora:'18:00', ocupacion: 5},
//   {tipo:'Burn',nivel:'Iniciacion',dia:'Miercoles', hora:'19:00', ocupacion: 5},

//   {tipo:'Mind',nivel:'Intermedio',dia:'Jueves', hora:'17:00', ocupacion: 5},
//   {tipo:'Pilates',nivel:'Intermedio',dia:'Jueves', hora:'18:00', ocupacion: 5},
//   {tipo:'Hipopresivos',nivel:'Intermedio',dia:'Jueves', hora:'19:00', ocupacion: 5},

//   {tipo:'Mind',nivel:'Inicacion',dia:'Miercoles', hora:'17:00', ocupacion: 5},
//   {tipo:'Resistencia',nivel:'Intermedio',dia:'Miercoles', hora:'18:00', ocupacion: 5},
//   {tipo:'Power',nivel:'Avanzado',dia:'Viernes', hora:'20:00', ocupacion: 5},

// ];

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

  @Input() idCliente: number = 0;
  subcription!: Subscription;
  

  
  displayedColumns =
  ['tipo', 'nivel', 'dia', 'horario', 'ocupacion', 'select'];
  
  dataSource:ActividadListado[] = []//new MatTableDataSource<ActividadListado>(this.elemenDataSource)
  selection = new SelectionModel<ActividadListado>(true, []);
  hidden: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private actividadService : ActividadService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.hidden = false;
    this.obtenerActividades();
  }

  obtenerActividades() {
    this.subcription = this.actividadService.getNoActividadesUsuario(this.idCliente)
      .subscribe(actividades => {
        this.dataSource = actividades;
        console.log(actividades);
        console.log(this.dataSource);
      })

  }

  saveActividadCliente( idUsuario: number, idActividad: number){
    this.actividadService.saveActividadUsuario(idUsuario,idActividad)
        .subscribe(resp =>{
          this.toastr.success('La actividad se ha creado con éxito','Actividad asignada')
        }, error =>{
          //console.log(error);
          this.toastr.error('Upss...la actividad no se ha podido creado con éxito','Actividad no asignada')
        })

  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  // /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ActividadListado): string {
    //console.log(row?.tipo);
    
    
    if (!row) {
      
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      
    }
    //console.log( `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tipo + 1}`);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tipo + 1}`;
  }



  guardar(){
    let seleccion = this.selection.selected;
    seleccion.forEach(row => {
      this.saveActividadCliente(this.idCliente, row.idActividad,);
    });
    

    this.hidden = true;
    window.location.reload();
    
  }
  cancelar(){
    this.hidden = true;
      
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subcription != null){ this.subcription.unsubscribe(); console.log('ondestroyNuevact');}
    
  }
}
