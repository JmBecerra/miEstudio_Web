
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TarifaListado } from '../../interfaces/tarifas.interface';

@Component({
  selector: 'app-nuevo-pago-cliente',
  templateUrl: './nuevo-pago-cliente.component.html',
  styles: [`
  button{
  margin: 10px;
  }
  `
  ]
})
export class NuevoPagoClienteComponent implements OnInit {

  isChecked = true;
  @Input() idCliente: number = 0;
  hidden: boolean = false;

  tarifas: TarifaListado[]=[
    {id:1,numAct:3, precio:280,activa: true, periodo:'entrenamiento personal'},
    {id:1,numAct:3, precio:170,activa: true, periodo:'Duo'},
    {id:1,numAct:3, precio:115,activa: true, periodo:'grupo reducido'},
  ]
  metodos: string[]=['Efectivo','Tarjeta'];

  tarifasMapa = {
    '=1':'sesión',
    'other':'sesiones'
  }

  formNuevoPago:FormGroup = this.fb.group({
    tarifa:['',[ Validators.required]],
    metodo:['',[ Validators.required]],
    pagado:[''],
    precio:[''],
    fechaCuota:['',[Validators.required]],
    fechaCobro:['',[Validators.required]],

  });

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formNuevoPago.controls['precio'].disable();
    this.hidden= false
  }

  cancelar(){
    this.hidden = true;
  }

  submitFormulario(){
    console.log('submit');
  }

  campoValido(campo: string){
    return this.formNuevoPago.get(campo)?.invalid
    && this.formNuevoPago.get(campo)?.touched;
  }

}
