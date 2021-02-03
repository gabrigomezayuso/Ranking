import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = "http://localhost:4200";

  constructor(private http: HttpClient) {

  }
  loginUsuario(alumno) {
    return this.http.post(`${this.URL}Login.php`, JSON.stringify(alumno));
  }
}
