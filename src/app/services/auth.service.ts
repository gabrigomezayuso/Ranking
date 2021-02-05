import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alumno } from '../models/alumno';
import { profesor } from '../models/profesor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);
  authStateAdmin = new BehaviorSubject(false);

  URL = "http://localhost/";
  constructor(private http: HttpClient) {
  }

  loginUsuario(alumno) {
    //cuando loguea le pasamos el valor al authState que es una variable de BehaviorSubject, que nos ayudara a comunicarnos de componente a servidor
    this.authState.next(true);
    this.authStateAdmin.next(false);
    return this.http.post(`${this.URL}login-alumno.php`, JSON.stringify(alumno));
  }

  loginProfesor(profesor) {
    //cuando loguea le pasamos el valor al authState que es una variable de BehaviorSubject, que nos ayudara a comunicarnos de componente a servidor
    this.authState.next(true);
    this.authStateAdmin.next(true);
    return this.http.post(`${this.URL}login-profesor.php`, JSON.stringify(profesor));
  }

  registerProfesor(profesor) {
    return this.http.post(`${this.URL}register-profesor.php`, JSON.stringify(profesor));
  }

  registerAlumno(alumno) {
    return this.http.post(`${this.URL}register-alumno.php`, JSON.stringify(alumno));
  }

  isAuthenticated() {
    //en caso de ser logueado y hacer el return correcto de la funcion loginUsuario, este devolvera el valor, en este caso "true" en caso de ser logueado
    return this.authState.value;
  }

  isAdmin() {
    //en caso de ser logueado como admin y hacer el return correcto de la funcion loginUsuario, este devolvera el valor, en este caso "true" en caso de ser logueado
    return this.authStateAdmin.value;
  }

}
