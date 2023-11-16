import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OfficePageComponent } from './office-page/office-page.component';
import { BudgetPageComponent } from './budget-page/budget-page.component';
import { GanttPageComponent } from './gantt-page/gantt-page.component';
import { ResourcesPageComponent } from './resources-page/resources-page.component';
import { ActivityNetworkPageComponent } from './activity-network-page/activity-network-page.component';
import { ReportsPageComponent } from './reports-page/reports-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { RiskRegisterPageComponent } from './risk-register-page/risk-register-page.component';
import { RaciMatrixPageComponent } from './raci-matrix-page/raci-matrix-page.component';
import { authGuard } from '../Auth/auth.guard';

export const pageRoutes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'office',
        component: OfficePageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'budget',
        component: BudgetPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'gantt',
        component: GanttPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'ressources',
        component: ResourcesPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'activity-network',
        component: ActivityNetworkPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'reports',
        component: ReportsPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'calendar',
        component: CalendarPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'risk-register',
        component: RiskRegisterPageComponent,
        canActivate: [authGuard],
    
    },
    {
        path: 'raci-matrix',
        component: RaciMatrixPageComponent,
        canActivate: [authGuard],
    },

];
