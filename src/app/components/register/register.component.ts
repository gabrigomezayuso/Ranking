import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmedValidator } from '../confirmed.validator';
import { alumno } from 'src/app/models/alumno';
@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    authService: AuthService;
    submitted = false;
    myForm: FormGroup;
    alumno =new alumno('','','','','','');

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
      this.authService.registerAlumno(this.alumno).subscribe (
        datos => {
          if(datos['resultado'] == 'OK') {
            alert(datos['mensaje']);
          } else {
            alert(datos['mensaje']);
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
