import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Medicion, MedicionListado } from '../../interfaces/mediciones.interface';
import { MedicionService } from '../../services/medicion.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


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
  @Input() medicionEdit!: MedicionListado;
  hidden: boolean = false;
  medicion!: Medicion;
  
  subscription!: Subscription;

  formNuevaMedicion: FormGroup = this.fb.group({
    fecha:[''],
    peso:['',[Validators.required, Validators.min(0)]],
    altura:['',[Validators.required, Validators.min(0)]],
    grasa:['',[Validators.min(0)]],
    musculo:['',[Validators.min(0)]],
    agua:['',[Validators.min(0)]],
    abdomen:['',[Validators.min(0)]],
    cintura:['',[Validators.min(0)]],
  })


  constructor(private fb: FormBuilder,
              private medicionService: MedicionService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.hidden = false;
    this.initForm();
  }
  initForm(){
    this.formNuevaMedicion.controls['fecha'].disable();
    if(this.medicionEdit == undefined){
      this.formNuevaMedicion.controls['fecha'].setValue(new Date());
      

    }else{
      this.rellenarCampos(this.medicionEdit);
    }
  }

  submitFormulario(){
    //console.log(this.formNuevoCliente.value);
    if(this.formNuevaMedicion.invalid){ 
      console.log('invalid');
      this.formNuevaMedicion.markAllAsTouched();
      return;
    }
    if(this.medicionEdit == undefined){
      var medicionCreate = this.recogerCampos();
      console.log(medicionCreate);
      this.createMedicion(medicionCreate);
      this.hidden = true;
     
    }
    else{
      var updateMedicion = this.recogerCampos();
      this.updateMedicion(updateMedicion);
      this.hidden = true;
      
    }
    //this.formNuevaMedicion.reset();

  }

  campoValido( campo: string){
    return this.formNuevaMedicion.get(campo)?.invalid
          && this.formNuevaMedicion.get(campo)?.touched;

  }

  recogerCampos():Medicion{
    
    if(this.medicionEdit == undefined){
      this.medicion = {
        idMedicion:0,
        peso: this.formNuevaMedicion.get('peso')?.value,
        altura: this.formNuevaMedicion.get('altura')?.value,
        grasa: this.formNuevaMedicion.get('grasa')?.value,
        musculo: this.formNuevaMedicion.get('musculo')?.value,
        agua: this.formNuevaMedicion.get('agua')?.value,
        abdomen: this.formNuevaMedicion.get('abdomen')?.value,
        cintura: this.formNuevaMedicion.get('cintura')?.value,
      }
      return this.medicion;
    }else{
      this.medicionEdit = {
        idMedicionUsaurio: this.medicionEdit.idMedicionUsaurio,
        idMedicion:this.medicionEdit.idMedicion,
        peso: this.formNuevaMedicion.get('peso')?.value,
        altura: this.formNuevaMedicion.get('altura')?.value,
        grasa: this.formNuevaMedicion.get('grasa')?.value,
        musculo: this.formNuevaMedicion.get('musculo')?.value,
        agua: this.formNuevaMedicion.get('agua')?.value,
        abdomen: this.formNuevaMedicion.get('abdomen')?.value,
        cintura: this.formNuevaMedicion.get('cintura')?.value,
        fecha: this.formNuevaMedicion.get('fecha')?.value,
      }
      return this.medicionEdit;

    }
    
  }

  rellenarCampos(medicion: MedicionListado){
    
    this.formNuevaMedicion.controls['fecha'].setValue(medicion.fecha);
    this.formNuevaMedicion.controls['peso'].setValue(medicion.peso);
    this.formNuevaMedicion.controls['altura'].setValue(medicion.altura);
    this.formNuevaMedicion.controls['grasa'].setValue(medicion.grasa);
    this.formNuevaMedicion.controls['musculo'].setValue(medicion.musculo);
    this.formNuevaMedicion.controls['agua'].setValue(medicion.agua);
    this.formNuevaMedicion.controls['abdomen'].setValue(medicion.abdomen);
    this.formNuevaMedicion.controls['cintura'].setValue(medicion.cintura);
  
  }

  createMedicion(medicion:Medicion ){
    this.subscription = this.medicionService.saveMedicion(medicion, this.idCliente)
      .subscribe(resp =>{
        this.toastr.success('La medición se ha guardado con éxitp','Medición grabada');
        
      }, error=>{
        console.log(error);
        this.toastr.error('Upss....La medición no se ha guardado con éxitp','Medición no grabada');
      })

  }

  updateMedicion(medicion: Medicion){
    this.subscription = this.medicionService.updateMedicion(medicion.idMedicion, medicion)
      .subscribe(resp=>{
        this.toastr.success('Se ha actualizado la medicón con éxtio','Medición actulizada');
      }, error=>{
        console.log(error);
        this.toastr.error('Upss.. no se ha actualizado la medicón','Medición no actulizada');
      });

  }

  cancelar(){
    this.hidden = true;
    this.ngOnDestroy();
      
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription){ this.subscription.unsubscribe();}
  }

}
