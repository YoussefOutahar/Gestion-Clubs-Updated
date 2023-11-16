import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routing';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { } from 'ngx-webstorage';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthRoutes)
  ],
  declarations: [
    AuthPageComponent,
    RegisterPageComponent
  ],
})
export class AuthModule { }
