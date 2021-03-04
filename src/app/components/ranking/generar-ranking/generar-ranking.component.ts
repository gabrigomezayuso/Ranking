import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { generarRanking } from 'src/app/models/generarRanking';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-generar-ranking',
  templateUrl: './generar-ranking.component.html',
  styleUrls: ['./generar-ranking.component.css', '../../home/home.component.css']
})
export class GenerarRankingComponent implements OnInit {

  constructor(
    private ProfesorService: ProfesorService,
  ) { }

  myForm: FormGroup;
  nombre: string
  generarRanking2;
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

  EnviarDatos() {
    this.nombre = this.myForm.controls.nombre.value;
    this.generarRanking2 = new generarRanking(
      this.nombre,
      this.idProfesor
    );
    console.log(this.generarRanking2)

    try {
      this.ProfesorService.actualizarPerfil(this.generarRanking2).subscribe(
        (datos) => {
          console.log(datos)
          if(datos[0]=='ERROR'){
            Swal.fire('ERROR. Este ranking ya existe')
          }
          Swal.fire('Su codigo de ranking es '+datos)
        }
      );
    }
    catch (error) {
      console.log()
      Swal.fire({
        icon: 'error',
        title: 'Login incorrecto',
        text: 'Datos introducidos incorrectos, revisa tus datos',
      })
    }

  }
}

