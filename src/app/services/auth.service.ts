import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alumno } from '../models/alumno';
import { profesor } from '../models/profesor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = "http://localhost/";

  constructor(private http: HttpClient) {

  }
  loginUsuario(alumno) {
    return this.http.post(`${this.URL}Login.php`, JSON.stringify(alumno));

  }

  isLogged(user){
    return user;
  }

  isNotLogged(){
    return false
  }

  registerProfesor(profesor) {
    return this.http.post(`${this.URL}register.php`, JSON.stringify(profesor));
  }
}
