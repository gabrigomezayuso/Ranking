import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {

  constructor() { }

  Modificar:boolean=true
  Modificar1:boolean=false
  nombre: string;
  apellidos: string;
  usuario: string;
  correo: string;
  contrasena: string;
  centro: string;

    ngOnInit(): void {
      this.usuario=localStorage.getItem('usernameUser');
      this.nombre=localStorage.getItem('nameUser');
      this.contrasena=localStorage.getItem('contrasenaUser');
      this.apellidos=localStorage.getItem('apellidoUser');
      this.correo=localStorage.getItem('correoUser');
      this.centro=localStorage.getItem('centroUser');

  }

  BotonModificar(){
    this.Modificar=false
    this.Modificar1=true
  }
}
