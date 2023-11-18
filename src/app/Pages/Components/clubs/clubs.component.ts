import { Component, OnInit } from '@angular/core';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  constructor(
    private clubsService: ClubsService
  ) { }

  ngOnInit() {
  }

}
