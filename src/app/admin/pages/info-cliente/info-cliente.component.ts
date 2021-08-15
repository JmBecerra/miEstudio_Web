import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.component.html',
  styles: [
  ]
})
export class InfoClienteComponent implements OnInit {

  
  id:number=0;
  opcion:number =0;
  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(pms =>{
     this.id = pms['id'];
    });

    this.opcion = 1;
  }

}
