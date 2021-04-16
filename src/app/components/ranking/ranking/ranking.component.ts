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
  styleUrls: ['./ranking.component.css','../../home/home.component.css']
})
export class RankingComponent implements OnInit {

  nombre_ranking: string;
  Ranking;
  datosRanking: datosRanking;
  datosUser;
  idUsuario;
  RankingSimple: consultaNombre;


  constructor( private AuthService: AuthService,private router: Router) {
    this.Ranking = new consultaNombre(
      this.nombre_ranking,
      // ''
    );
    this.Ranking.nombre_ranking=this.router.url.split('/')[2];

    this.idUsuario=localStorage.getItem('idUser')
      console.log(this.idUsuario);

   }

  myParam: string;

  ngOnInit(): void {



    this.AuthService.datosRankingSimple(this.Ranking).subscribe((datos) => {

      this.RankingSimple = datos;


    });

console.log(this.Ranking);

    this.AuthService.datosRanking(this.Ranking) .subscribe (
      datos => {
        if(datos[0]===null){
          datos=null;

        }
        console.log(datos);
        this.datosUser=datos;

      })






  }



}
