import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { consultaNombre } from 'src/app/models/consultaNombre';
import { generarRanking } from 'src/app/models/generarRanking';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { consultaEntrega } from 'src/app/models/consutaEntrega';
import { datosEntrega } from 'src/app/models/datosEntrega';
@Component({
  selector: 'app-modificar-rankings',
  templateUrl: './modificar-rankings.component.html',
  styleUrls: [
    './modificar-rankings.component.css',
    '../../home/home.component.css',
  ],
})
export class ModificarRankingsComponent implements OnInit {
  Ranking: consultaNombre;
  RankingEntrega: consultaEntrega;
  Ranking_modificarArray = new FormArray([]);
  nombre_ranking: string;
  nombreEquipo: string;
  puntuacion: number;
  x: number = 0;
  casa: boolean = true;
  longitud: number;
  ArrayPracticas = [];
  ArrayNombrePracticas = [];
  model: generarRanking;
  idUser: string;
  FormEntregasControl: FormControl = new FormControl();
  crearEntregaControl: FormGroup;
  datosEntrega = new datosEntrega('', '');
  selectControl: FormControl = new FormControl();
  saved: boolean;
  RankingSimple: consultaNombre;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.Ranking = new consultaNombre(this.nombre_ranking);
    this.Ranking.nombre_ranking = this.router.url.split('/')[2];


  }

  ngOnInit(): void {


    this.AuthService.datosRankingSimple(this.Ranking).subscribe((datos) => {
      datos.sort(function (a, b) {
        var textA = a.apellido.toUpperCase();
        var textB = b.apellido.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      console.log(datos);

      this.Ranking = datos;
      this.RankingSimple = datos;
      this.longitud = this.Ranking.length;
      this.saved=true;

      console.log(this.Ranking);

      console.log(this.Ranking[0]['id_ranking']);

      this.AuthService.getEntregasNombre(this.Ranking[0]['id_ranking']).subscribe(
        (datos) => {
          console.log(datos);

          this.ArrayNombrePracticas = Object.values(datos);
          this.selectControl.setValue(this.ArrayNombrePracticas[0][0]);
          this.mySelectHandler(this.ArrayNombrePracticas[0][0]);
        }
      );

    });
  }



  guardarDatos() {


    this.AuthService.modificarRanking(this.Ranking_modificarArray).subscribe(
      (datos) => {

        Swal.fire('Datos actualizados correctamente');
      }
    );
  }

  nuevoCodigo() {
    this.model = new generarRanking(this.Ranking[0]['id_ranking'], this.Ranking[0][0]);
    this.AuthService.generarNuevoCodigoRanking(this.model).subscribe(
      (datos) => {

        Swal.fire('El nuevo codigo es  ' + datos);
      }
    );
  }

  crearEntrega(name) {
    console.log("aaa");

    console.log(this.Ranking);

    this.crearEntregaControl = this.formBuilder.group({
      idRanking: [
        this.RankingSimple[0]['id_ranking'],
        [
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.required,
        ],
      ],
      nombreEntrega: [
        name,
        [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ],
      ],
    });

    this.datosEntrega = new datosEntrega(this.RankingSimple[0]['id_ranking'], name);

    console.log(this.datosEntrega);

    this.AuthService.crearEntrega(this.datosEntrega).subscribe((datos) => {
      this.ArrayNombrePracticas = Object.values(datos);

      Swal.fire('Datos creados');
    });
  }

  mySelectHandler($event) {
    this.RankingEntrega = new consultaEntrega(
      this.router.url.split('/')[2],
      $event
      // ''
    );


    this.AuthService.datosEntrega(this.RankingEntrega).subscribe((datos) => {


      // datos.sort(function (a, b) {
      //   var textA = a.apellido.toUpperCase();
      //   var textB = b.apellido.toUpperCase();
      //   return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      // });

      this.Ranking = datos;


      this.longitud = this.Ranking.length;
      this.nombreEquipo = this.Ranking[0]['nombreEquipo'];
      this.puntuacion = parseInt(this.Ranking[0]['puntuacion']);

      this.Ranking_modificarArray.clear();

      for (let index = 0; index < this.longitud; index++) {
        this.Ranking_modificarArray.push(
          new FormGroup({
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
            nick: new FormControl(this.Ranking[index]['usuario'], [
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
            puntuacion: new FormControl(
              parseInt(this.Ranking[index]['puntuacion']),
              [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ]
            ),
            idranking: new FormControl(
              parseInt(this.Ranking[index]['id_ranking']),
              [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ]
            ),
            identrega: new FormControl(
              parseInt(this.Ranking[index]['identrega']),
              [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ]
            ),
          })
        );
      }


      this.AuthService.getEntregas(this.Ranking[0]['id_ranking']).subscribe((datos) => {

        this.ArrayPracticas = Object.values(datos);

      });

      this.AuthService.getEntregasNombre(this.Ranking[0]['id_ranking']).subscribe(
        (datos) => {

          this.ArrayNombrePracticas = Object.values(datos);

        }
      );
    });
  }
}
