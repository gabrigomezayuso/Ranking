import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alumno } from '../models/alumno';
import { BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

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

  actualizarPerfil(alumno) {
    return this.http.post<alumno>(`${environment.apiUrl}/actualizar-perfil-alumno.php`, JSON.stringify(alumno))
      .pipe(map(alumno => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(alumno));
        this.currentUserSubject.next(alumno);
        return alumno;
      }));
  }


}
