import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { DashboardService } from "../../../../DataBase/Services/dashboard.service";
import { ClubsService } from "../../../../DataBase/Services/clubs.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-clubDashboard-page',
  templateUrl: './clubDashboard.component.html',
})

export class clubDashboardComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public salesOverviewChart: any;
  public event: any; // Add this property to store the upcoming event

  constructor(private dashboardService: DashboardService, private clubsService: ClubsService, private router: Router, // Inject Router
  ) { }

  async ngOnInit() {
    const clubsWithEventCounts = await this.dashboardService.getClubsWithEventCounts();

    const chartData = clubsWithEventCounts.map(club => ({
      x: club.clubName,
      y: club.eventCount,
    }));

    this.salesOverviewChart = {
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
    };// Load upcoming event
    this.loadUpcomingEvent();
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
