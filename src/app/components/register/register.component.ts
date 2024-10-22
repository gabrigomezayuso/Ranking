import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmedValidator } from '../confirmed.validator';
import { usuario } from 'src/app/models/user';
import Swal from 'sweetalert2';
@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    authService: AuthService;
    submitted = false;
    myForm: FormGroup;
    alumno = new usuario;

     constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        authService: AuthService,

    ) {
      this.authService = authService;
        // redirect to home if already logged in
        this.myForm = this.formBuilder.group({
          usuario: ['', [Validators.minLength(2), Validators.maxLength(30), Validators.required]],
          contrasena: ['', [Validators.minLength(2), Validators.maxLength(15), Validators.required]],
          confirm_password: [null, Validators.required],
          email: ['', [Validators.email, Validators.required]],
          nombre: ['', [Validators.minLength(2), Validators.maxLength(15), Validators.required]],
          apellido: ['', [Validators.minLength(2), Validators.maxLength(15), Validators.required]],
        },
        {
          validator: ConfirmedValidator('contrasena', 'confirm_password')
        }
        );

    }
    registerAlumno() {

      // let alumn = new usuario(this.myForm.controls.usuario.value,
      //                        this.myForm.controls.contrasena.value)

      this.authService.registerAlumno(this.alumno).subscribe (
        datos => {
          if(datos['resultado'] == 'OK') {
            Swal.fire({
              icon: 'success',
              title: datos['mensaje'],
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              this.router.navigate(['login'])
            })

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: datos['mensaje']

            })

          }
        }
      )
      }
    ngOnInit() { }

    get f(){
      return this.myForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        this.loading = true;

    }
}
