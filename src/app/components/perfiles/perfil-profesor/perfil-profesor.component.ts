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
  ngOnInit(): void {
  }

  BotonModificar(){
    this.Modificar=false
    this.Modificar1=true
  }
}
