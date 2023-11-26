import { Routes } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ClubsComponent } from './Components/clubs/clubs.component';
import { MembersComponent } from './Components/Membershandling/members/members.component';
import { ValidationComponent } from './Components/validation/validation.component';
import { EventsComponent } from './Components/events/events.component';

import { authGuard } from '../Auth/auth.guard';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { MeetingsComponent } from './Components/meetings/meetings.component';

export const pageRoutes: Routes = [
  {
    path: 'home',
    component: DashboardPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dash',
    component: AppDashboardComponent,
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
    component: DashboardPageComponent,
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
];
