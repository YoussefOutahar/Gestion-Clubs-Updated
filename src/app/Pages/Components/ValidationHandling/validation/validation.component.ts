import { Component, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { AuthService } from 'src/app/Auth/auth.service';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';
import { Club, Event, Document } from 'src/app/DataBase/Models/club';
import { MatDialog } from '@angular/material/dialog';
import { ValidationDetailstDialogComponent } from '../validation-showDetails-dialog/validation-showDetails.component';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent implements OnInit {
  currentUser: boolean | User | any;
  clubs: Club[] = [];
  events: Event[] = [];
  requests: Document[] = [];

  constructor(
    private clubsService: ClubsService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // Get the current user data
    this.currentUser = this.authService.currentUser.value;

    this.getPendingClubs();
    this.getPendingEvents();
    this.getPendingRequests();

    console.log(this.currentUser.role);
  }

  getPendingClubs() {
    this.clubsService.getPendingClubs().then((clubs) => {
      this.clubs = clubs;

      console.log(this.clubs);
    });
  }

  getPendingEvents() {
    this.clubsService.getPendingEvents().then((events) => {
      this.events = events;
      console.log(this.events);
    });
  }

  getPendingRequests() {
    this.clubsService.getPendingDocuments().then((requests) => {
      this.requests = requests;
      console.log(this.requests);
    });
  }

  validateClub(club: Club) {
    // Check the role of the current user
    if (this.currentUser && this.currentUser.role === 'admin') {
      this.clubsService.validateClubByDve(club);
    } else if (this.currentUser && this.currentUser.role === 'supervisor') {
      this.clubsService.validateClubByRef(club);
    }
  }

  cancelClub(club: Club) {
    this.clubsService.deleteClubById(club.id!).then(() => {
      // Optionally, update the local 'clubs' array after deletion
      this.clubs = this.clubs.filter((c) => c.id !== club.id);
      console.log('Club canceled:', club);
    });
  }

  showClubDetail(club: Club) {
    const dialogRef = this.dialog.open(ValidationDetailstDialogComponent, {
      width: '400px',
      data: club,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result after the dialog is closed, e.g., update user details
      if (result) {
        console.log('User details saved:', result);
        // Implement logic to update user details in the database
      }
    });
  }

  validateEvent(event: Event) {
    // Check the role of the current user
    if (this.currentUser && this.currentUser.role === 'admin') {
      this.clubsService.validateEventByDve(event);
    } else if (this.currentUser && this.currentUser.role === 'supervisor') {
      this.clubsService.validateEventByRef(event);
    }
  }

  cancelEvent(event: Event) {
    this.clubsService.deleteEventById(event.id!).then(() => {
      // Optionally, update the local 'events' array after deletion
      this.events = this.events.filter((e) => e.id !== event.id);
      console.log('Event canceled:', event);
    });
  }

  showEventDetails(event: Event) {
    console.log('Opening file with URL:', event.url);
    // window.open to open the file in a new tab
    window.open(event.url, '_blank');
  }

  validateRequest(request: Document) {
    // Check the role of the current user
    if (this.currentUser && this.currentUser.role === 'admin') {
      this.clubsService.validateRequestByDve(request);
    } else if (this.currentUser && this.currentUser.role === 'supervisor') {
      this.clubsService.validateRequestByRef(request);
    }
  }

  cancelRequest(request: Document) {
    this.clubsService.deleteEventById(request.id!).then(() => {
      // Optionally, update the local 'events' array after deletion
      this.requests = this.requests.filter((e) => e.id !== request.id);
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
