import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { AuthGuard} from '../app/auth/auth.guard';
import { PerfilProfesorComponent } from './components/perfiles/perfil-profesor/perfil-profesor.component';
import { PerfilAlumnoComponent } from './components/perfiles/perfil-alumno/perfil-alumno.component';

const routes: Routes = [
 {path: '', component: LoginComponent},
 { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'register-admin', component: RegisterAdminComponent },
 { path: 'home', component: HomeComponent, canActivate: [AuthGuard]} , //HOME es un componente que requiere ser identificado, debido a esto, le introducimos un "guardian" para controlar su acceso
 { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
