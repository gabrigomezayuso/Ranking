import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { consultaNombre } from 'src/app/models/consultaNombre';
import { ModificarRanking } from 'src/app/models/ModificarRanking';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-modificar-rankings',
  templateUrl: './modificar-rankings.component.html',
  styleUrls: ['./modificar-rankings.component.css']
})
export class ModificarRankingsComponent implements OnInit {

  Ranking;
  Ranking_modificar:FormGroup
  nombre_ranking: string;
  nombreEquipo: string;
  puntuacion: number;
  constructor(private AuthService: AuthService,private router: Router) {

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


    this.Ranking = new consultaNombre(
      this.nombre_ranking,
      // ''
    );
    this.Ranking.nombre_ranking=this.router.url.split('/')[2];
  }
  datos;
  ngOnInit(): void {

    this.AuthService.datosRanking(this.Ranking) .subscribe (
      datos => {
        console.log(datos);
        console.log(datos[0]['nombre']);

        this.datos=datos;

      })
  }

  guardarDatos(Ranking_modificar){
  console.log(Ranking_modificar);


  }

}
