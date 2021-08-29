import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styles: [
  ]
})
export class HomeAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['../auth/login']);
  }
}
