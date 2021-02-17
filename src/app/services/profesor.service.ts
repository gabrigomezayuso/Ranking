import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { profesor } from '../models/profesor';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private currentUserSubject: BehaviorSubject<profesor>;
  public currentUser: Observable<profesor>;

  URL = "http://localhost/";
  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<profesor>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }
  public get currentUserValue(): profesor {
    return this.currentUserSubject.value;
  }


  actualizarPerfil(profesor) {
    return this.http.post<profesor>(`${environment.apiUrl}/actualizar-perfil-profesor.php`, JSON.stringify(profesor))
      .pipe(map(profesor => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(profesor));
        this.currentUserSubject.next(profesor);
        return profesor;
      }));
}
}
