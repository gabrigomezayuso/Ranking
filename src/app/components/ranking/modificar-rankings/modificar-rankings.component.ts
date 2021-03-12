import { Component, OnInit } from '@angular/core';
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
  Ranking_modificar;
  Ranking;
  nombre_ranking: string;
  nombreEquipo: string;
  puntuacion: number;
  constructor(private AuthService: AuthService,private router: Router) {

    this.Ranking_modificar = new ModificarRanking(
      this.nombreEquipo,
      this.puntuacion,
    );

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

}
