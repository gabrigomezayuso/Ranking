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

  URL = "http://localhost/";

  constructor(private http: HttpClient) {

  }
  loginUsuario(alumno) {
    this.authState.next(true);
    return this.http.post(`${this.URL}Login.php`, JSON.stringify(alumno));

  }

  isLogged(user){
    this.authState.next(true);
  }

  isNotLogged(){
    this.authState.next(false);
  }

  registerProfesor(profesor) {
    return this.http.post(`${this.URL}register.php`, JSON.stringify(profesor));
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
