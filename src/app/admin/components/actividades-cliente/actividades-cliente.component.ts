import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActividadListado } from '../../interfaces/actividades.interface';
import { ConfirmarComponent } from '../confirmar/confirmar.component';
import { Router } from '@angular/router';

const ELEMENT_DATA: ActividadListado[] = [
  {tipo:'Fuerza',nivel:'Inicacion',dia:'Lunes', hora:'17:00', ocupacion: 5},
  {tipo:'Mind',nivel:'Inicacion',dia:'Miercoles', hora:'17:00', ocupacion: 5},
  {tipo:'Power',nivel:'Avanzado',dia:'Viernes', hora:'20:00', ocupacion: 5},
  
];
@Component({
  selector: 'app-actividades-cliente',
  templateUrl: './actividades-cliente.component.html',
  styles: [`
  
  table {
    
    width: 100%;
  }

  button {
    margin: 16px 8px;
  } 
    
  `

  ]
})
export class ActividadesClienteComponent implements OnInit {

  @Input() idCliente: number = 0;
  @Input() mostrar: boolean= true;
  hidden : boolean = false;

  displayedColumns =
  ['nActs', 'tipo', 'nivel', 'dia', 'hora', 'ocupacion', 'acciones'];
  dataSource = ELEMENT_DATA;


  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private  router: Router) { }

  ngOnInit(): void {
    this.hidden = false;
  }


  delete(actividad: any){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: []//{...this.heroe} par ano mandar el objeto sino las proipiedad como string
    });

    
  }

  //metodo para mopstrar un snack bar de forma personlizada
  
  mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

  addNew(){
  this.hidden = true;
  }

  

}
