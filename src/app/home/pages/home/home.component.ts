import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .container {
    padding-top: 70px;
  }
  
  `
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              ) { }

  ngOnInit(): void {
  }

  login(){  
    console.log('Login');
    this.router.navigate(['./auth/login']);
  }
  logout(){

  }

}
