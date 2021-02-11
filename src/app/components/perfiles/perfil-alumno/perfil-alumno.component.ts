import { Component, OnInit } from '@angular/core';
import { alumno } from 'src/app/models/alumno';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {
  public user: any;
  constructor(
    private AuthService: AuthService,
  ) {

   }
  nombre: string;
  apellidos: string;
  usuario: string;
  correo: string;
  contrasena: string;

  Modificar:boolean=true
  Modificar1:boolean=false
  ngOnInit(): void {
    this.usuario=localStorage.getItem('usernameUser');
    this.nombre=localStorage.getItem('nameUser');
    this.contrasena=localStorage.getItem('contrasenaUser');
    this.apellidos=localStorage.getItem('apellidoUser');
    this.correo=localStorage.getItem('correoUser');
  }



  BotonModificar(){
    this.Modificar=false
    this.Modificar1=true
  }

}
