import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';

const routes: Routes = [
 {path: '', component: LoginComponent},
 { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'register-admin', component: RegisterAdminComponent },
 { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
