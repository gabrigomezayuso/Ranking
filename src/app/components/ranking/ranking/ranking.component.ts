import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { consultaNombre } from 'src/app/models/consultaNombre';
import { datosRanking } from 'src/app/models/datosRanking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  nombre_ranking: string;
  Ranking;
  datosRanking: datosRanking;
  datos;


  constructor( private AuthService: AuthService,private router: Router) {
    this.Ranking = new consultaNombre(
      this.nombre_ranking,
      // ''
    );
    console.log(this.router.url);
    this.Ranking.nombre_ranking=this.router.url.split('/')[2];
    console.log(this.Ranking);
   }

  myParam: string;

  ngOnInit(): void {
    this.AuthService.datosRanking(this.Ranking) .subscribe (
      datos => {
        console.log(datos);
        console.log(datos[0]['nombre']);

        this.datos=datos;

      })


  }






}
