import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { LayoutComponent } from './layout.component'
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { HeaderComponent } from './Components/header/header.component';
import { AppNavItemComponent } from './Components/side-bar/nav-item/nav-item.component';
import { BrandingComponent } from './Components/side-bar/branding.component';
import { BlankComponent } from './blank/blank.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    LayoutComponent,
    SideBarComponent,
    HeaderComponent,
    AppNavItemComponent,
    BrandingComponent,
    BlankComponent
  ]
})
export class LayoutModule { }
