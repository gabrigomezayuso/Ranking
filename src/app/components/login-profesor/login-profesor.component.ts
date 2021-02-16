import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { profesor } from 'src/app/models/profesor';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-profesor',
  templateUrl: './login-profesor.component.html',
  styleUrls: ['./login-profesor.component.css']
})
export class LoginProfesorComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  authService: AuthService;
  myForm: FormGroup;
  profesor = new profesor();
  error = '';

  constructor(
    private AuthService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // redirect to home if already logged in
    if (this.AuthService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      usuario: ['', [Validators.minLength(2), Validators.maxLength(30), Validators.required]],
      contrasena: ['', [Validators.minLength(2), Validators.maxLength(15), Validators.required]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

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
    this.AuthService.loginProfesor(this.profesor)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data == null) {
            Swal.fire({
              icon: 'error',
              title: 'Login incorrecto',
              text: 'Datos introducidos incorrectos, revisa tus datos',
            })
          } else {
            if (data[0][0] == this.profesor.usuario) {
              console.log('Login realizado');
              this.router.navigate(['profesor']);
              localStorage.setItem('currentUser', JSON.stringify(data[0]));
              localStorage.setItem('usernameUser', data[0]['usuario']);
              localStorage.setItem('nameUser', data[0]['nombre']);
              localStorage.setItem('apellidoUser', data[0]['apellido']);
              localStorage.setItem('correoUser', data[0]['email']);
              localStorage.setItem('centroUser', data[0]['centro']);
              localStorage.setItem('idUser', data[0]['idUsuario']);
              localStorage.setItem('role', '21232f297a57a5a743894a0e4a801fc3');
            }
            // }else{
            //   Swal.fire({
            //     icon: 'error',
            //     title: 'Login incorrecto',
            //     text: 'Revisa tus datos',
            //   })
            // }
          }
        });


  }
}
