import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { generarRanking } from 'src/app/models/generarRanking';
import { ProfesorService } from 'src/app/services/profesor.service';
@Component({
  selector: 'app-generar-ranking',
  templateUrl: './generar-ranking.component.html',
  styleUrls: ['./generar-ranking.component.css',   '../../home/home.component.css']
})
export class GenerarRankingComponent implements OnInit {

  constructor(
    private ProfesorService: ProfesorService,
  ) { }

  myForm: FormGroup;
  nombre:string
  generarRanking;
  idProfesor: string;

  ngOnInit(): void {
    this.idProfesor = localStorage.getItem('idUser');
    this.myForm = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ])
      }

    );
  }

  EnviarDatos(){
    this.nombre = this.myForm.controls.nombre.value;
    this.generarRanking = new generarRanking(
    this.nombre,
    this.idProfesor
    );
    this.AlumnosService.actualizarPerfil(this.generarRanking).subscribe(
      (datos) => {
        //borramos los datos actuales
        localStorage.removeItem('currentUser');
        localStorage.removeItem('usernameUser');
        localStorage.removeItem('nameUser');
        localStorage.removeItem('apellidoUser');
        localStorage.removeItem('correoUser');
        localStorage.removeItem('idUser');
        localStorage.removeItem('role');



        //introducimos los nuevos
        localStorage.setItem('currentUser', JSON.stringify(datos[0]));
        localStorage.setItem('usernameUser', datos[0]['usuario']);
        localStorage.setItem('nameUser', datos[0]['nombre']);
        localStorage.setItem('apellidoUser', datos[0]['apellido']);
        localStorage.setItem('correoUser', datos[0]['email']);
        localStorage.setItem('idUser', datos[0]['idUsuario']);
        if(this.isAdmin){
          localStorage.setItem('role', '21232f297a57a5a743894a0e4a801fc3');
        }else{
          localStorage.setItem('role', 'ee11cbb19052e40b07aac0ca060c23ee');
        }
      }
    );
  }



}
