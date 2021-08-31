import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ConfirmarComponent } from '../confirmar/confirmar.component';

import { PagoService } from '../../services/pago.service';
import { Pago, PagoListado } from '../../interfaces/pagos.interface';



@Component({
  selector: 'app-pagos-cliente',
  templateUrl: './pagos-cliente.component.html',
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
export class PagosClienteComponent implements OnInit{

  @Input() idCliente: number=0;

  hidden: boolean = false;

  pagoEdit!: Pago;
  subcription! : Subscription;

  tarifasMapa = {
    '=1':'sesión',
    'other':'sesiones'
  }

  displayedColumns =
  ['fechaAct', 'fechaCobro', 'tarifa', 'precio', 'pagado', 'acciones'];
  dataSource = [];

  constructor(private router: Router,
              private pagosService: PagoService,
              private toastr: ToastrService,
              private dialog: MatDialog) { 
               
              }

  ngOnInit(): void {
    console.log('OnINtiPagpos');
    this.hidden = false;
    this.obtenerDatos();
  }

  obtenerDatos(){
    this.subcription = this.pagosService.getPagosUsuario(this.idCliente)
      .subscribe( resp =>{
       
        this.dataSource = resp;
        this.dataSource.sort((a,b) =>{
          var fechaA = new Date(a).getTime();
          var fechaB = new Date(b).getTime();
          return fechaA < fechaB ? -1: 1;
          
        });
       
        
      }, error=>{
        console.log(error);
      });
  }

  deletePago(idPago: number){
    this.pagosService.deletePago(idPago)
      .subscribe(resp => {
        this.toastr.warning('El pago se borrado con éxito','Pago borrado');
        this.obtenerDatos();
       
      }, error =>{
        console.log(error);
      });
      
  }

  edit(pago: any){
    this.ngOnDestroy(); 
    this.pagoEdit = pago;
     
    this.hidden = true;
   
    
  }

  delete(pago: any){

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '400px',
      data: []//{...this.heroe} par ano mandar el objeto sino las proipiedad como string
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.deletePago(pago.idPago);
        }
      }
    );
    
  }

  addNew(){
    this.ngOnDestroy();
    if(this.isCorrientePagos()){
      
      this.hidden= true;
    }else{
      this.toastr.warning('Hay cuotas impagadas', 'Cuota Impagada');
    }
    
  }

  cuotaIsActiva(fechaAct: Date): boolean{
    
    var fechaCuota = new Date(fechaAct);
    console.log(fechaCuota);
    let mesCuota = fechaCuota.getMonth();
    let mesActual = new Date().getMonth();
    console.log('que es el dataspure', this.dataSource);
    var pago: Pago = this.dataSource[0];
    var pagado = pago.pagado;
    console.log('pagado', pagado);
    if(mesCuota == mesActual ){
      return true;
    } else if (mesCuota !== mesActual && !pagado){
      return true;
    }
    return false;
  }

  isCorrientePagos(): boolean{
    let iscorrientePagos: boolean = true;
    this.dataSource.forEach( ({ pagado }) =>{
      iscorrientePagos =  pagado == false ? false: true;

    })

    return iscorrientePagos;
  }
  
  ngOnDestroy():void{
   
    if(this.subcription){ this.subcription.unsubscribe();}
  }

}
