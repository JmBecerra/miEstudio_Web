import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';

import { ConfirmarComponent } from '../confirmar/confirmar.component';

import { MedicionService } from '../../services/medicion.service';

import { Medicion, MedicionListado } from '../../interfaces/mediciones.interface';



@Component({
  selector: 'app-mediciones-cliente',
  templateUrl: './mediciones-cliente.component.html',
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
export class MedicionesClienteComponent implements OnInit {

  displayedColumns =
  ['fecha', 'peso', 'altura', 'grasa', 'musculo','agua','abdomen','cintura', 'acciones'];
  dataSource: MedicionListado[] = [];


  @Input() idCliente =0;
  medicionEdit!:MedicionListado;
  hidden: boolean = false;
  subscription!: Subscription;
  
  constructor(private medicionService: MedicionService,
              private toastr:ToastrService,
              private dialog: MatDialog) { 

              }

  ngOnInit(): void {
    this.hidden = false;
    this.obtenerMediciones();
  }

  obtenerMediciones(){
    this.subscription = this.medicionService.getMedicionesUsuario(this.idCliente)
      .subscribe(resp => {
        this.dataSource = resp;

      }, error => {
        console.log(error);
      });

  }


  edit(medicion: any){
    this.medicionEdit = medicion;
    this.hidden = true;
    this.ngOnDestroy();
  }

  delete(medicion: Medicion){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
     data: {...medicion}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.medicionService.deleteMedicion(medicion.idMedicion)
            .subscribe(resp => {
              this.toastr.warning('Se ha podido borrar la medición con éxito', 'Medición borrada');
              this.obtenerMediciones();
            }, error => {
              console.log(error);
              this.toastr.error('Upss... no se ha podido borrar la medición', 'Medición no borrada');
            });
        }
      }
    );


   

  }

  addNew(){
    this.hidden = true;
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription){this.subscription.unsubscribe();}
  }


}
