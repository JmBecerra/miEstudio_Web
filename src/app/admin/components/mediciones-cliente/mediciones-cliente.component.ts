import { Component, Input, OnInit } from '@angular/core';

import { MedicionListado } from '../../interfaces/mediciones.interface';

const ELEMENT_DATA: MedicionListado[] = [
  {fecha:'03/05/2021', peso: 80, altura:172, grasa:18, musculo: 62, agua: 55, abdomen: 87, cintura:90},
  {fecha:'04/04/2021', peso: 82, altura:172, grasa:20, musculo: 62, agua: 55, abdomen: 89, cintura:91}



  
];

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
  dataSource = ELEMENT_DATA;
  @Input() idCliente =0;
  hidden: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    this.hidden = false;
  }

  edit(pago: any){

  }

  delete(pago: any){

  }

  addNew(){
    this.hidden = true;
  }


}
