import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { pageRoutes } from './pages.routing';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { NgApexchartsModule } from "ng-apexcharts";
import { ClubsComponent } from './Components/clubs/clubs.component';
import { MembersComponent } from './Components/members/members.component';
import { MaterialModule } from '../material.module';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    DashboardPageComponent,

    // ========== Componenets ========== //
    ClubsComponent,
    MembersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCommonModule,
    NgApexchartsModule,
    RouterModule.forChild(pageRoutes)
  ],
  exports: [],
})
export class PagesModule {}
