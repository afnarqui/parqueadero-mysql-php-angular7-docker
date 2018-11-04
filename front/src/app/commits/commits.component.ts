import { Component, OnInit } from '@angular/core';
import { CommitsService } from '../services/commits/commits.service'

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {
  datosCommit:any[] = []
  datosCommitReal:any[] = []
  constructor(public servicioCommits:CommitsService) { }

  ngOnInit() {
    this.buscarValores()
  }
  buscarValores(){
    let data = this.servicioCommits.buscar()
    this.datosCommit = data[0]
    this.datosCommitReal = data[1]
  }
}
