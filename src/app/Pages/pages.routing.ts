import { Routes } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ClubsComponent } from './Components/clubs/clubs.component';
import { MembersComponent } from './Components/Membershandling/members/members.component';
import { ValidationComponent } from './Components/ValidationHandling/validation/validation.component';
import { EventsComponent } from './Components/events/events.component';

import { authGuard } from '../Auth/auth.guard';
import { AdminFinanceComponent } from './Components/AdminFinance/adminFinance.component';
import { MeetingsComponent } from './Components/meetings/meetings.component';
import { AssignBudgetComponent } from './Components/Finance/assignBudget/assignBudget.component';
import { ClubFinanceComponent } from './Components/ClubFinance/clubFinance.component';
import { AddChargeComponent } from './Components/Finance/addCharge/addCharge.component';
import { SuppBudgetComponent } from './Components/Finance/suppBudget/suppBudget.component';
import { ClubCreationComponent } from './Components/clubCreation/clubCreation.component';
import { AddEventRequestComponent } from './Components/addEventRequest/addEventRequest.component';
import { AddMeetingRequestComponent } from './Components/addMeetingRequest/addMeetingRequest.component';
import { clubDashboardComponent } from './Components/ClubDashboard Page/clubDashboard.component';
import { AdminDashboardComponent } from './Components/AdminDashboard/adminDashboard.component';

export const pageRoutes: Routes = [
  {
    path: 'home',
    component: DashboardPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'clubDashboard',
    component: clubDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'clubs',
    component: ClubsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'finance',
    component: AdminFinanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'clubFinance',
    component: ClubFinanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assignBudget',
    component: AssignBudgetComponent,
    canActivate: [authGuard],
  },
  {
    path: 'suppBudget',
    component: SuppBudgetComponent,
    canActivate: [authGuard],
  },
  {
    path: 'addCharge',
    component: AddChargeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'meetings',
    component: MeetingsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'validation',
    component: ValidationComponent,
    canActivate: [authGuard],
  },
  // ====================================
  {
    path: 'club/create',
    component: ClubCreationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'meeting/create',
    component: AddMeetingRequestComponent,
    canActivate: [authGuard],
  },
  {
    path: 'event/create',
    component: AddEventRequestComponent,
    canActivate: [authGuard],
  },
];
