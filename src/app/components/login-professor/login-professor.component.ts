import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { profesor } from 'src/app/models/profesor';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-professor',
  templateUrl: './login-professor.component.html',
  styleUrls: ['./login-professor.component.css']
})
export class LoginProfessorComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  authService: AuthService;
  authGuard: AuthGuard;
  myForm: FormGroup;
  profesor = new profesor();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    authService: AuthService,
    AuthGuard: AuthGuard
  ) {
    this.authService = authService;
    // redirect to home if already logged in
    this.myForm = this.formBuilder.group({
      usuario: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.required,
        ],
      ],
      contrasena: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit() {}

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
      } if(result.isDenied) {
        this.router.navigate(['/register']);
        console.log('user');
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
  }

  loginProfessor() {
    console.log('Login');
    this.authService.loginUsuario(this.profesor).subscribe((datos) => {
      if (datos['resultado'] == 'OK') {
        console.log('Login realizado');
        this.router.navigate(['profesor']);
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
}
