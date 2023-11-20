import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './Layout/layout.component';
import { BlankComponent } from './Layout/blank/blank.component';

const routes: Routes = [
  // {path: '', redirectTo: '/session/authenticate', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', redirectTo: '/dashboard/home', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./Pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./Pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./Pages/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'session', redirectTo: '/session/authenticate', pathMatch: 'full' },
      {
        path: 'session',
        loadChildren: () => import('./Auth/auth.module').then((m) => m.AuthModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
