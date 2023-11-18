import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/DataBase/Models/club';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  clubs: Club[] = [];

  constructor(
    private clubsService: ClubsService
  ) { }

  ngOnInit() {
    this.getClubs();
  }

  getClubs() {
    this.clubsService.getClubs().then(clubs => {
      this.clubs = clubs;
      
    console.log(this.clubs);
    });
    console.log(this.clubs);
  }

  showDetails(club: Club) {
    console.log(club);
  }

  deleteClub(club: Club) {
  }

}
