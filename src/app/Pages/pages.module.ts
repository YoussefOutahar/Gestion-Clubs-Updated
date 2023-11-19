import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { pageRoutes } from './pages.routing';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { ClubsComponent } from './Components/clubs/clubs.component';
import { MembersComponent } from './Components/Membershandling/members/members.component';
import { ForumComponent } from './Components/forum/forum.component';

import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../material.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsComponent } from './Components/events/events.component';
import { ValidationComponent } from './Components/validation/validation.component';
import { MemberEditDialogComponent } from './Components/Membershandling/member-edit-dialog/member-edit-dialog.component';
import { MemberDeleteDialogComponent } from './Components/Membershandling/member-delete-dialog/member-delete-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    // ========== Pages ========== //
    DashboardPageComponent,
    // ================================ //

    // ========== Componenets ========== //
    // ================================ //
    ClubsComponent,
    
    // ========== Members ========== //
    MembersComponent,
    MemberEditDialogComponent,
    MemberDeleteDialogComponent,
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
    ReactiveFormsModule,
    NgApexchartsModule,
    RouterModule.forChild(pageRoutes),
    
  ],
  exports: [],
})
export class PagesModule {}
