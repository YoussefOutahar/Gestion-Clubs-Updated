// clubs.component.ts
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
  showDetails: boolean = false;
  activeClub: Club | null = null;
  category: string = '';
  clubToDelete: Club | null = null;
  openDeleteDialog: boolean = false;

  constructor(
    private clubsService: ClubsService
  ) { }

  ngOnInit() {
    this.getActiveClubs();
  }

  getActiveClubs() {
    this.clubsService.getActiveClubs().then(clubs => {
      this.clubs = clubs;
      console.log(this.clubs);
    });
  }

  handleLearnMore(index: number) {
    this.activeClub = this.clubs[index];
    this.clubsService.getClubCategory(this.clubs[index]).then(category => {
      this.category = category.name;
      this.showDetails = true;
    });
  }

  handleBackToTop() {
    this.showDetails = false;
    this.activeClub = null;
  }

  handleDelete(club: Club | null): void {
    if (club) {
      this.openDeleteDialog = true;
      this.clubToDelete = club;
    }
  }

  handleClose() {
    this.openDeleteDialog = false;
  }

  async handleConfirmDelete() {
    if (this.clubToDelete) {
      await this.clubsService.deleteClubById(this.clubToDelete.id);
      this.getActiveClubs();
    }

    this.openDeleteDialog = false;
    this.showDetails = false;
    this.activeClub = null;
  }

  // Other methods...

}
