import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { alumno } from 'src/app/models/alumno';
import { first } from 'rxjs/operators';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  authService: AuthService;
  myForm: FormGroup;
  alumno = new alumno();
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
    this.AuthService.login(this.alumno)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data['nombre'])
          if (data[0][0] == this.alumno.usuario) {
            console.log('Login realizado');
            this.router.navigate(['alumno']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login incorrecto',
              text: 'Revisa tus datos',

          })
        }});
  }
  /*cdfbvcdfcdvb
    loginUsuario() {
      console.log('Login');
      this.authService.loginUsuario(this.alumno).subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          console.log(datos['nombre'])
          console.log('Login realizado');
          this.router.navigate(['alumno']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login incorrecto',
            text: 'Revisa tus datos',
          });
          console.log('Login fallido');
        }
      });
    }
    */
}

