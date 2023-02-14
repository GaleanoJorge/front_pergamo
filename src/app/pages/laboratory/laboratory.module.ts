import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
  NbInputModule,
  NbSelectModule,
  NbAlertModule,
  NbDialogModule,
  NbIconModule,
  NbCheckboxModule,
  NbTooltipModule,
  NbPopoverModule,
  NbRadioModule,
  NbDatepickerModule, NbSpinnerModule,
} from '@nebular/theme';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import { LaboratoryComponent } from './laboratory.component';
import { LaboratoryListComponent } from './laboratory-list/laboratory-list.component';
import { FormLaboratoryComponent } from './laboratory-list/form-laboratory/form-laboratory.component';
import { Actions2Component } from './laboratory-list/actions.component';
import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { FormChangeLaboratoryStatus } from './form-change-laboratory-status/form-change-laboratory-status.component';
import { ActionsFileComponent } from './laboratory-list/actions-file.component';
import { ActionsSemaphoreComponent } from './laboratory-list/actions-semaphore.component';

@NgModule({
  imports: [
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbRadioModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbTooltipModule,
    NbListModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSelectModule,
    NbAlertModule,
    PagesModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    NbSpinnerModule,
    NbPopoverModule,
    LaboratoryRoutingModule,   
  ],
  declarations: [
    LaboratoryComponent,
    LaboratoryListComponent,
    FormLaboratoryComponent,
    FormChangeLaboratoryStatus,
    Actions2Component,
    ActionsFileComponent,
    ActionsSemaphoreComponent
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class LaboratoryModule {
}
