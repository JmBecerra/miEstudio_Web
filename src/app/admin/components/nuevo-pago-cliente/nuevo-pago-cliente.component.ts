
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Pago } from '../../interfaces/pagos.interface';
import { Tarifa } from '../../interfaces/tarifas.interface';

import { TarifaService } from '../../services/tarifa.service';
import { PagoService } from '../../services/pago.service';
import { leadingComment } from '@angular/compiler';


@Component({
  selector: 'app-nuevo-pago-cliente',
  templateUrl: './nuevo-pago-cliente.component.html',
  styles: [`
  button{
    margin: 10px;

  }
   button span{
    font-size: 25px!important;
   }

  `
  ]
})
export class NuevoPagoClienteComponent implements OnInit {

  
  @Input() idCliente: number = 0;
  @Input() pagoEdit:any;
  
  hidden: boolean = false;
  isChecked = true;

  pago!:Pago;
  private _pagos: Pago[]= [];
  get pagos(): Pago[]{
    return {...this._pagos }
  }

  tarifas: Tarifa[]=[];
  metodos: string[]=['Efectivo','Tarjeta'];
 
  //@Input() create:boolean = true;
  subcription!: Subscription;
  subcription2!: Subscription;

  //   {id:1,numAct:3, precio:280,activa: true, periodo:'entrenamiento personal'},
  //   {id:1,numAct:3, precio:170,activa: true, periodo:'Duo'},
  //   {id:1,numAct:3, precio:115,activa: true, periodo:'grupo reducido'},
  // ]

  tarifasMapa = {
    '=1':'sesión',
    'other':'sesiones'
  }

  formNuevoPago:FormGroup = this.fb.group({
    tarifa:['',[ Validators.required]],
    metodo:['',[ Validators.required]],
    pagado:[false],
    precio:[''],
    fechaCuota:['',[Validators.required]],
    fechaCobro:['',[Validators.required]],

  });

  constructor(private fb:FormBuilder,
              private tarifasServices: TarifaService,
              private pagoServices: PagoService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    
    this.hidden= false
    this.initForm();

    this.subcription2 = this.formNuevoPago.controls['tarifa'].valueChanges
      
      .subscribe( tarifa =>{
        if(this.formNuevoPago.get('tarifa')?.value == undefined){
          this.formNuevoPago.controls['precio'].setValue('');
        }else{

          this.formNuevoPago.controls['precio'].setValue(tarifa.precio +"€");
        }
      });

      this.pagoServices.getPagosUsuario(this.idCliente)
        .subscribe(resp=>{
            this._pagos = resp;
           
        })
  }

 initForm(){
    
    if (this.pagoEdit== undefined) { 
      
      this.formNuevoPago.controls['fechaCuota']
        .setValue(new Date(new Date().getFullYear(),
          new Date().getUTCMonth(),
          1,
          10, 0, 0));
      this.formNuevoPago.controls['fechaCuota'].disable();
      this.formNuevoPago.controls['fechaCobro'].setValue(new Date());
      // this.obtenerTarifas();
      

    }else{
      this.rellenarCampos(this.pagoEdit);
      // this.obtenerTarifas();
    }
    this.obtenerTarifas();
  }
  
 

  submitFormulario(){
    if(this.formNuevoPago.invalid){ 
      console.log('invalid');
      this.formNuevoPago.markAllAsTouched();
      return;
    }
    if(this.pagoEdit == undefined){
      if(this.isCorrientePagos()){
        var createPago = this.recogerDatos();
        this.createPago(createPago);
      }
      this.hidden = true;
     
    }else{
      var updatePago = this.recogerDatos();
      this.updatePago(updatePago);
      this.hidden = true;
    }
    this.formNuevoPago.reset();


    
  }

  campoValido(campo: string){
    return this.formNuevoPago.get(campo)?.invalid
    && this.formNuevoPago.get(campo)?.touched;
  }

