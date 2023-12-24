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
import { AdminFinanceComponent } from './Components/Finance/AdminFinance/adminFinance.component';
import { AssignBudgetComponent } from './Components/Finance/assignBudget/assignBudget.component';
import { ClubFinanceComponent } from './Components/Finance/ClubFinance/clubFinance.component';
import { MeetingsComponent } from './Components/meetings/meetings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AddChargeComponent } from './Components/Finance/addCharge/addCharge.component';
import { SuppBudgetComponent } from './Components/Finance/suppBudget/suppBudget.component';
import { ClubCreationComponent } from './Components/clubs/clubCreation/clubCreation.component';
import { ValidationDetailstDialogComponent } from './Components/ValidationHandling/validation-showDetails-dialog/validation-showDetails.component';
import { ImageSliderComponent } from './Components/LandingPage/LandingPage-component/image-slider/image-slider.component';
import { LandingPage } from './Components/LandingPage/landingPage.component';
import { CarouselClubsComponent } from './Components/LandingPage/LandingPage-component/club-carousel/club-carousel.component';
import { FooterComponent } from './Components/LandingPage/LandingPage-component/footer/footer.component';
import { AddMeetingRequestComponent } from './Components/meetings/addMeetingRequest/addMeetingRequest.component';
import { AddEventRequestComponent } from './Components/events/addEventRequest/addEventRequest.component';
import { PrimeNgModule } from '../primeNg.module';
import { EventDetailsComponent } from './Components/events/event-details-popup/event-details.component';
import { clubDashboardComponent } from './Components/Dashboard/ClubDashboard Page/clubDashboard.component';
import { AdminDashboardComponent } from './Components/Dashboard/AdminDashboard/adminDashboard.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { JoinFormComponent } from './Components/clubs/joinClub/joinClub.component';
@NgModule({
  declarations: [
    // ========== Dashboards ========== //
    DashboardPageComponent,
    clubDashboardComponent,
    AdminDashboardComponent,
    // ========== Clubs ========== //
    ClubsComponent,
    ClubCreationComponent,
    JoinFormComponent,

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
    AddMeetingRequestComponent,

    // =========== Validation ============= //
    ValidationComponent,
    ValidationDetailstDialogComponent,

    // ===========Events============= //
    EventsComponent,
    AddEventRequestComponent,
    EventDetailsComponent,

    // ================================ //
    ForumComponent,
    ProfileComponent,
    // ============ Landing Page ============ //
    LandingPage,
    ImageSliderComponent,
    CarouselClubsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimeNgModule,
    MatCommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FullCalendarModule,
    RouterModule.forChild(pageRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
  providers: [DatePipe],
})
export class PagesModule { }
