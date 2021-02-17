import { Component, OnInit } from '@angular/core';
import { alumno } from 'src/app/models/alumno';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../confirmed.validator';


@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {
  public user: any;
  constructor(
    private AuthService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  nombre: string;
  apellidos: string;
  usuario: string;
  correo: string;
  contrasena: string;
  myForm: FormGroup;
  alumno = new alumno();
  Modificar: boolean = true
  Modificar1: boolean = false

  ngOnInit(): void {

    this.usuario = localStorage.getItem('usernameUser');
    this.nombre = localStorage.getItem('nameUser');
    this.contrasena = localStorage.getItem('contrasenaUser');
    this.apellidos = localStorage.getItem('apellidoUser');
    this.correo = localStorage.getItem('correoUser');

    this.myForm = new FormGroup({
      nombre: new FormControl(this.nombre, [Validators.minLength(2), Validators.maxLength(15), Validators.required]),
      apellido:  new FormControl(this.apellidos, [Validators.minLength(2), Validators.maxLength(15), Validators.required]),
      email: new FormControl(this.correo, [Validators.email, Validators.required]),
      contrasena: new FormControl(this.correo, [Validators.minLength(2), Validators.maxLength(15), Validators.required]),
      confirm_password:new FormControl(this.correo, Validators.required),
    }
    );


    console.log(this.myForm.controls);


    // this.myForm = this.formBuilder.group({


  }


  get f() {
    return this.myForm.controls;
  }

  EnviarDatos() {
    console.log(this.alumno);
  }

  BotonModificar() {
    this.Modificar = false
    this.Modificar1 = true
  }

}
