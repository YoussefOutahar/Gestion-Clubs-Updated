import { Routes } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { authGuard } from '../Auth/auth.guard';

export const pageRoutes: Routes = [
  {
    path: 'home',
    component: DashboardPageComponent,
    canActivate: [authGuard],
  },
];
