import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-nav-usuarios',
  templateUrl: './nav-usuarios.component.html',
  styleUrls: ['./nav-usuarios.component.css', '../../home/home.component.css']
})
export class NavUsuariosComponent implements OnInit {

  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) { }
  isAuthenticated: boolean;
  NavNoLog: boolean;
  NavLogged: boolean;
  mostrarLog: boolean;
  mostrarNoLog: boolean;
  isAdmin: boolean;

  ngOnInit(): void {
    this.isLoggedIn();
    this.isAdminis();
  }

  register() {
    Swal.fire({
      title: 'A que registro desea acceder?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      text: "You won't be able to revert this!",
      icon: 'question',

      showDenyButton: true,
      confirmButtonText: 'Professor',
      denyButtonText: 'Alumno',
      confirmButtonColor: '#1967F8',
      denyButtonColor: '#19F859',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/register-admin']);
        console.log('Profesor');
      } if (result.isDenied) {
        this.router.navigate(['/register']);
        console.log('user');
      }
    });
  }

  login() {
    Swal.fire({
      title: 'A que logueo desea acceder?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      text: "You won't be able to revert this!",
      icon: 'question',

      showDenyButton: true,
      confirmButtonText: 'Professor',
      denyButtonText: 'Alumno',
      confirmButtonColor: '#1967F8',
      denyButtonColor: '#19F859',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login-profesor']);
        console.log('Profesor');
      } if (result.isDenied) {
        this.router.navigate(['/login']);
        console.log('user');
      }
    });
  }



  BotonModificar() {
    this.NavNoLog = false;
    this.NavLogged = true;
  }

  isLoggedIn() {
    this.isAuthenticated  = this.AuthService.isLogged();
    if(this.isAuthenticated){
      this.NavLogged = true;
      this.NavNoLog = false;
    }else{
      this.NavLogged = false;
      this.NavNoLog = true;
    }
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('usernameUser');
    localStorage.removeItem('nameUser');
    localStorage.removeItem('apellidoUser');
    localStorage.removeItem('correoUser');
    localStorage.removeItem('idUser');
    localStorage.removeItem('centroUser');
    localStorage.removeItem('currentProfesor');
    localStorage.removeItem('role');
    this.AuthService.logout
    window.location.reload();
  }

  isAdminis() {
    this.isAdmin  = this.AuthService.isAdmin();
    if(this.isAdmin){
      this.mostrarLog = true;
      this.mostrarNoLog = false;
    }else{
      this.mostrarLog = false;
      this.mostrarNoLog = true;
    }
  }

}
