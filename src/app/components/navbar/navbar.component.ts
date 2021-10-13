import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  local : any;
  constructor(private router: Router) { 
    this.local = localStorage ;
  }

  ngOnInit(): void {
   
  }

  logOut(){
    this.router.navigate(['/']);
  }

}
