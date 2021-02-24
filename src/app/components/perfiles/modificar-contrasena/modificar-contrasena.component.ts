import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.component.html',
  styleUrls: ['./modificar-contrasena.component.css']
})
export class ModificarContrasenaComponent implements OnInit {

  constructor(private router:Router) { }

  Atras:boolean=false;
  Todo:boolean=false;
  ngOnInit(): void {
  }

Router
  BotonAtras(){
    this.router.navigate(['usuario']);

  }
}
