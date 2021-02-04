import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // getea la password desde el campo password
    const confirmPassword: string = control.get('confirmPassword').value; // getea la password desde nuestro campo confirmPassword form control
    // compara las contraseñas
    if (password !== confirmPassword) {
      // si las passwords no corresponden, setea un error en nuestro confirmPassword control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }
}
