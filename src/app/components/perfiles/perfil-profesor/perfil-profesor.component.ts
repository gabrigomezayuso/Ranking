import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { perfilProfesor } from 'src/app/models/PerfilProfesor';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {
  public user: any;
  constructor(
    private ProfesorService: ProfesorService,
    private formBuilder: FormBuilder
  ) {}


  nombre: string;
  apellidos: string;
  usuario: string;
  correo: string;
  contrasena: string;
  centro:string;
  id: string;
  myForm: FormGroup;
  perfilprofe = new perfilProfesor('', '', '', '', '', '','');
  Modificar: boolean = true;
  Modificar1: boolean = false;

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usernameUser');
    this.nombre = localStorage.getItem('nameUser');
    this.contrasena = localStorage.getItem('contrasenaUser');
    this.apellidos = localStorage.getItem('apellidoUser');
    this.correo = localStorage.getItem('correoUser');
    this.centro=localStorage.getItem('centroUser');
    this.id = localStorage.getItem('idUser');
    this.perfilprofe = new perfilProfesor(
      this.usuario,
      this.nombre,
      this.apellidos,
      this.correo,
      this.contrasena,
      this.centro,
      this.id
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
        centro: new FormControl(this.centro, [
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
    this.centro = this.myForm.controls.centro.value;
    this.perfilprofe = new perfilProfesor(
      this.usuario,
      this.nombre,
      this.apellidos,
      this.correo,
      this.contrasena,
      this.centro,
      this.id
      // ''
    );
  }
  GetModificarAlumno() {
    console.log(this.perfilprofe);
    this.ProfesorService.actualizarPerfil(this.perfilprofe).subscribe(
      (data) => {
          //borramos los datos actuales
          localStorage.removeItem('currentUser');
          localStorage.removeItem('usernameUser');
          localStorage.removeItem('nameUser');
          localStorage.removeItem('apellidoUser');
          localStorage.removeItem('correoUser');
          localStorage.removeItem('centroUser');
          localStorage.removeItem('idUser');
          localStorage.removeItem('role');

          //introducimos los nuevos
          localStorage.setItem('currentUser', JSON.stringify(data[0]));
          localStorage.setItem('usernameUser', data[0]['usuario']);
          localStorage.setItem('nameUser', data[0]['nombre']);
          localStorage.setItem('apellidoUser', data[0]['apellido']);
          localStorage.setItem('correoUser', data[0]['email']);
          localStorage.setItem('centroUser', data[0]['centro']);
          localStorage.setItem('idUser', data[0]['idUsuario']);
          localStorage.setItem('role', '21232f297a57a5a743894a0e4a801fc3');
      }
    );
  }

  EnviarDatos() {
    this.ModificarValores();
    this.GetModificarAlumno();
    Swal.fire(
      'Modificado correctamente',
      'Los valores han cambiado',
      'success'
    )
    this.Modificar = true;
    this.Modificar1 = false;
  }

  BotonModificar() {
    this.Modificar = false;
    this.Modificar1 = true;
  }
}
