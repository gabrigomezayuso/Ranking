import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { consultarRankings } from 'src/app/models/consultarRankings';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mis-rankings',
  templateUrl: './mis-rankings.component.html',
  styleUrls: ['./mis-rankings.component.css',  '../../home/home.component.css']
})
export class MisRankingsComponent implements OnInit {
  idUser: string;
  user;
  ranking;

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
      })
  }

  onClick(){
    this._router.navigate(['../../../ranking',{p1: '5' }]);


  }

}
