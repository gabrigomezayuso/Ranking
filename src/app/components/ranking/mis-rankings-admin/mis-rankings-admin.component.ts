import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { consultarRankings } from 'src/app/models/consultarRankings';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mis-rankings-admin',
  templateUrl: './mis-rankings-admin.component.html',
  styleUrls: ['./mis-rankings-admin.component.css']
})
export class MisRankingsAdminComponent implements OnInit {
  idUser: string;
  user;
  ranking;
  datosRanking;

  constructor(
    private AuthService: AuthService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser')
    this.user = new consultarRankings(this.idUser)
    console.log(this.user)
    this.AuthService.consultarRankings(this.user)
    .subscribe (
      datos => {
        console.log(datos)
        this.ranking = Object.values(datos)
        console.log(this.ranking);
      })
  }

  onClick(){
  //this._router.navigate(['../../ranking', this.ranking[0]]);







  }

}
