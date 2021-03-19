import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { consultaNombre } from 'src/app/models/consultaNombre';
import { ModificarRanking } from 'src/app/models/ModificarRanking';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-modificar-rankings',
  templateUrl: './modificar-rankings.component.html',
  styleUrls: ['./modificar-rankings.component.css', '../../home/home.component.css']
})
export class ModificarRankingsComponent implements OnInit {

  Ranking;

  Ranking_modificarArray = new FormArray([]);
  nombre_ranking: string;
  nombreEquipo: string;
  puntuacion: number;
  x: number = 0;
  casa: boolean = true;
  longitud;
  object;

  constructor(private AuthService: AuthService, private router: Router) {
    this.Ranking = new consultaNombre(
      this.nombre_ranking,
      // ''
    );
    this.Ranking.nombre_ranking = this.router.url.split('/')[2];
  }

  ngOnInit(): void {


    console.log(this.Ranking.nombre_ranking);

    this.AuthService.datosRanking(this.Ranking).subscribe(
      datos => {
        this.Ranking = datos;
        this.object = datos;
        console.log(this.object);

        console.log(this.Ranking);
        console.log(this.Ranking.length);
        this.longitud=this.Ranking.length;
        console.log(this.longitud)

        for (let index = 0; index < this.longitud; index++) {



          this.Ranking_modificarArray.push(new FormGroup(
            {
              nombreEquipo: new FormControl(this.Ranking[index]['nombreEquipo'], [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ]),
              idUsuario: new FormControl(this.Ranking[index]['idUsuario'], [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ]),
              nombre: new FormControl(this.Ranking[index]['nombre'], [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ]),
              apellido: new FormControl(this.Ranking[index]['apellido'], [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ]),
              puntuacion: new FormControl(parseInt(this.Ranking[index]['puntuacion']), [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ])
            }));




        }


      })




  }

  guardarDatos() {
    console.log("guardar");

    this.AuthService.modificarRanking(this.Ranking_modificarArray).subscribe(
      (datos) => {
        console.log(datos)
        Swal.fire('Datos actualizados correctamente')
      })
    }
    nuevoCodigo() {
      this.AuthService.generarNuevoCodigoRanking(this.nombre_ranking).subscribe(
        (datos) => {
          console.log(datos)
          Swal.fire('El nuevo codigo es  '+datos)
        })
      }


  test() {

    this.nombreEquipo = this.Ranking[1]['nombreEquipo'];
    console.log(this.Ranking);
    this.puntuacion = parseInt(this.Ranking[1]['puntuacion']);
    console.log(this.nombreEquipo);




  }

}
