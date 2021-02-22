import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-usuarios',
  templateUrl: './nav-usuarios.component.html',
  styleUrls: ['./nav-usuarios.component.css', '../../home/home.component.css']
})
export class NavUsuariosComponent implements OnInit {

  constructor(
    private AuthService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('usernameUser');
    localStorage.removeItem('nameUser');
    localStorage.removeItem('apellidoUser');
    localStorage.removeItem('correoUser');
    localStorage.removeItem('idUser');
    localStorage.removeItem('role');
    this.AuthService.logout
    window.location.reload();
  }

}