  obtenerTarifas(){
    this.subcription = this.tarifasServices.getTarifasUsuario(this.idCliente)
        .subscribe(resp=>{
          this.tarifas = resp;
          if(this.pagoEdit != undefined){
            this.formNuevoPago.get('tarifa')?.setValue(this.tarifas.filter( x=> x.idTarifa == this.pagoEdit.idTarifa)[0]);
            this.formNuevoPago.get('precio')?.setValue(this.tarifas.filter( x => x.idTarifa == this.pagoEdit.idTarifa)[0].precio + '€');
            
          }
        })

  }

  recogerDatos():Pago{
    
    if(this.pagoEdit == undefined)
    {
    this.pago = {    
      idPago: 0,
      fechaAct: this.formNuevoPago.get('fechaCuota')?.value,
      fechaCobro: this.formNuevoPago.get('fechaCobro')?.value,
      pagado: this.formNuevoPago.get('pagado')?.value, 
      metodo:  this.formNuevoPago.get('metodo')?.value == 'Efectivo' ? 1 : 2, 
      idUsuario: this.idCliente,
      idTarifa: this.formNuevoPago.get('tarifa')?.value.idTarifa
      }
    }
    else
    {
      this.pago = {    
        idPago: this.pagoEdit.idPago,
        fechaAct: this.formNuevoPago.get('fechaCuota')?.value,
        fechaCobro: this.formNuevoPago.get('fechaCobro')?.value,
        pagado: this.formNuevoPago.get('pagado')?.value, 
        metodo:  this.formNuevoPago.get('metodo')?.value == 'Efectivo' ? 1 : 2, 
        idUsuario: this.idCliente,
        idTarifa: this.formNuevoPago.get('tarifa')?.value.idTarifa, 
        }
        console.log('poagoedit', this.pago);
    }
    
    return this.pago;

  }

  rellenarCampos(pago: Pago){
    this.formNuevoPago.controls['fechaCuota'].setValue(pago.fechaAct);
    this.formNuevoPago.controls['fechaCobro'].setValue(pago.fechaCobro);
    this.formNuevoPago.controls['metodo'].setValue(pago.metodo == 1 ? this.metodos[0] : this.metodos[1]);
    this.formNuevoPago.controls['pagado'].setValue(pago.pagado);
    
 
  }

  createPago(pago: Pago){
    this.pagoServices.savePago(pago)
      .subscribe(resp=>{
          this.toastr.success('Se ha creado el pago con éxtio','Pago creado');

      }, error =>{
        console.log(error);
        this.toastr.error('Upss... no se hapodio registrar el pago','Pago no creado');
      })
  }
  updatePago(pago: Pago){
    this.pagoServices.updatePago(pago.idPago, pago)
      .subscribe(resp=>{
        this.toastr.success('El pago se ha actualizado con éxito','Pago actulizado');
      }, error=>{
        console.log(error);
        this.toastr.error('Upss...El pago no se ha actualizado con éxito','Pago no actulizado');
      });
  }

  isCorrientePagos():boolean{
    console.log(this.pagos);
    if(Object.keys(this.pagos).length !== 0 ){

      var fechaCuota = new Date(this.pagos[0].fechaAct.toString());
      var pagado: boolean = this.pagos[0].pagado;
      var fecha1mesMas = new Date(fechaCuota.setMonth(fechaCuota.getMonth()+1));
      
      if(fecha1mesMas < new Date()  && !pagado){
        console.log('cuota no activa');
        this.toastr.warning('No se puede crear un nuevo pago, hay cuotos sin abonar','Cuota impagada')
        return false;
        }
      if( fecha1mesMas > new Date() ){
        this.toastr.warning('No se puede crear un nuevo pago, hay cuotas activas','Cuota activa')
        console.log('cuota activa');
        return false;
      }
      
    }
    console.log('se puede agraegar cuota');
      return true;

  }


  cancelar(){
    this.hidden = true;
  }

  ngOnDestroy(): void {
    if(this.subcription){this.subcription.unsubscribe();}
    if(this.subcription2){this.subcription2.unsubscribe();}
  }
    
  

  

}
