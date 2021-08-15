import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidatorService } from 'src/app/shared/validator/validator.service';



@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styles: [`
  button{
  margin: 10px;
  }
  .ap1, .ap2{
    width: 100%;
  }
  
  `
  ]
})

export class NuevoClienteComponent implements OnInit {



  hide = true;
  formNuevoCliente: FormGroup = this.fb.group({
    codigo:['',],
    nombre: ['', [ Validators.required, Validators.minLength(3) ] ],
    apellido1: ['', Validators.required],
    apellido2: [],
    dni: [],
    telefono:['', Validators.required],
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern) ]],
    contreseña:[]
  })



  @Input() cliente: number=0;
  
   
  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private router: Router) { }

  ngOnInit(): void {
    this.formNuevoCliente.controls['codigo'].disable();
    this.formNuevoCliente.reset({
      codigo:12345
    })
  }
  submitFormulario(){

  }

  campoNoValido( campo: string){
    return this.formNuevoCliente.get(campo)?.invalid
          && this.formNuevoCliente.get(campo)?.touched;

  }

  guardar(){

  }

  cancelar(){
    this.router.navigate(['../admin/clientes']);
    
  }

  
}
