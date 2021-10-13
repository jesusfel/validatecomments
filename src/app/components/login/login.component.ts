import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dominoCoppel = '@coppel.com';
  frmLogin: FormGroup;
  showErrorRequired:boolean = false;
  showError: boolean = false;

  credentials:any;

  loginMessageError: string = "";

  constructor(
    private router: Router,
    private toastr: ToastrService) { 
    this.frmLogin = new FormGroup({
      usuario  : new FormControl('',   Validators.required),      
      password : new FormControl('',   Validators.required)
    });
  }

  ngOnInit(): void {
   localStorage.removeItem('usuarioLogueado');
  }

  login(){
    if(this.frmLogin.invalid){
      this.toastr.error("Favor de ingresar usuario y password", "Validación fallida");
      return;
    }
    
    this.credentials = this.frmLogin.value;
    let usuario: string = this.credentials.usuario;
    
    if(usuario.length <= this.dominoCoppel.length || usuario.substring(usuario.length-this.dominoCoppel.length, usuario.length) !== this.dominoCoppel){
      this.toastr.error("Solo son validos usuarios con dominio "+this.dominoCoppel, "Validación fallida");
      return;
    }

    localStorage.setItem('usuarioLogueado',usuario);
    this.router.navigate(['/listacomentario']);
    
  }

}
