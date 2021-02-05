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
import { AuthGuard } from './auth/auth.guard';
import { PerfilProfesorComponent } from './components/perfiles/perfil-profesor/perfil-profesor.component';
import { PerfilAlumnoComponent } from './components/perfiles/perfil-alumno/perfil-alumno.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RegisterAdminComponent,
    PerfilProfesorComponent,
    PerfilAlumnoComponent
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
