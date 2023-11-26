import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { pageRoutes } from './pages.routing';

import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { FullCalendarModule } from '@fullcalendar/angular';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { ClubsComponent } from './Components/clubs/clubs.component';
import { MembersComponent } from './Components/Membershandling/members/members.component';
import { ForumComponent } from './Components/forum/forum.component';

import { EventsComponent } from './Components/events/events.component';
import { ValidationComponent } from './Components/validation/validation.component';
import { MemberEditDialogComponent } from './Components/Membershandling/member-edit-dialog/member-edit-dialog.component';
import { MemberDeleteDialogComponent } from './Components/Membershandling/member-delete-dialog/member-delete-dialog.component';

import { DatePipe } from '@angular/common';
import { AdminFinanceComponent } from './Components/AdminFinance/adminFinance.component';
import { MeetingsComponent } from './Components/meetings/meetings.component';
@NgModule({
  declarations: [
    // ========== Pages ========== //
    DashboardPageComponent,

    // ========== Componenets ========== //
    ClubsComponent,

    // ========== Finance ========== //
    AdminFinanceComponent,
    
    // ========== Members ========== //
    MembersComponent,
    MemberEditDialogComponent,
    MemberDeleteDialogComponent,
    // ========== Meetings ========== //
    MeetingsComponent,
    // ================================ //
    EventsComponent,
    ValidationComponent,
    ForumComponent,
    // ================================ //
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FullCalendarModule,
    RouterModule.forChild(pageRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
  providers: [DatePipe],
})
export class PagesModule {}
