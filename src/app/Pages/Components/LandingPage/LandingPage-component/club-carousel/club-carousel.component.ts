import { Component, OnInit } from '@angular/core';
import { Club } from '../../../../../DataBase/Models/club';
import { ClubsService } from '../../../../../DataBase/Services/clubs.service';
import { MatDialog } from '@angular/material/dialog';
import { JoinFormComponent } from '../../../joinClub/joinClub.component';

@Component({
  selector: 'app-carousel-clubs',
  templateUrl: './club-carousel.component.html',
  styleUrls: ['./club-carousel.component.css'],
})
export class CarouselClubsComponent implements OnInit {
  clubs: Club[] = [];

  constructor(private clubsService: ClubsService, public dialog: MatDialog  ) {}

  ngOnInit() {
    this.getActiveClubs();
  }

  getActiveClubs() {
    this.clubsService.getActiveClubs().then((clubs) => {
      this.clubs = clubs;
      console.log(this.clubs);
    });
  }

  openJoinDialog(id: number): void {
    if (id !== undefined && id !== null) {
      const dialogRef = this.dialog.open(JoinFormComponent, {
        width: '450px',
        data: id,
        
      });
      
      dialogRef.afterClosed().subscribe((result) => {
        // Handle the result after the dialog is closed, e.g., update user details
        if (result) {
          console.log('User details saved:', result);
          // Implement logic to update user details in the database
        }
      });
    } else {
      console.error('Invalid club ID:', id);
    }
  }
}
