import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../../Auth/auth.service';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';


@Component({
  selector: 'app-clubFinance',
  templateUrl: './clubFinance.component.html',
  styleUrls: ['./clubFinance.component.css'],
})
export class ClubFinanceComponent implements OnInit {
  currentUser: boolean | User | any;

  totalSuppBudget: number = 0;
  Budget: number = 0;
  totalDonations: number = 0;
  totalCost: number = 0;
  rest: number = 0;
  events: any[] = [];
  cardList: any[] = [];

  constructor(
    private clubsService: ClubsService,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
    private profilesService: ProfilesService,
  ) {}

  ngOnInit() {
     // Get the current user data
     const user = this.authService.currentUser.value;
     this.profilesService.getProfileById(user.id)
       .then((profile) => {
         this.currentUser = profile[0]; // Assuming getProfileById returns an array
         console.log('user : ', this.currentUser);

         this.fetchData();

       })
       .catch((error) => {
         console.error('Error fetching user profile:', error);
       });
  }

  async fetchData() {
    //fetch the events of the current user's club
    this.clubsService.getClubEvents(this.currentUser.id_club).then((events) => {
      this.events = events;
      console.log(this.events);
    });
    this.Budget = await this.clubsService.getClubBudget(1);
    this.rest = await this.clubsService.getRestBudgetByClub(1);

    this.totalDonations = this.events.reduce(
      (total, event) => total + (event.earnings || 0),
      0
    );
    this.totalCost = this.events.reduce(
      (total, event) => total + (event.cost || 0),
      0
    );
    this.totalSuppBudget = this.events.reduce(
      (total, event) => total + (event.supp_budget || 0),
      0
    );

    this.cardList = [
      { name: 'Budget', amount: `${this.Budget} MAD`, icon: 'attach_money' },
      {
        name: 'Total Supplementary Budget',
        amount: `${this.totalSuppBudget} MAD`,
        icon: 'attach_money',
      },
      {
        name: 'Total Donations',
        amount: `${this.totalDonations} MAD`,
        icon: 'attach_money',
      },
      { name: 'Rest', amount: `${this.rest} MAD`, icon: 'attach_money' },
    ];
  }

  navigateToASuppBudget() {
    // Use the Angular Router to navigate to the 'assignBudget' route
    this.router.navigate(['/dashboard/suppBudget']);
  }

  navigateToAddCharget() {
    // Use the Angular Router to navigate to the 'assignBudget' route
    this.router.navigate(['/dashboard/addCharge']);
  }

  formatDate(date: string): string {
    // Parse the input string into a JavaScript Date object
    const parsedDate = new Date(date);

    // Check if the parsedDate is a valid date
    if (!isNaN(parsedDate.getTime())) {
      // Format the date using the DatePipe
      return this.datePipe.transform(parsedDate, 'dd/MM/yyyy HH:mm') || '';
    } else {
      // Return an empty string or handle the error as needed
      return '';
    }
  }

  openFile(url: string): void {
    console.log('Opening file with URL:', url);
    // window.open to open the file in a new tab
    window.open(url, '_blank');
  }
}
