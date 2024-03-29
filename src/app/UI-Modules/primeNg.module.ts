import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';

import { DockModule } from 'primeng/dock';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';

import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';

import { StyleClassModule } from 'primeng/styleclass';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';

import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { ImageModule } from 'primeng/image';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [],
  exports: [
    // ===================
    ButtonModule,
    SplitButtonModule,
    SpeedDialModule,
    // ===================
    BreadcrumbModule,
    DockModule,
    AutoCompleteModule,
    CalendarModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipsModule,
    ColorPickerModule,
    CardModule,
    AccordionModule,
    DividerModule,
    ToolbarModule,
    // ===================
    StyleClassModule,
    DropdownModule,

    ScrollPanelModule,
    PanelModule,

    DynamicDialogModule,
    ImageModule,
    FieldsetModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressSpinnerModule,
    TableModule,
    ChipModule,
  ],
})
export class PrimeNgModule {}
