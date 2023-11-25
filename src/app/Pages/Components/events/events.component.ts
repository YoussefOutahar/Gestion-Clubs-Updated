import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Event } from 'src/app/DataBase/Models/club';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    events: Event[] = [];

    calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin]
    };

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
