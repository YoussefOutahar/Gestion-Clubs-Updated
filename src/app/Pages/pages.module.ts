import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { pageRoutes } from './pages.routing';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    DashboardPageComponent,
  ],
  imports: [
    NgApexchartsModule,
    RouterModule.forChild(pageRoutes)
  ],
  exports: [],
})
export class PagesModule {}
