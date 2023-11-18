import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/DataBase/Models/club';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    events: Event[] = [];

    constructor(
        private clubsService: ClubsService
      ) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.clubsService.getEvents().then(events => {
        this.events = events;
        
      console.log(this.events);
      });
      console.log(this.events);
  }

  showDetails(club: Event) {
    console.log(club);
  }

  deleteClub(club: Event) {
  }

}
