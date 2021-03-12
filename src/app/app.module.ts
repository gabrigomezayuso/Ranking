import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './_helpers/auth.guard';
import { PerfilAlumnoComponent } from './components/perfiles/perfil-alumno/perfil-alumno.component';
import { NavUsuariosComponent } from './components/navbars/nav-usuarios/nav-usuarios.component';
import { LoginProfesorComponent } from './components/login-profesor/login-profesor.component';
import { ModificarPerfilComponent } from './components/perfiles/modificar-perfil/modificar-perfil.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModificarContrasenaComponent } from './components/perfiles/modificar-contrasena/modificar-contrasena.component';
import { GenerarRankingComponent } from './components/ranking/generar-ranking/generar-ranking.component';
import { EasterEggComponent } from './components/easter-egg/easter-egg.component';
import { MisRankingsComponent } from './components/ranking/mis-rankings/mis-rankings.component';
import { RankingComponent } from './components/ranking/ranking/ranking.component';
import { ModificarRankingsComponent } from './components/ranking/modificar-rankings/modificar-rankings.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RegisterAdminComponent,
    PerfilAlumnoComponent,
    NavUsuariosComponent,
    LoginProfesorComponent,
    ModificarPerfilComponent,
    FooterComponent,
    ModificarContrasenaComponent,
    GenerarRankingComponent,
    EasterEggComponent,
    MisRankingsComponent,
    RankingComponent,
    ModificarRankingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuard], //Agregamos a los providers el guard
  bootstrap: [AppComponent]
})
export class AppModule { }
