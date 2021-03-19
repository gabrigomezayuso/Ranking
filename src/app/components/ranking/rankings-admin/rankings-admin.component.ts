import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { consultaNombre } from 'src/app/models/consultaNombre';
import { datosRanking } from 'src/app/models/datosRanking';
import { consultarRankings } from 'src/app/models/consultarRankings';

@Component({
  selector: 'app-rankings-admin',
  templateUrl: './rankings-admin.component.html',
  styleUrls: ['./rankings-admin.component.css',  '../../home/home.component.css']
})
export class RankingsAdminComponent implements OnInit {
  idUser: string;
  user;
  ranking;
  datosRanking;
  isChecked

  constructor(
    private AuthService: AuthService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser')
    this.user = new consultarRankings(this.idUser)
    console.log(this.user)
    this.AuthService.consultarRankingsAdmin(this.user)
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

  changed(evt) {
    this.isChecked = evt.target.checked;
    alert(evt.target.checked)
    alert()

  }

}
