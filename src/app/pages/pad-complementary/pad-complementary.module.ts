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
  NbRadioModule,
  NbTooltipModule,
  NbDatepickerModule, NbSpinnerModule, NbToggleModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {PadComplementaryRoutingModule} from './pad-complementary-routing.module';
import {PadComplementaryComponent} from './pad-complementary.component';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {PadComplementaryListComponent} from './pad-list/pad-complementary-list.component';
import {FormPadComplementaryComponent} from './pad-list/form-pad/form-pad-complementary.component';
import {Actions2Component} from './pad-list/actions.component';
import { ActionsComponent } from './management-plan/actions.component';
import { ManagementPlanComponent } from './management-plan/management-plan.component';
import { FormManagementPlanComponent } from './management-plan/form-management-plan/form-management-plan.component';
import { PatientData } from '../../models/patient-data';
import { PatientDataComponent } from '../admissions/patient-data/patient-data.component';




@NgModule({
  imports: [
    NbInputModule,
    NbToggleModule,
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
    NbAccordionModule,
    NbUserModule,
    NbSelectModule,
    PadComplementaryRoutingModule,
    NbAlertModule,
    PagesModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    NbSpinnerModule,
  ],
  declarations: [
    PadComplementaryComponent,
    PadComplementaryListComponent,
    FormPadComplementaryComponent,
    ManagementPlanComponent,
    FormManagementPlanComponent,
    Actions2Component,
    ActionsComponent
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class PadComplementaryModule {
}
