import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {perfilProfesor} from '../models/PerfilProfesor';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private currentUserSubject: BehaviorSubject<perfilProfesor>;
  public currentUser: Observable<perfilProfesor>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<perfilProfesor>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }
  public get currentUserValue(): perfilProfesor {
    return this.currentUserSubject.value;
  }


  actualizarPerfil(perfilProfesor) {
    return this.http.post<perfilProfesor>(`${environment.apiUrl}/actualizar-perfil-profesor.php`, JSON.stringify(perfilProfesor))
      .pipe(map(perfilProfesor => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(perfilProfesor));
        this.currentUserSubject.next(perfilProfesor);
        return perfilProfesor;
      }));
}
}
