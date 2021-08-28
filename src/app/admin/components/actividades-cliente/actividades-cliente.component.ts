import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ConfirmarComponent } from '../confirmar/confirmar.component';

import { ActividadService } from '../../services/actividad.service';
import { Actividad, ActividadListado } from '../../interfaces/actividades.interface';
import { ToastrService } from 'ngx-toastr';


// const ELEMENT_DATA: ActividadListado[] = [
//   {tipo:'Fuerza',nivel:'Inicacion',dia:'Lunes', hora:'17:00', ocupacion: 5},
//   {tipo:'Mind',nivel:'Inicacion',dia:'Miercoles', hora:'17:00', ocupacion: 5},
//   {tipo:'Power',nivel:'Avanzado',dia:'Viernes', hora:'20:00', ocupacion: 5},
  
// ];
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
export class ActividadesClienteComponent implements OnInit, OnDestroy {

  @Input() idCliente: number = 0;
  @Input() mostrar: boolean= true;
  hidden : boolean = false;
  subcription!: Subscription;
  

  displayedColumns =
  ['nActs', 'tipo', 'nivel', 'dia', 'horario', 'ocupacion', 'acciones'];
  dataSource: ActividadListado[]=[];
  


  constructor(private dialog: MatDialog,
              private  router: Router,
              private actividadService: ActividadService,
              private toastr: ToastrService) {
               
              }

  ngOnInit(): void {  
   
    
    this.hidden = false;
    this.obtenerDatos(this.idCliente);
  }
  


  delete(actividad: any){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: []//{...this.heroe} par ano mandar el objeto sino las proipiedad como string
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.actividadService.deleteActividadUsuario(actividad.idActUser)
          .subscribe(resp => {
            this.toastr.warning('El usuario fue elimnado con exito','Usuario eliminado')
            this.obtenerDatos(this.idCliente);
          }, error =>{
            console.log(error);
          });
        }
      }
    );

    
  }

  obtenerDatos(id: number){
    this.subcription =  this.actividadService.getActividadesUsuario(id)
        .subscribe(resp=>{
          this.dataSource = resp;

        }, error => {
          console.log(error);
        })
  }
  
  addNew(){
  
  this.ngOnDestroy();
  this.hidden = true;
 
  
  
  }

  ngOnDestroy(): void {
   
    if(this.subcription){this.subcription.unsubscribe(); console.log('ondestroyASctividades');}
    
  }
  
  

  

}

