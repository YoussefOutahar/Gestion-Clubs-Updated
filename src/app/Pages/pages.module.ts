import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { pageRoutes } from './pages.routing';
import { HomePageComponent } from './home-page/home-page.component';
import { OfficePageComponent } from './office-page/office-page.component';
import { BudgetPageComponent } from './budget-page/budget-page.component';
import { GanttPageComponent } from './gantt-page/gantt-page.component';
import { ResourcesPageComponent } from './resources-page/resources-page.component';
import { ActivityNetworkPageComponent } from './activity-network-page/activity-network-page.component';
import { ReportsPageComponent } from './reports-page/reports-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { RiskRegisterPageComponent } from './risk-register-page/risk-register-page.component';
import { RaciMatrixPageComponent } from './raci-matrix-page/raci-matrix-page.component';


import { NgApexchartsModule } from "ng-apexcharts";
@NgModule({
  declarations: [
    HomePageComponent,
    OfficePageComponent,
    BudgetPageComponent,
    GanttPageComponent,
    ResourcesPageComponent,
    ActivityNetworkPageComponent,
    ReportsPageComponent,
    CalendarPageComponent,
    RiskRegisterPageComponent,
    RaciMatrixPageComponent,
  ],
  imports: [
    NgApexchartsModule,
    RouterModule.forChild(pageRoutes)
  ],
  exports: [],
})
export class PagesModule {}
