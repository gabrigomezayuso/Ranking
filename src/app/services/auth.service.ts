import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/Alumno';
import { profesor } from '../models/profesor';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<Alumno>;
  public currentUser: Observable<Alumno>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Alumno>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Alumno {
    return this.currentUserSubject.value;
  }




  login(alumno) {
    return this.http.post<Alumno>(`${environment.apiUrl}/login-alumno.php`, JSON.stringify(alumno))
      .pipe(map(alumno => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(alumno));
        this.currentUserSubject.next(alumno);
        return alumno;
      }));
  }


  isLogged(){
    if(localStorage.getItem('currentUser')){
      return true;
    }else{
      return false
    }
  }

  isAdmin(){
    if(localStorage.getItem('role') === "21232f297a57a5a743894a0e4a801fc3"){
      return true;
    }else{
      return false
    }
  }





  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('usernameUser');
    localStorage.removeItem('nameUser');
    localStorage.removeItem('apellidoUser');
    localStorage.removeItem('correoUser');
    localStorage.removeItem('centroUser');
    localStorage.removeItem('idUser');
    localStorage.removeItem('currentProfesor');
    localStorage.removeItem('centroUser');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
  }


  loginProfesor(profesor) {
    //cuando loguea le pasamos el valor al authState que es una variable de BehaviorSubject, que nos ayudara a comunicarnos de componente a servidor
    return this.http.post<profesor>(`${environment.apiUrl}/login-profesor.php`, JSON.stringify(profesor))
      .pipe(map(profesor => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentProfesor', JSON.stringify(profesor));
        this.currentUserSubject.next(profesor);
        return profesor;
      }));
  }

  registerProfesor(profesor) {
    return this.http.post(`${environment.apiUrl}/register-profesor.php`, JSON.stringify(profesor));
  }

  registerAlumno(alumno) {
    return this.http.post(`${environment.apiUrl}/register-alumno.php`, JSON.stringify(alumno));
  }
}
