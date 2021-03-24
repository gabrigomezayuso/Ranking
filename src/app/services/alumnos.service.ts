import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { perfilAlumno } from '../models/perfilAlumno';
import { BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Cambiarcontrasena } from 'src/app/models/Cambiarcontrasena';
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private currentUserSubject: BehaviorSubject<perfilAlumno>;
  public currentUser: Observable<perfilAlumno>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<perfilAlumno>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): perfilAlumno {
    return this.currentUserSubject.value;
  }



  actualizarPerfil(perfilAlumno) {
    return this.http.post<perfilAlumno>(`${environment.apiUrl}/actualizar-perfil-alumno.php`, JSON.stringify(perfilAlumno))
      .pipe(map(perfilAlumno => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(perfilAlumno));
        this.currentUserSubject.next(perfilAlumno);
        console.log(perfilAlumno);
        // Router['/alumnos'];
        return perfilAlumno;
      }));
  }
  actualizarContrasena(Cambiarcontrasena) {

    console.log(Cambiarcontrasena);

    return this.http.post<Cambiarcontrasena>(`${environment.apiUrl}/actualizar-contrasena-profesor.php`, JSON.stringify(Cambiarcontrasena))
      .pipe(map(perfilAlumno => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(Cambiarcontrasena));
        this.currentUserSubject.next(Cambiarcontrasena);
        console.log(perfilAlumno);
        // Router['/alumnos'];
        return perfilAlumno;
      }));
  }


}
