import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alumno } from '../models/alumno';
import { profesor } from '../models/profesor';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<alumno>;
  public currentUser: Observable<alumno>;


  URL = "http://localhost/";
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<alumno>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): alumno {
    return this.currentUserSubject.value;
  }


  login(alumno) {
    return this.http.post<alumno>(`${environment.apiUrl}/login-alumno.php`, JSON.stringify(alumno))
      .pipe(map(alumno => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(alumno));
        this.currentUserSubject.next(alumno);
        return alumno;
      }));
  }





  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('usernameUser');
    localStorage.removeItem('nameUser');
    localStorage.removeItem('apellidoUser');
    localStorage.removeItem('correoUser');
    localStorage.removeItem('idUser');
    this.currentUserSubject.next(null);
  }


  loginProfesor(profesor) {
    //cuando loguea le pasamos el valor al authState que es una variable de BehaviorSubject, que nos ayudara a comunicarnos de componente a servidor
    return this.http.post<profesor>(`${environment.apiUrl}/login-profesor.php`, JSON.stringify(profesor))
      .pipe(map(profesor => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(alumno));
        this.currentUserSubject.next(profesor);
        return profesor;
      }));
  }

  registerProfesor(profesor) {
    return this.http.post(`${this.URL}register-profesor.php`, JSON.stringify(profesor));
  }

  registerAlumno(alumno) {
    return this.http.post(`${this.URL}register-alumno.php`, JSON.stringify(alumno));
  }

  isAuthenticated() {
    //en caso de ser logueado y hacer el return correcto de la funcion loginUsuario, este devolvera el valor, en este caso "true" en caso de ser logueado

  }

  isAdmin() {
    //en caso de ser logueado como admin y hacer el return correcto de la funcion loginUsuario, este devolvera el valor, en este caso "true" en caso de ser logueado
  }

}
