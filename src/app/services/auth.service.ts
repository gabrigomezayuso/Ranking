import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { profesor } from '../models/profesor';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { usuario } from '../models/user';
import { unirmeRanking } from '../models/unirmeRanking';
import { consultarRankings } from '../models/consultarRankings';
import { datosRanking } from '../models/datosRanking';
import { consultaNombre } from '../models/consultaNombre';
import { Ranking_modificarArray } from '../models/Ranking_modificarArray';
import { cambiarEquipo } from '../models/cambiarEquipo';
import { generarRanking } from '../models/generarRanking';
import { EliminarRanking } from '../models/EliminarRanking';
import { Router } from '@angular/router';
import { datosEntrega } from '../models/datosEntrega';
import { consultaEntrega } from '../models/consutaEntrega';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<usuario>;
  public currentUser: Observable<usuario>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): usuario {
    return this.currentUserSubject.value;
  }




  login(alumno) {
    return this.http.post<usuario>(`${environment.apiUrl}/login-alumno.php`, JSON.stringify(alumno))
      .pipe(map(alumno => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.currentUserSubject.next(alumno);
        return alumno;
      }));
  }


  isLogged() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false
    }
  }

  isAdmin() {
    if (localStorage.getItem('role') === "21232f297a57a5a743894a0e4a801fc3") {
      return true;
    } else {
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
        // localStorage.setItem('currentProfesor', JSON.stringify(profesor));
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

  unirmeRanking(unirmeRanking2) {
    return this.http.post<unirmeRanking>(`${environment.apiUrl}/unirRanking.php`, JSON.stringify(unirmeRanking2))
  }

  consultarRankings(consultarRanking) {
    return this.http.post<consultarRankings>(`${environment.apiUrl}/rankingsUsuario.php`, JSON.stringify(consultarRanking))
  }

  consultarRankingsAdmin(consultarRanking) {
    return this.http.post<consultarRankings>(`${environment.apiUrl}/rankingAdmin.php`, JSON.stringify(consultarRanking))
  }

  datosRanking(ranking) {

    return this.http.post<consultaNombre>(`${environment.apiUrl}/datos-ranking.php`, JSON.stringify(ranking))
  }

  datosEntrega(ranking) {

    return this.http.post<consultaEntrega>(`${environment.apiUrl}/datos-ranking-entrega.php`, JSON.stringify(ranking))
  }


  modificarPerfil(datosRanking) {
    return this.http.post<datosRanking>(`${environment.apiUrl}/datos-ranking.php`, JSON.stringify(datosRanking))
      .pipe(map(datosRanking => {
        console.log(datosRanking);
        // Router['/alumnos'];
        return datosRanking;
      }));
  }

  modificarRanking(Ranking_modificarArray){
    console.log("guardar2");

    console.log(Ranking_modificarArray.value);
    return this.http.post<Ranking_modificarArray>(`${environment.apiUrl}/modificar-datos-ranking.php`, JSON.stringify(Ranking_modificarArray.value))
  }

  modificarEquipoRanking(cambiarEquipo){


    return this.http.post<cambiarEquipo>(`${environment.apiUrl}/cambiarEquipo.php`, JSON.stringify(cambiarEquipo))

  }


  eliminarRanking(id_ranking){
    console.log(id_ranking);
    return this.http.post<EliminarRanking>(`${environment.apiUrl}/eliminarRanking.php`, JSON.stringify(id_ranking))

}

generarNuevoCodigoRanking(generarRankings) {
  return this.http.post<generarRanking>(`${environment.apiUrl}/generarNuevoCodigo.php`, JSON.stringify(generarRankings))
}

getEntregas(id_ranking) {
  console.log(id_ranking);

  return this.http.post(`${environment.apiUrl}/getEntregas.php`, JSON.stringify(id_ranking))
}

getEntregasNombre(id_ranking) {
  console.log(id_ranking);

  return this.http.post(`${environment.apiUrl}/getEntregasNombre.php`, JSON.stringify(id_ranking))
}




crearEntregas(datosEntrega) {
  console.log(datosEntrega);
//falta pasar datosEntrega q es un formgroup a array
  return this.http.post<datosEntrega>(`${environment.apiUrl}/createEntregas.php`, JSON.stringify(datosEntrega))
}


}
