import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { unirmeRanking } from 'src/app/models/unirmeRanking';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private AuthService: AuthService,
  ) {
  }


  isAuthenticated: boolean;
  NavNoLog: boolean;
  NavLogged: boolean;
  NavLoggedUser: boolean;
  mostrarLog: boolean;
  mostrarNoLog: boolean;
  isAdmin: boolean;

  mensaje;
  idRanking: string;
  unirmeRanking2;
  idUser: string;

  ngOnInit(): void {
    this.isLoggedIn();
    this.idUser = localStorage.getItem('idUser');
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
      this.isAdminis();
    }else{
      this.NavLogged = false;
      this.NavNoLog = true;
      this.NavLoggedUser=false;
    }
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

  isAdminis() {
    this.isAdmin  = this.AuthService.isAdmin();
    if(this.isAdmin){
      this.NavLogged = true;
      this.mostrarNoLog = false;
      this.NavLoggedUser=false;
    }else{
      this.mostrarLog = false;
      this.mostrarNoLog = false;
      this.NavLoggedUser=true;
    }
  }

  unirme(){
    Swal.fire({
      title: 'Introduce el código de Ranking',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Buscar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (idRanking) => {
        this.unirmeRanking2 = new unirmeRanking(idRanking, this.idUser)
        console.log(this.unirmeRanking2)
        this.AuthService.unirmeRanking(this.unirmeRanking2)
          .subscribe (
            datos => {
              this.mensaje = datos;
              Swal.fire({
                title: `${this.mensaje}`,
                // imageUrl: result.value.avatar_url
              })
            })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }
}
