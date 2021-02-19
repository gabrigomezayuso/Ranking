import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { AuthGuard } from '../app/_helpers/auth.guard';
import { PerfilProfesorComponent } from './components/perfiles/perfil-profesor/perfil-profesor.component';
import { PerfilAlumnoComponent } from './components/perfiles/perfil-alumno/perfil-alumno.component';
import { LoginProfesorComponent } from './components/login-profesor/login-profesor.component';
import { AdminGuard } from '../app/_helpers/admin.guard';

const routes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'login', component: LoginComponent },
 { path: 'login-profesor', component: LoginProfesorComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'register-admin', component: RegisterAdminComponent },
 { path: 'alumno', component: PerfilAlumnoComponent, canActivate: [AuthGuard] },
 { path: 'profesor', component: PerfilProfesorComponent, canActivate: [AuthGuard, AdminGuard] },
 { path: 'home', component: HomeComponent} , //HOME es un componente que requiere ser identificado, debido a esto, le introducimos un "guardian" para controlar su acceso
 { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
