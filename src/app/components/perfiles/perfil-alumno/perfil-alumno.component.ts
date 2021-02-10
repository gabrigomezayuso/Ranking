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
  constructor() { }

  Modificar:boolean=true
  Modificar1:boolean=false
  ngOnInit(): void {


    console.log(sessionStorage.getItem('currentUser'),'test');
  }

  BotonModificar(){
    this.Modificar=false
    this.Modificar1=true
  }

}
