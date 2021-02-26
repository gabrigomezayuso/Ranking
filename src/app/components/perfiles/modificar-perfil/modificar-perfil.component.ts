import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { perfilAlumno } from 'src/app/models/perfilAlumno';
import { AlumnosService } from 'src/app/services/alumnos.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {
  public user: any;
  constructor(
    private AlumnosService: AlumnosService,
    private router: Router,
    private AuthService: AuthService
  ) { }

  nombre: string;
  apellidos: string;
  usuario: string;
  correo: string;
  contrasena: string;
  id: string;
  role: string;
  centro: string;
  myForm: FormGroup;
  Modificar: boolean = true;
  Modificar1: boolean = false;
  perfilalumno;
  isAdmin: boolean;
  mostrarLog: boolean;
  mostrarNoLog: boolean;

  ngOnInit(): void {
    this.isLoggedIn();
    this.usuario = localStorage.getItem('usernameUser');
    this.nombre = localStorage.getItem('nameUser');
    this.contrasena = localStorage.getItem('contrasenaUser');
    this.apellidos = localStorage.getItem('apellidoUser');
    this.correo = localStorage.getItem('correoUser');
    this.id = localStorage.getItem('idUser');
    this.role = localStorage.getItem('role');
    if(this.isLoggedIn){
      this.centro = localStorage.getItem('centroUser');
      this.perfilalumno = new perfilAlumno(
        this.usuario,
        this.nombre,
        this.apellidos,
        this.correo,
        this.contrasena,
        this.id,
        this.role,
        this.centro
        // ''
      );
    }else{
      this.perfilalumno = new perfilAlumno(
        this.usuario,
        this.nombre,
        this.apellidos,
        this.correo,
        this.contrasena,
        this.id,
        this.role
        // ''
      );
    }

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
        ])
      }

    );

  }

  get f() {
    return this.myForm.controls;
  }

  ModificarValores() {
    this.nombre = this.myForm.controls.nombre.value;
    this.apellidos = this.myForm.controls.apellido.value;
    this.correo = this.myForm.controls.email.value;

    if(this.isLoggedIn){
      this.centro = localStorage.getItem('centroUser');
      this.perfilalumno = new perfilAlumno(
        this.usuario,
        this.nombre,
        this.apellidos,
        this.correo,
        this.contrasena,
        this.id,
        this.role,
        this.centro
        // ''
      );
    }else{
      this.perfilalumno = new perfilAlumno(
        this.usuario,
        this.nombre,
        this.apellidos,
        this.correo,
        this.contrasena,
        this.id,
        this.role
        // ''
      );
    }
  }


  GetModificarAlumno() {
    console.log(this.perfilalumno);
    this.AlumnosService.actualizarPerfil(this.perfilalumno).subscribe(
      (datos) => {
        //borramos los datos actuales
        localStorage.removeItem('currentUser');
        localStorage.removeItem('usernameUser');
        localStorage.removeItem('nameUser');
        localStorage.removeItem('apellidoUser');
        localStorage.removeItem('correoUser');
        localStorage.removeItem('idUser');
        localStorage.removeItem('role');



        //introducimos los nuevos
        localStorage.setItem('currentUser', JSON.stringify(datos[0]));
        localStorage.setItem('usernameUser', datos[0]['usuario']);
        localStorage.setItem('nameUser', datos[0]['nombre']);
        localStorage.setItem('apellidoUser', datos[0]['apellido']);
        localStorage.setItem('correoUser', datos[0]['email']);
        localStorage.setItem('idUser', datos[0]['idUsuario']);
        if(this.isAdmin){
          localStorage.setItem('role', '21232f297a57a5a743894a0e4a801fc3');
        }else{
          localStorage.setItem('role', 'ee11cbb19052e40b07aac0ca060c23ee');
        }
      }
    );
  }

  EnviarDatos() {
    this.ModificarValores();
    this.GetModificarAlumno();
    Swal.fire({
      icon: 'success',
      title: 'Modificado correctamente',
      showConfirmButton: true,
      timer: 1500
    }).then(() => {
        this.router.navigate(['/usuario']);
        window.location.reload();
    })


  }

  BotonModificar() {
    this.Modificar = false;
    this.Modificar1 = true;

  }
  Atras() {
    this.Modificar1 = false;
    this.Modificar = true;
  }

  isLoggedIn() {
    this.isAdmin  = this.AuthService.isAdmin();
    if(this.isAdmin){
      this.mostrarLog = true;
      this.mostrarNoLog = false;
    }else{
      this.mostrarLog = false;
      this.mostrarNoLog = true;
    }
  }

}
