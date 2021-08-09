import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styles: [`
  button{
  margin: 10px;
  }
  
  `
  ]
})
export class NuevoClienteComponent implements OnInit {

  hide = true;
  formNuevoCliente: FormGroup = this.fb.group({
    codigo:[],
    nombre: ['', [ Validators.required, Validators.minLength(3) ] ],
    apellido1: ['', Validators.required],
    apellido2: [],
    dni: [],
    telefono:['', Validators.required],
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern) ]],
    contreseña:[]
  })

  
   
  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private router: Router) { }

  ngOnInit(): void {
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
