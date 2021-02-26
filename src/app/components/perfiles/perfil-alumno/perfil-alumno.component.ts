import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { perfilAlumno } from 'src/app/models/perfilAlumno';
import { AlumnosService } from 'src/app/services/alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css',  '../../home/home.component.css'],
})
export class PerfilAlumnoComponent implements OnInit {
  public user: any;
  constructor(
    private AlumnosService: AlumnosService,
    private formBuilder: FormBuilder
  ) { }

usuario:string;
  Modificar: boolean = true;
  Modificar1: boolean = false;
  ModificarPass:boolean = false;

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usernameUser');
  }


  BotonModificar() {
    this.Modificar = false;
    this.Modificar1 = true;

  }

  BotonContrasena() {
    this.Modificar = false;
    this.ModificarPass = true;
  }
  AtrasPass(){
    this.ModificarPass = false;
    this.Modificar = true;


  }

  Cancelar(){
    this.Modificar = true;
    this.Modificar1 = false;
  }
}
