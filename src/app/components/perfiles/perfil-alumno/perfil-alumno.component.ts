import { Component, OnInit } from '@angular/core';
import { alumno } from 'src/app/models/alumno';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmedValidator } from '../confirmed.validator';
import { perfilAlumno } from 'src/app/models/perfilAlumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css'],
})
export class PerfilAlumnoComponent implements OnInit {
  public user: any;
  constructor(
    private AlumnosService: AlumnosService,
    private formBuilder: FormBuilder
  ) {}

  nombre: string;
  apellidos: string;
  usuario: string;
  correo: string;
  contrasena: string;
  id: string;
  myForm: FormGroup;
  perfilalumno = new perfilAlumno('', '', '', '', '', '');
  Modificar: boolean = true;
  Modificar1: boolean = false;

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usernameUser');
    this.nombre = localStorage.getItem('nameUser');
    this.contrasena = localStorage.getItem('contrasenaUser');
    this.apellidos = localStorage.getItem('apellidoUser');
    this.correo = localStorage.getItem('correoUser');
    this.id = localStorage.getItem('idUser');
    this.perfilalumno = new perfilAlumno(
      this.usuario,
      this.nombre,
      this.apellidos,
      this.correo,
      this.contrasena,
      this.id,
      // ''
    );
    this.myForm = new FormGroup(
      {
        nombre: new FormControl(this.nombre, [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ]),
        apellido: new FormControl(this.apellidos, [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ]),
        email: new FormControl(this.correo, [
          Validators.email,
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
      return g.get('contrasena').value === g.get('confirm_password').value
        ? null
        : { mismatch: true };
    }
    // this.myForm = this.formBuilder.group({
  }

  get f() {
    return this.myForm.controls;
  }

  ModificarValores() {


    this.nombre = this.myForm.controls.nombre.value;
    this.apellidos = this.myForm.controls.apellido.value;
    this.correo = this.myForm.controls.email.value;
    this.contrasena = this.myForm.controls.contrasena.value;
    this.perfilalumno = new perfilAlumno(
      this.usuario,
      this.nombre,
      this.apellidos,
      this.correo,
      this.contrasena,
      this.id,
      // ''

    );
  }
  GetModificarAlumno() {
    console.log(this.perfilalumno);
    this.AlumnosService.actualizarPerfil(this.perfilalumno).subscribe(
      (datos) => {
        if (datos['resultado'] == 'OK') {
          localStorage.setItem('currentUser', JSON.stringify(datos[0]));
          localStorage.setItem('usernameUser', datos[0]['usuario']);
          localStorage.setItem('nameUser', datos[0]['nombre']);
          localStorage.setItem('apellidoUser', datos[0]['apellido']);
          localStorage.setItem('correoUser', datos[0]['email']);
          localStorage.setItem('idUser', datos[0]['idUsuario']);
          localStorage.setItem('role', 'ee11cbb19052e40b07aac0ca060c23ee');
          alert(datos['mensaje']);
        } else {
          alert(datos['mensaje']);
        }
      }
    );
  }

  EnviarDatos() {
    this.ModificarValores();
    this.GetModificarAlumno();
  }

  BotonModificar() {
    this.Modificar = false;
    this.Modificar1 = true;
  }
}
