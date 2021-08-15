import { Component, Input, OnInit } from '@angular/core';
import { PagoListado } from '../../interfaces/pagos.interface';
import { Router } from '@angular/router';

const ELEMENT_DATA: PagoListado[] = [
  {fechaAct:'01/05/2021', fechaCobro:'07/05/2021',tarifa:'Mensual 3 sesiones',precio: '170€',pagado:true},
  {fechaAct:'01/04/2021', fechaCobro:'06/054/2021',tarifa:'Mensual 1 sesiones',precio: '70€',pagado:true},


  
];

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
export class PagosClienteComponent implements OnInit {

  @Input() idCliente: number=0;
  hidden: boolean = false;

  displayedColumns =
  ['fechaAct', 'fechaCobro', 'tarifa', 'precio', 'pagado', 'acciones'];
  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.hidden = false;
  }

  edit(pago: any){

  }

  delete(pago: any){

  }

  addNew(){
    
    this.hidden= true;
  }

}
