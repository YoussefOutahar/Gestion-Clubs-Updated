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
    this.clubsService.getPendingClubs().then(clubs => {
      this.clubs = clubs;
      
    console.log(this.clubs);
    });
    console.log(this.clubs);
  }

  getPendingEvents() {
    this.clubsService.getPendingEvents().then(events => {
      this.events = events;
      
    console.log(this.events);
    });
    console.log(this.events);
  }

  validateClub(club: Club) {
    this.clubsService.validateClub(club).then((updatedClubs) => {
      // Optionally, update the local 'clubs' array with the updated data
      this.clubs = updatedClubs;
      console.log('Club validated:', club);
    });
  }

  cancelClub(club: Club) {
    this.clubsService.deleteClubById(club.id).then(() => {
        // Optionally, update the local 'clubs' array after deletion
        this.clubs = this.clubs.filter(c => c.id !== club.id);
        console.log('Club canceled:', club);
    });
}

  showClubDetail(club: Club) {
    // Implement logic to cancel the event
  }

  validateEvent(event: Event) {
    this.clubsService.validateEvent(event).then((updatedEvent) => {
      // Optionally, update the local 'clubs' array with the updated data
      this.events = updatedEvent;
      console.log('Event validated:', event);
    });
  }

  cancelEvent(event: Event) {
    this.clubsService.deleteEventById(event.id).then(() => {
        // Optionally, update the local 'events' array after deletion
        this.events = this.events.filter(e => e.id !== event.id);
        console.log('Event canceled:', event);
    });
}

  showEventDetails(event: Event) {
    // Implement logic to cancel the event
  }

}