import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { consultaNombre } from 'src/app/models/consultaNombre';
import { ModificarRanking } from 'src/app/models/ModificarRanking';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-modificar-rankings',
  templateUrl: './modificar-rankings.component.html',
  styleUrls: ['./modificar-rankings.component.css',  '../../home/home.component.css']
})
export class ModificarRankingsComponent implements OnInit {

  Ranking;
  Ranking_modificar:FormGroup;
  nombre_ranking: string;
  nombreEquipo: string;
  puntuacion: number;
  x: number =0;
  casa: boolean=true;
  constructor(private AuthService: AuthService,private router: Router) {




    this.Ranking = new consultaNombre(
      this.nombre_ranking,
      // ''
    );
    this.Ranking.nombre_ranking=this.router.url.split('/')[2];
  }
  object;
  ngOnInit(): void {



    this.AuthService.datosRanking(this.Ranking) .subscribe (
      datos => {

        this.Ranking=datos;
        this.object=datos;
        this.nombreEquipo=this.Ranking[0]['nombreEquipo'];
        console.log(this.Ranking);
        this.puntuacion=parseInt(this.Ranking[0]['puntuacion']);
        console.log(this.nombreEquipo);


    this.Ranking_modificar = new FormGroup(
      {
        nombreEquipo: new FormControl(this.nombreEquipo, [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ]),
        puntuacion: new FormControl(this.puntuacion, [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ])
      });
      })



  }

  guardarDatos(Ranking_modificar){
  console.log(Ranking_modificar);


  }

  test(){

    this.nombreEquipo=this.Ranking[1]['nombreEquipo'];
    console.log(this.Ranking);
    this.puntuacion=parseInt(this.Ranking[1]['puntuacion']);
    console.log(this.nombreEquipo);


this.Ranking_modificar = new FormGroup(
  {
    nombreEquipo: new FormControl(this.nombreEquipo, [
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.required,
    ]),
    puntuacion: new FormControl(this.puntuacion, [
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.required,
    ])
  });


  }

}
