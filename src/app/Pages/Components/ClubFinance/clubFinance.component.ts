import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

@Component({
    selector: 'app-clubFinance',
    templateUrl: './clubFinance.component.html',
    styleUrls: ['./clubFinance.component.css']
})
export class ClubFinanceComponent implements OnInit {

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
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.fetchData();
    }

    async fetchData() {
        this.clubsService.getClubEvents(1).then(events => { this.events = events; console.log(this.events); });
        this.Budget = await this.clubsService.getClubBudget(1);
        this.rest = await this.clubsService.getRestBudgetByClub(1);

        this.totalDonations = this.events.reduce((total, event) => total + (event.earnings || 0), 0);
        this.totalCost = this.events.reduce((total, event) => total + (event.cost || 0), 0);
        this.totalSuppBudget = this.events.reduce((total, event) => total + (event.supp_budget || 0), 0);


        this.cardList = [
            { name: "Budget", amount: `${this.Budget} DH`, icon: "attach_money" },
            { name: "Total Supplementary Budget", amount: `${this.totalSuppBudget} DH`, icon: "attach_money" },
            { name: "Total Donations", amount: `${this.totalDonations} DH`, icon: "attach_money" },
            { name: "Rest", amount: `${this.rest} DH`, icon: "attach_money" },
        ];
    }


    navigateToASuppBudget() {
        // Use the Angular Router to navigate to the 'assignBudget' route
        this.router.navigate(['/dashboard/assignBudget']);
    }

    navigateToAddCharget() {
        // Use the Angular Router to navigate to the 'assignBudget' route
        this.router.navigate(['/dashboard/assignBudget']);
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
    

}