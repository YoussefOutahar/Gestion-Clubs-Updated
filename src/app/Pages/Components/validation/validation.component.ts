import { Component, OnInit } from "@angular/core";
import { Club , Event } from "src/app/DataBase/Models/club";
import { ClubsService } from "src/app/DataBase/Services/clubs.service";

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.css']
})

export class ValidationComponent implements OnInit{

    clubs: Club[] = [];
    events: Event[] = [];

  constructor(
    private clubsService: ClubsService
  ) { }
  
  ngOnInit() {
    this.getPendingClubs();
    this.getPendingEvents();
  }

  getPendingClubs() {
    this.clubsService.getClubs().then(clubs => {
      this.clubs = clubs;
      
    console.log(this.clubs);
    });
    console.log(this.clubs);
  }

  getPendingEvents() {
    this.clubsService.getEvents().then(events => {
      this.events = events;
      
    console.log(this.events);
    });
    console.log(this.events);
  }

  validateClub(club: Club) {
    // Implement logic to validate the club
  }

  cancelClub(club: Club) {
    // Implement logic to cancel the club
  }

  validateEvent(event: Event) {
    // Implement logic to validate the event
  }

  cancelEvent(event: Event) {
    // Implement logic to cancel the event
  }

}