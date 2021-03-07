import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { perfilAlumno } from 'src/app/models/perfilAlumno';
@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.component.html',
  styleUrls: ['./modificar-contrasena.component.css',  '../../home/home.component.css']
})
export class ModificarContrasenaComponent implements OnInit {

  constructor() { }

  Atras:boolean=false;
  Todo:boolean=false;
  contrasenas: FormGroup;
  nombre: string;
  apellidos: string;
  usuario: string;
  correo: string;
  contrasena: string;
  id: string;
  role:string;
  perfilalumno = new perfilAlumno('', '', '', '', '', '','','');
  ngOnInit(): void {

    this.usuario = localStorage.getItem('usernameUser');
    this.nombre = localStorage.getItem('nameUser');
    this.contrasena = localStorage.getItem('contrasenaUser');
    this.apellidos = localStorage.getItem('apellidoUser');
    this.correo = localStorage.getItem('correoUser');
    this.id = localStorage.getItem('idUser');
    this.role = localStorage.getItem('role');
    this.perfilalumno = new perfilAlumno(
      this.usuario,
      this.nombre,
      this.apellidos,
      this.correo,
      this.contrasena,
      this.role,
      this.id
      // ''
    );

    this.contrasenas = new FormGroup(
      {
        contrasenavieja: new FormControl(this.contrasena, [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ]),
        contrasena: new FormControl(this.contrasena, [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ]),
        confirm_password: new FormControl('', Validators.required),
      },
      passwordMatchValidator
    );

    function passwordMatchValidator(g: FormGroup) {
      const pass = g.controls.contrasena.value;
        const confirmPass = g.controls.confirm_password.value;

        return pass === confirmPass ? null : { notSame: true };
    }
  }
  get f() {
    return this.contrasenas.controls;
  }


EnviarDatos(){

}

}
