import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { DashboardService } from "../../../DataBase/Services/dashboard.service";

@Component({
  selector: 'app-adminDashboard-page',
  templateUrl: './adminDashboard.component.html',
})

export class AdminDashboardComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public salesOverviewChart: any;
  public event: any; // Add this property to store the upcoming event

  constructor(private dashboardService: DashboardService) {}

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
    };
    // Load upcoming event
    this.loadUpcomingEvent();
  }

  async loadUpcomingEvent() {
    this.event = await this.dashboardService.getUpcomingEvent();
  }
}
