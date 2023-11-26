import { Component, OnInit } from '@angular/core';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

@Component({
    selector: 'app-adminFinance',
    templateUrl: './adminFinance.component.html',
    styleUrls: ['./adminFinance.component.css']
})
export class AdminFinanceComponent implements OnInit {

    totalSuppBudget: number = 0;
    totalBudget: number = 0;
    clubs: any[] = [];
    cardList: any[] = [];

    constructor(
        private clubsService: ClubsService,
    ) { }

    ngOnInit() {
        this.fetchData();
    }

    async fetchData() {
        await this.fetchClubData();
        this.totalBudget = await this.clubsService.getTotalBudgetByYear(new Date().getFullYear());
        this.totalSuppBudget = await this.clubsService.getTotalSupplementaryBudget();

        this.cardList = [
            { name: "Total Budget", amount: `${this.totalBudget} DH`, icon: "attach_money" },
            { name: "Total Supplementary Budget", amount: `${this.totalSuppBudget} DH`, icon: "attach_money" },
        ];
    }

    async fetchClubData() {
        try {
            const allClubs = await this.clubsService.getClubs();
            // Iterate through each club to calculate total_supp_budget and total_earnings
            for (const club of allClubs) {
                const total_supp_budget = await this.clubsService.getTotalSupplementaryBudgetByClub(club.id);
                const total_earnings = await this.clubsService.getTotalSuppEarningsByClub(club.id);

                // Use getBudgetByClub to get budget and rest values
                const budgets = await this.clubsService.getBudgetByClub(club.id);
                const budget = budgets[0];


                // Check if budgets array is not empty
                if (budgets && budgets.length > 0) {
                    const budget = budgets[0];

                    // Push club data to the clubs array
                    this.clubs.push({
                        id: club.id,
                        name: club.name,
                        budget: budget.budget,
                        rest: budget.rest,
                        supp_budget: total_supp_budget,
                        earnings: total_earnings
                    });
                } else {
                    // Handle the case where no budgets are found for the club
                    console.warn(`No budgets found for club ID: ${club.id}`);
                }

            }
        } catch (error) {
            console.error('Error fetching club data', error);
        }
    }

}