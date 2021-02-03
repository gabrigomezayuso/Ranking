import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from '../services/auth.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  public canActivate(user){
  //  if (this.authService.isLogged(user)!=true) //Obtenemos en nuestro servicio el rol y nos fijamos si es igual o no al de 'Admin
  // {
  //           console.log('Usted no posee permisos para acceder a esta ruta');
  //           this.router.navigate(['/']); //Lo enviamos a la página que queramos
  //           return false;
  //  }

    return user; //Este camino deja continuar con la vista con normalidad
  }
}
