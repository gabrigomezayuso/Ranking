import { Component, OnInit } from '@angular/core';
import { consultarRankings } from 'src/app/models/consultarRankings';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mis-rankings',
  templateUrl: './mis-rankings.component.html',
  styleUrls: ['./mis-rankings.component.css',  '../../home/home.component.css']
})
export class MisRankingsComponent implements OnInit {
  idUser: string;

  constructor(
    private AuthService: AuthService
    ) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser')
    const user = new consultarRankings(this.idUser)
    this.AuthService.consultarRankings(user)
    .subscribe (
      datos => {
        console.log(datos)
      })

  }

}
