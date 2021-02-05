import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {

  constructor() { }

  Modificar:boolean=true
  Modificar1:boolean=false
  ngOnInit(): void {
  }

  BotonModificar(){
    this.Modificar=false
    this.Modificar1=true
  }

}
