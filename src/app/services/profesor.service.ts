import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {perfilProfesor} from '../models/PerfilProfesor';
import {generarRanking} from '../models/generarRanking';
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


  generarRanking(generarRankings) {
    return this.http.post<generarRanking>(`${environment.apiUrl}/generarRanking.php`, JSON.stringify(generarRankings))
}



}
