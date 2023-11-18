import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { pageRoutes } from './pages.routing';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { NgApexchartsModule } from "ng-apexcharts";
import { ClubsComponent } from './Components/clubs/clubs.component';
import { MembersComponent } from './Components/members/members.component';
@NgModule({
  declarations: [
    DashboardPageComponent,

    // ========== Componenets ========== //
    ClubsComponent,
    MembersComponent
  ],
  imports: [
    NgApexchartsModule,
    RouterModule.forChild(pageRoutes)
  ],
  exports: [],
})
export class PagesModule {}
