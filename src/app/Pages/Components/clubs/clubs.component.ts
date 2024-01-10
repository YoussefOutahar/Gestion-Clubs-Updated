// clubs.component.ts
import { Component, OnInit } from '@angular/core';
import { Club } from '../../../DataBase/Models/club';
import { ClubsService } from '../../../DataBase/Services/clubs.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ClubsComponent implements OnInit {
  clubs: Club[] = [];
  showDetails: boolean = false;
  activeClub: Club | null = null;
  category: string = '';
  clubToDelete: Club | null = null;

  constructor(
    private clubsService: ClubsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getActiveClubs();
  }

  getActiveClubs() {
    this.clubsService.getActiveClubs().then((clubs) => {
      this.clubs = clubs;
      console.log(this.clubs);
    });
  }

  handleLearnMore(index: number) {
    this.activeClub = this.clubs[index];
    this.clubsService.getClubCategory(this.clubs[index]).then((category) => {
      this.category = category.category_name;
      this.showDetails = true;
    });
  }

  handleBackToTop() {
    this.showDetails = false;
    this.activeClub = null;
  }

  handleDelete(event: Event, club: Club | null): void {
    if (club) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this Club?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        acceptIcon: 'none',
        rejectIcon: 'none',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Club deleted',
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
          });
        },
      });
    }
  }

  handleEdit(event: Event, club: Club | null) {
    if (club) {
    }
  }
}
