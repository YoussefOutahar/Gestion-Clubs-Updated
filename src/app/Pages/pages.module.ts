import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { pageRoutes } from './pages.routing';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { ClubsComponent } from './Components/clubs/clubs.component';
import { MembersComponent } from './Components/members/members.component';
import { ForumComponent } from './Components/forum/forum.component';

import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../material.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule } from '@angular/forms';
import { EventsComponent } from './Components/events/events.component';
import { ValidationComponent } from './Components/validation/validation.component';
@NgModule({
  declarations: [
    DashboardPageComponent,

    // ========== Componenets ========== //
    ClubsComponent,
    MembersComponent,
    EventsComponent,
    ValidationComponent,
    ForumComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCommonModule,
    NgApexchartsModule,
    FormsModule,
    RouterModule.forChild(pageRoutes),
    
  ],
  exports: [],
})
export class PagesModule {}
