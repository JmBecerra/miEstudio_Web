import { Component, Input, OnInit , OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DateAdapter } from '@angular/material/core';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { UsuarioService } from '../../services/usuario.service';
import { Cliente } from '../../interfaces/cliente.interface';





@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styles: [`
  button{
      margin: 10px;
  }
  .ap1, .ap2, .email{
      width: 100%;
  }
  mat-form-field{
    margin-botton: 20px;
  }
  `
  ]
})

export class NuevoClienteComponent implements OnInit {


  cliente!:Cliente;
  subcription!: Subscription;
  subcriptionClientes!: Subscription;

  lastId: number = 0;
  hide = true;//para el campo de password

  formNuevoCliente: FormGroup = this.fb.group({
    codigo:['',],
    nombre: ['', [ Validators.required, Validators.minLength(3) ] ],
    apellido1: ['', Validators.required],
    apellido2: [],
    dni: ['', Validators.required],
    telefono:['', Validators.required],
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern) ]],
    fechaNac:[''],
    fechaAlta:[''],
    fechaMod:[''],

    password:['']
  })



  @Input() clienteEdit: number=0;
  
   
  constructor(private dateAdapter: DateAdapter<Date>,
              private fb: FormBuilder,
              private validatorService: ValidatorService,
              private router: Router,
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) { 
                this.dateAdapter.setLocale('es-ES'); 
               
              }

  ngOnInit(): void {
    this.initForm();
    if(!this.router.url.includes('info')){    
      return;
    }

    this.subcription = this.activatedRoute.params
      .pipe(
        switchMap( ({ id })=> this.usuarioService.getUsuario(id) )
      )
      .subscribe(cliente => {        
        this.cliente = cliente;
        
        this.rellenarCampos(this.cliente);
      });
  }

  initForm(){
    this.formNuevoCliente.controls['codigo'].disable();
    this.formNuevoCliente.controls['fechaAlta'].disable();
    this.formNuevoCliente.controls['fechaMod'].setValue(new Date());
    this.formNuevoCliente.controls['fechaMod'].disable();
    if(!this.router.url.includes('info')){
      this.usuarioService.getlastId().subscribe(id => {
        this.lastId = id +1;
        this.formNuevoCliente.controls['codigo'].setValue(this.lastId);
        this.formNuevoCliente.controls['fechaAlta'].setValue(new Date());
        this.formNuevoCliente.controls['fechaMod'].setValue(new Date());
      });

    }
   
  }

  //se le llama en el caso de que se llame al component para editar un cliente
  rellenarCampos(cliente: Cliente){
    
    this.formNuevoCliente.controls['codigo'].setValue(cliente.idUsuario);
    this.formNuevoCliente.controls['nombre'].setValue(cliente.nombre);
    this.formNuevoCliente.controls['apellido1'].setValue(cliente.apellido1);
    this.formNuevoCliente.controls['apellido2'].setValue(cliente.apellido2);
    this.formNuevoCliente.controls['dni'].setValue(cliente.dni);
    this.formNuevoCliente.controls['telefono'].setValue(cliente.telefono);
    this.formNuevoCliente.controls['email'].setValue(cliente.email);
    this.formNuevoCliente.controls['fechaNac'].setValue(cliente.fechaNac);
    this.formNuevoCliente.controls['fechaAlta'].setValue(cliente.fechaAlta);
    // this.formNuevoCliente.controls['fechaMod'].setValue(cliente.fechaMod);
    this.formNuevoCliente.controls['password'].setValue(cliente.password);

  }

  submitFormulario(){
    //en funcion si es edit o crearNuevo

    //console.log(this.formNuevoCliente.value);
    if(this.formNuevoCliente.invalid){ 
      console.log('invalid');
      this.formNuevoCliente.markAllAsTouched();
      return;
    }
    if(this.router.url.includes('info')){
      var clienteUpdate = this.recogerDatos(false);
      //console.log(clienteUpdate);
      this.updateCliente(clienteUpdate);
    }else{
      var clienteNuevo = this.recogerDatos(true);
      this.createCliente(clienteNuevo);
    }
    //this.formNuevoCliente.reset();
  }

  createCliente(nuevoCliente: Cliente){
   this.subcriptionClientes = this.usuarioService.saveUsuario(nuevoCliente)
        .subscribe( resp => {
          console.log(resp);
          this.toastr.success('El usuario fue creado con exito','Usuario creado')
          this.router.navigate(['/admin/info',resp.idUsuario]);
        }, error =>{
          //console.log(error);
          this.toastr.error('Upss...El usuario no se ha creado','Usuario no guardado')
        })
        

  }

  updateCliente(updatedCliente: Cliente){
    this.subcriptionClientes = this.usuarioService.updateUsuario(updatedCliente.idUsuario, updatedCliente)
        .subscribe( resp => {
          //console.log(resp);
          this.toastr.success('El usuario fue actualizado con exito','Usuario actualizado');
          //this.router.navigate(['/admin/info',updatedCliente.idUsuario]);
          window.location.reload();
        }, error =>{
          //console.log(error);
          this.toastr.error('Upss...El usuario no se ha actualizado','Usuario no actualizado');
        });
        
  }

  //Recogemos datos del forulario y devuelve el CLiente
  recogerDatos(create:boolean):Cliente{
    
    if(create)
    {
    this.cliente = {    
      idUsuario: 0,
      nombre: this.formNuevoCliente.get('nombre')?.value,
      apellido1: this.formNuevoCliente.get('apellido1')?.value,
      apellido2: this.formNuevoCliente.get('apellido2')?.value,
      dni: this.formNuevoCliente.get('dni')?.value,
      telefono: this.formNuevoCliente.get('telefono')?.value,
      email: this.formNuevoCliente.get('email')?.value,
      fechaNac: this.formNuevoCliente.get('fechaNac')?.value,
      alta: 1,
      fechaAlta: this.formNuevoCliente.get('fechaAlta')?.value,
      fechaMod: this.formNuevoCliente.get('fechaMod')?.value,
      password: this.formNuevoCliente.get('password')?.value,
      tipoUsuario: 2
      }
    }
    else
    {
      this.cliente = {    
      idUsuario: this.formNuevoCliente.get('codigo')?.value,
      nombre: this.formNuevoCliente.get('nombre')?.value,
      apellido1: this.formNuevoCliente.get('apellido1')?.value,
      apellido2: this.formNuevoCliente.get('apellido2')?.value,
      dni: this.formNuevoCliente.get('dni')?.value,
      telefono: this.formNuevoCliente.get('telefono')?.value,
      email: this.formNuevoCliente.get('email')?.value,
      fechaNac: this.formNuevoCliente.get('fechaNac')?.value,
      alta: 1,
      fechaAlta: this.formNuevoCliente.get('fechaAlta')?.value,
      fechaMod: this.formNuevoCliente.get('fechaMod')?.value,
      password: this.formNuevoCliente.get('password')?.value,
      tipoUsuario: 2
    }
  }
    return this.cliente;
  }

  

  campoNoValido( campo: string){
    return this.formNuevoCliente.get(campo)?.invalid
          && this.formNuevoCliente.get(campo)?.touched;

  }

  cancelar(){
    this.router.navigate(['../admin/clientes']);
  }

  ngOnDestroy(): void {
    
    if(this.subcription != null) { this.subcription.unsubscribe();}
    //console.log('ondestroy');
    if(this.subcriptionClientes != null) this.subcriptionClientes.unsubscribe();
    
  }
  
}
