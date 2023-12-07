import { Component, OnInit } from "@angular/core";
import { Club, Event, Document } from "src/app/DataBase/Models/club";
import { ClubsService } from "src/app/DataBase/Services/clubs.service";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})

export class ValidationComponent implements OnInit {

  clubs: Club[] = [];
  events: Event[] = [];
  requests: Document[] = [];

  constructor(
    private clubsService: ClubsService
  ) { }

  ngOnInit() {
    this.getPendingClubs();
    this.getPendingEvents();
    this.getPendingRequests();
  }

  getPendingClubs() {
    this.clubsService.getPendingClubs().then(clubs => {
      this.clubs = clubs;

      console.log(this.clubs);
    });
  }

  getPendingEvents() {
    this.clubsService.getPendingEvents().then(events => {
      this.events = events;
      console.log(this.events);
    });
  }

  getPendingRequests() {
    this.clubsService.getPendingDocuments().then(requests => {
      this.requests = requests;
      console.log(this.requests);
    });
  }

  validateClub(club: Club) {
    this.clubsService.validateClubByDve(club).then((updatedClubs) => {
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
  }

  validateEvent(event: Event) {
    this.clubsService.validateEventByDve(event).then((updatedEvent) => {
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
    console.log('Opening file with URL:', event.url);
    // window.open to open the file in a new tab
    window.open(event.url, '_blank');
  }

  validateRequest(request: Document) {
    this.clubsService.validateRequestByDve(request).then((updatedRequest) => {
      // Optionally, update the local 'clubs' array with the updated data
      this.requests = updatedRequest;
      console.log('Request validated:', request);
    });
  }

  cancelRequest(request: Document) {
    this.clubsService.deleteEventById(request.id).then(() => {
      // Optionally, update the local 'events' array after deletion
      this.requests = this.requests.filter(e => e.id !== request.id);
      console.log('Request canceled:', request);
    });
  }

  showRequestDetails(request: Document) {
    if (request.path) {
      console.log('Opening file with path:', request.path);
      // window.open to open the file in a new tab
      window.open(request.path, '_blank');
    }
  }

}