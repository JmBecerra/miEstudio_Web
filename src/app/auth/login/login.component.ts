
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]]
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
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
     //console.log(this.formNuevoCliente.value);
    if(this.formLogin.invalid){ 
      console.log('invalid');
      this.formLogin.markAllAsTouched();
      return;
    }
    //this.router.navigate(['./admin']);
    console.log(this.formLogin.get('email')?.value);
    this.authService.login(this.formLogin.get('email')?.value)
      .subscribe( resp => {
       

        if(resp.tipoUsuario == 1){
          console.log('es de tipo admin');
          this.router.navigate(['../admin']);
        }
      });
  }

  verWebPublica(){
    this.router.navigate(['../home']);
  }

  campoNoValido( campo: string){
    return this.formLogin.get(campo)?.invalid
          && this.formLogin.get(campo)?.touched;
  }



}
