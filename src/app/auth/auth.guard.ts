import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from '../services/auth.service'


@Injectable()
export class AuthGuard implements CanActivate {

  //PARA REALIZAR EL GUARDIAN UTILIZAMOS LA FUNCION CanActivate para checkear la ruta y si tiene acceso o no
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if(this.authService.isAuthenticated()!=true){
      //en caso de no estar logueado, eta condicional le mandara al login y devolvera un valor false para la ruta
      this.router.navigate(['login']);
      return false
    }

    //en caso contrario, entrara
    return true
    }
}
