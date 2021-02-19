import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-profesores',
  templateUrl: './nav-profesores.component.html',
  styleUrls: ['./nav-profesores.component.css']
})
export class NavProfesoresComponent implements OnInit {

  constructor(    private AuthService: AuthService,
    ) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('currentProfesor');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('usernameUser');
    localStorage.removeItem('nameUser');
    localStorage.removeItem('apellidoUser');
    localStorage.removeItem('correoUser');
    localStorage.removeItem('idUser');
    localStorage.removeItem('role');
    localStorage.removeItem('centroUser');
    this.AuthService.logout
    window.location.reload();
  }
}
