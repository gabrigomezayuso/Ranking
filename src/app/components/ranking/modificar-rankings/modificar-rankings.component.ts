import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { consultaNombre } from 'src/app/models/consultaNombre';
import { generarRanking } from 'src/app/models/generarRanking';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { consultaEntrega } from 'src/app/models/consutaEntrega';
import { datosEntrega } from 'src/app/models/datosEntrega';
@Component({
  selector: 'app-modificar-rankings',
  templateUrl: './modificar-rankings.component.html',
  styleUrls: ['./modificar-rankings.component.css', '../../home/home.component.css']
})
export class ModificarRankingsComponent implements OnInit {
  [x: string]: any;

  Ranking;
  RankingEntrega;
  lista: string[] = ["hola", "que", "tal", "estas"];
  Ranking_modificarArray = new FormArray([]);
  nombre_ranking: string;
  nombreEquipo: string;
  puntuacion: number;
  id_Ranking;
  x: number = 0;
  casa: boolean = true;
  longitud;
  object;
  seleccionados: string[] = [];
  ArrayPracticas;
  ArrayNombrePracticas;
  model;
  idUser: string;
  FormEntregasControl: FormControl = new FormControl()
  crearEntregasControl: FormGroup;
  datosEntrega = new datosEntrega('','');
  selectControl: FormControl = new FormControl()
  PuntuacionPracticasmodificarArray = new FormArray([]);



  constructor(private AuthService: AuthService, private router: Router, private formBuilder: FormBuilder,) {
    this.Ranking = new consultaNombre(
      this.nombre_ranking,
      // ''
    );
    this.Ranking.nombre_ranking = this.router.url.split('/')[2];
  }

  ngOnInit(): void {



    console.log(this.Ranking);

    this.AuthService.datosRanking(this.Ranking).subscribe(
      datos => {
        datos.sort(function (a, b) {
          var textA = a.apellido.toUpperCase();
          var textB = b.apellido.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        this.Ranking = datos;
        this.object = datos;
        this.longitud = this.Ranking.length;
        this.nombreEquipo = this.Ranking[1]['nombreEquipo'];
        this.puntuacion = parseInt(this.Ranking[1]['puntuacion']);
        this.id_Ranking


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
              puntuacion: new FormControl(parseInt(this.Ranking[index]['puntuacion']), [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ])
            }));
        }

        this.AuthService.getEntregas(this.object[0][7]).subscribe(
          datos => {
            console.log(datos);
            this.ArrayPracticas = Object.values(datos);
            console.log(this.ArrayPracticas[0][3]);


          })

        this.AuthService.getEntregasNombre(this.object[0][7]).subscribe(
          datos => {
            console.log(datos);
            this.ArrayNombrePracticas = Object.values(datos);
            console.log(this.ArrayNombrePracticas[0][0]);
          })



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
    this.model = new generarRanking(this.object[0][7], this.object[0][0])
    this.AuthService.generarNuevoCodigoRanking(this.model).subscribe(
      (datos) => {
        console.log(datos)
        Swal.fire('El nuevo codigo es  ' + datos)
      })
  }


  test() {

    this.nombreEquipo = this.Ranking[1]['nombreEquipo'];
    console.log(this.Ranking);
    this.puntuacion = parseInt(this.Ranking[1]['puntuacion']);
    console.log(this.nombreEquipo);
    this.id_Ranking

  }

  crearEntregas(name) {


    this.crearEntregasControl = this.formBuilder.group({
      idRanking: [this.object[0][7], [Validators.minLength(2), Validators.maxLength(30), Validators.required]],
      nombreEntrega: [name, [Validators.minLength(2), Validators.maxLength(15), Validators.required]],
    });

    this.datosEntrega = new datosEntrega(this.object[0][7],name);
    console.log( this.datosEntrega);

    this.AuthService.crearEntregas(this.datosEntrega).subscribe(
      (datos) => {
        console.log(datos)
        Swal.fire('Datos creados')
      })


  }
  mySelectHandler($event){



    this.RankingEntrega = new consultaEntrega(
      this.router.url.split('/')[2],
            $event
      // ''
    );


    console.log(this.RankingEntrega)

    this.AuthService.datosEntrega(this.RankingEntrega).subscribe(
      datos => {
        console.log(datos)

        // datos.sort(function (a, b) {
        //   var textA = a.apellido.toUpperCase();
        //   var textB = b.apellido.toUpperCase();
        //   return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        // });

        this.Ranking = datos;
        this.object = datos;
        this.longitud = this.Ranking.length;
        this.nombreEquipo = this.Ranking[1]['nombreEquipo'];
        this.puntuacion = parseInt(this.Ranking[1]['puntuacion']);
        this.id_Ranking




        this.Ranking_modificarArray.clear();

        for (let index = 0; index < this.longitud; index++) {
          console.log("test");

          console.log( this.Ranking_modificarArray);



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
              puntuacion: new FormControl(parseInt(this.Ranking[index]['puntuacion']), [
                Validators.minLength(2),
                Validators.maxLength(15),
                Validators.required,
              ])
            }));
                  }
        this.AuthService.getEntregas(this.object[0][7]).subscribe(
          datos => {
            console.log(datos);
            this.ArrayPracticas = Object.values(datos);
            console.log(this.ArrayPracticas[0][3]);
          })

        this.AuthService.getEntregasNombre(this.object[0][7]).subscribe(
          datos => {
            console.log(datos);
            this.ArrayNombrePracticas = Object.values(datos);
            console.log(this.ArrayNombrePracticas[0][0]);
          })
      })}

}
