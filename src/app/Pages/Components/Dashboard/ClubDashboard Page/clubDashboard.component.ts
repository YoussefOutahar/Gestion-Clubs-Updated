import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { DashboardService } from "../../../../DataBase/Services/dashboard.service";
import { ClubsService } from "../../../../DataBase/Services/clubs.service";
import { Router } from "@angular/router";
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../../Auth/auth.service';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';

@Component({
  selector: 'app-clubDashboard-page',
  templateUrl: './clubDashboard.component.html',
})

export class clubDashboardComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  currentUser: boolean | User | any;
  public eventNumberChart!: any;
  public activeClubsChart: any;
  public BudgetsChart: any;
  public event: any; // Add this property to store the upcoming event

  constructor(
    private dashboardService: DashboardService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private profilesService: ProfilesService,
  ) { }

  async ngOnInit() {
    // Get the current user data
    const user = this.authService.currentUser.value;
    this.profilesService.getProfileById(user.id)
      .then((profile) => {
        this.currentUser = profile[0]; // Assuming getProfileById returns an array
        console.log('user : ', this.currentUser);

        this.loadData();
        this.changeDetector.detectChanges();
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }

  async loadData() {
    const clubsWithEventCounts = await this.dashboardService.getClubsWithEventCounts();

    const chartData = clubsWithEventCounts.map(club => ({
      x: club.clubName,
      y: club.eventCount,
    }));

    this.activeClubsChart = {
      series: [
        {
          name: 'Event Count',
          data: chartData,
        },
      ],
      chart: {
        type: 'bar',
        height: 390,
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] },
      },
      xaxis: {
        type: 'category',
        categories: chartData.map(item => item.x),
      },
      yaxis: {
        title: {
          text: 'Event Count',
        },
      },
      tooltip: { theme: 'light' },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };
    // Load upcoming event
    this.loadUpcomingEvent();

    const eventCountByYear = await this.dashboardService.getEventCountByYearByClub(this.currentUser.id_club);
    console.log("eventCountByYear : ", eventCountByYear);

    this.eventNumberChart = {
      series: [
        {
          name: 'Event Count',
          data: eventCountByYear.map(item => item.eventCount),
        },
      ],
      chart: {
        type: 'area',
        height: 300,
      },
      labels: eventCountByYear.map(item => item.year),
      xaxis: {
        type: 'category',
      },
      tooltip: { theme: 'light' },


    };


    const clubBudgetsData = await this.dashboardService.getClubBudgetsByYears(this.currentUser.id_club);
    const currentYearBudget = clubBudgetsData[clubBudgetsData.length - 1].budget;
    const lastYearBudget = clubBudgetsData[clubBudgetsData.length - 2].budget;
    const percentageDifference = ((currentYearBudget - lastYearBudget) / lastYearBudget) * 100;
    console.log("clubBudgetsData : ", clubBudgetsData);

    this.BudgetsChart = {
      series: [
        {
          name: 'Budget',
          data: clubBudgetsData.map(item => item.budget),
        },
      ],
      chart: {
        type: 'area',
        height: 100,
        sparkline: {
          enabled: true,
        },
      },
      xaxis: {
        type: 'category',
        categories: clubBudgetsData.map(item => item.year),
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
      fill: {
        colors: ['#E8F7FF'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
    };
    // Update the displayed values
    const budgetElement = document.querySelector('.mat-headline-5');
    if (budgetElement) {
      budgetElement.innerHTML = `${currentYearBudget.toFixed(2)} MAD`;
    }

    const percentageElement = document.querySelector('.m-l-12');
    if (percentageElement) {
      percentageElement.innerHTML = `${percentageDifference.toFixed(2)}%`;

      // Update arrow icon based on the sign of percentageDifference
      const arrowButton = document.querySelector('.bg-light-error.text-error.shadow-none.icon-27');

      if (arrowButton) {
        // Change the button class based on the percentageDifference
        if (percentageDifference > 0) {
          arrowButton.classList.remove('bg-light-error', 'text-error');
          arrowButton.classList.add('bg-light-success', 'text-success');
          arrowButton.innerHTML = '<i-tabler name="arrow-up-right" class="icon-20"></i-tabler>';
        } else {
          // If percentageDifference is not positive, keep the original class
          arrowButton.classList.remove('bg-light-success', 'text-success');
          arrowButton.classList.add('bg-light-error', 'text-error');
          arrowButton.innerHTML = '<i-tabler name="arrow-down-right" class="icon-20"></i-tabler>';
        }
      }
    }
  }

  async loadUpcomingEvent() {
    this.event = await this.dashboardService.getUpcomingEvent();
  }



  addNewEvent() {
    // Redirect to addEventRequest component
    this.router.navigate(['/dashboard/event/create']);
  }

  addNewMeeting() {
    // Redirect to addMeetingRequest component
    this.router.navigate(['/dashboard/meeting/create']);
  }


}
