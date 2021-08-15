import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-nueva-medicion-cliente',
  templateUrl: './nueva-medicion-cliente.component.html',
  styles: [`
  button{
    margin: 10px;
  }
  `

  ]
})
export class NuevaMedicionClienteComponent implements OnInit {

  @Input() idCliente = 0;
  hidden: boolean = false;

  formNuevaMedicion: FormGroup = this.fb.group({
    fecha:[''],
    peso:['',[Validators.required]],
    altura:['',[Validators.required]],
    grasa:[''],
    musculo:[''],
    agua:[''],
    abdomen:[''],
    cintura:[''],
  })


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.hidden = false;
  }

  submitFormulario(){

  }

  campoValido( campo: string){
    return this.formNuevaMedicion.get(campo)?.invalid
          && this.formNuevaMedicion.get(campo)?.touched;

  }

  guardar(){
   
  }
  cancelar(){
    this.hidden = true;
      
  }

}
