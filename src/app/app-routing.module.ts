import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { AuthGuard } from '../app/_helpers/auth.guard';
import { PerfilAlumnoComponent } from './components/perfiles/perfil-alumno/perfil-alumno.component';
import { LoginProfesorComponent } from './components/login-profesor/login-profesor.component';
import { AdminGuard } from '../app/_helpers/admin.guard';
import { GenerarRankingComponent } from './components/ranking/generar-ranking/generar-ranking.component';
import { EasterEggComponent } from './components/easter-egg/easter-egg.component';
import { MisRankingsComponent } from './components/ranking/mis-rankings/mis-rankings.component';
import { RankingComponent } from './components/ranking/ranking/ranking.component';
import { ModificarRankingsComponent } from './components/ranking/modificar-rankings/modificar-rankings.component';


const routes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'login', component: LoginComponent },
 { path: 'login-profesor', component: LoginProfesorComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'register-admin', component: RegisterAdminComponent },
 { path: 'try-again', component: EasterEggComponent },
 { path: 'usuario', component: PerfilAlumnoComponent, canActivate: [AuthGuard] },
 { path: 'ranking/:id', component: RankingComponent, canActivate: [AuthGuard] },
 { path: 'mis-rankings', component: MisRankingsComponent, canActivate: [AuthGuard] },
 { path: 'home', component: HomeComponent} , //HOME es un componente que requiere ser identificado, debido a esto, le introducimos un "guardian" para controlar su acceso
 { path: 'generar-ranking', component: GenerarRankingComponent, canActivate: [AuthGuard, AdminGuard]} , //HOME es un componente que requiere ser identificado, debido a esto, le introducimos un "guardian" para controlar su acceso
 { path: 'modificar-rankings', component: ModificarRankingsComponent, canActivate: [AuthGuard, AdminGuard]} ,
 { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
