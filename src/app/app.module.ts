import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './UI-Modules/material.module';

import { LayoutModule } from './Layout/Layout.module';
import { AuthModule } from './Auth/auth.module';

import { AppComponent } from './app.component';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { NgxSpinnerModule } from 'ngx-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { PrimeNgModule } from './UI-Modules/primeNg.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    MaterialModule,
    PrimeNgModule,
    MatGridListModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TablerIconsModule.pick(TablerIcons),
    // ==========================
    NgxSpinnerModule,
  ],
  exports: [TablerIconsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
