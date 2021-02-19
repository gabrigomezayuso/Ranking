import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { profesor } from 'src/app/models/profesor';
import {CustomValidators} from '../custom-validators'
import { ConfirmedValidator } from '../confirmed.validator';
import Swal from 'sweetalert2';

@Component({ templateUrl: 'register-admin.component.html' })
export class RegisterAdminComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    authService: AuthService;
    myForm: FormGroup;
    profesor = new profesor;


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
          centro: ['', [Validators.required]],
        },
        {
          validator: ConfirmedValidator('contrasena', 'confirm_password')
        }
        );

    }

    ngOnInit() {

    }

    get f(){
      return this.myForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;

    }

    registerProfesor() {
      this.authService.registerProfesor(this.profesor).subscribe (
        datos => {
          if(datos['resultado'] == 'OK') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: datos['mensaje'],
              showConfirmButton: false,
              timer: 1500
          })} else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: datos['mensaje']

            })
          }
        }
      )
      }

}
