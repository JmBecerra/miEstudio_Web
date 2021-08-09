
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required]]
  })

  get emailErrorMsg(): string { //el get se ejecuta cuando angular detecta un cambio en el modulo

    const errors = this.formLogin.get('email')?.errors;
    if(errors?.required){
      return 'El email es obligatorio';
    }else if ( errors?.pattern){
      return 'El valor no tiene el formato de correo';
    }else if ( errors?.emailTomado){
      return 'El email ya existe';
    }

    return ''; 
  }

  constructor(private fb : FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['./admin']);
  }

  ingresarSinLogin(){

  }

  campoNoValido( campo: string){
    return this.formLogin.get(campo)?.invalid
          && this.formLogin.get(campo)?.touched;

  }

  submitForm(){

  }

}
