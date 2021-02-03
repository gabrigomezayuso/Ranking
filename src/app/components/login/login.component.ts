import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { alumno } from 'src/app/models/alumno';




@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    authService: AuthService;
    alumno: alumno;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router, private route: ActivatedRoute,
        authService: AuthService
    ) {
      this.authService = authService;
        // redirect to home if already logged in

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

register(){
  Swal.fire({
    title: 'A que registro desea acceder?',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    text: "You won't be able to revert this!",
    icon: 'warning',

    showCancelButton: true,
    confirmButtonText: 'Professor',
    cancelButtonText: 'Alumno',
    confirmButtonColor: '#1967F8',
    cancelButtonColor: '#19F859',
  }).then((result) => {
    if (result.isConfirmed) {

      this.router.navigate(['/register-admin']);
      console.log('Profesor');

    }else {
      this.router.navigate(['/register']);
      console.log('user');
    }
  })
}


onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

}

    loginUsuario() {
      console.log('test');
      this.authService.loginUsuario(this.alumno).subscribe (
        datos => {
          if(datos['resultado'] == 'OK') {
            alert(datos['mensaje']);
          } else {
            alert(datos['mensaje']);
          }
        }
      )
      }

    }
