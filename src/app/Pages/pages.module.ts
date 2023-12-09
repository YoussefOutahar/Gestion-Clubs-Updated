import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { pageRoutes } from './pages.routing';

import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { FullCalendarModule } from '@fullcalendar/angular';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { ClubsComponent } from './Components/clubs/clubs.component';
import { MembersComponent } from './Components/Membershandling/members/members.component';
import { ForumComponent } from './Components/forum/forum.component';

import { EventsComponent } from './Components/events/events.component';
import { ValidationComponent } from './Components/ValidationHandling/validation/validation.component';
import { MemberEditDialogComponent } from './Components/Membershandling/member-edit-dialog/member-edit-dialog.component';
import { MemberDeleteDialogComponent } from './Components/Membershandling/member-delete-dialog/member-delete-dialog.component';

import { DatePipe } from '@angular/common';
import { AdminFinanceComponent } from './Components/AdminFinance/adminFinance.component';
import { AssignBudgetComponent } from './Components/Finance/assignBudget/assignBudget.component';
import { ClubFinanceComponent } from './Components/ClubFinance/clubFinance.component';
import { MeetingsComponent } from './Components/meetings/meetings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddChargeComponent } from './Components/Finance/addCharge/addCharge.component';
import { SuppBudgetComponent } from './Components/Finance/suppBudget/suppBudget.component';
import { ClubCreationComponent } from './Components/clubCreation/clubCreation.component';
import { ValidationDetailstDialogComponent } from './Components/ValidationHandling/validation-showDetails-dialog/validation-showDetails.component';
import { AddMeetingRequestComponent } from './Components/addMeetingRequest/addMeetingRequest.component';
import { AddEventRequestComponent } from './Components/addEventRequest/addEventRequest.component';
@NgModule({
  declarations: [
    // ========== Pages ========== //
    DashboardPageComponent,

    // ========== Componenets ========== //
    ClubsComponent,
    ClubCreationComponent,

    // ========== Finance ========== //
    AdminFinanceComponent,
    AssignBudgetComponent,
    ClubFinanceComponent,
    AddChargeComponent,
    SuppBudgetComponent,

    // ========== Members ========== //
    MembersComponent,
    MemberEditDialogComponent,
    MemberDeleteDialogComponent,
    // ========== Meetings ========== //
    MeetingsComponent,
    // =========== Validation ============= //
    ValidationComponent,
    ValidationDetailstDialogComponent,

    AddMeetingRequestComponent,
    // ================================ //
    EventsComponent,
    AddEventRequestComponent,

    // ================================ //
    ForumComponent,
    // ================================ //
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
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
