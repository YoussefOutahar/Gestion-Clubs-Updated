import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { DashboardService } from "../../../../DataBase/Services/dashboard.service";
import { ClubsService } from "../../../../DataBase/Services/clubs.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-adminDashboard-page',
  templateUrl: './adminDashboard.component.html',
})

export class AdminDashboardComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public eventNumberChart!: any;
  public activeClubsChart: any;
  public event: any; // Add this property to store the upcoming event

  constructor(private dashboardService: DashboardService, private clubsService: ClubsService, private router: Router, // Inject Router
  ) { }

  async ngOnInit() {
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

    const eventCountByYear = await this.dashboardService.getEventCountByYear();
    console.log("eventCountByYear : ",eventCountByYear);

    this.eventNumberChart = {
      series: [
        {
          name: 'Event Count',
          data: eventCountByYear.map(item => item.eventCount),
        },
      ],
      chart: {
        type: 'area',
        height: 390,
      },
      xaxis: {
        type: 'category',
        categories: eventCountByYear.map(item => item.year),
      },
      yaxis: {
        title: {
          text: 'Event Count',
        },
      },

    };
  };

  async loadUpcomingEvent() {
    this.event = await this.dashboardService.getUpcomingEvent();
  }



  addNewEvent() {
    // Redirect to addEventRequest component
    this.router.navigate(['/dashboard/event/create']);
  }
}

