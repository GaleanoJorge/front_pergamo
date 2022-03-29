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
  NbDatepickerModule, NbSpinnerModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {PadRoutingModule} from './pad-routing.module';
import {PadComponent} from './pad.component';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {PadListComponent} from './pad-list/pad-list.component';
import {FormPadComponent} from './pad-list/form-pad/form-pad.component';
import {Actions2Component} from './pad-list/actions.component';
import { ActionsComponent } from './management-plan/actions.component';
import { ManagementPlanComponent } from './management-plan/management-plan.component';
import { FormManagementPlanComponent } from './management-plan/form-management-plan/form-management-plan.component';
import { AssignedManagementPlanComponent } from './assigned-management-plan/assigned-management-plan.component';
import { Actions4Component } from './assigned-management-plan/actions.component';




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
    PadRoutingModule,
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
    PadComponent,
    PadListComponent,
    FormPadComponent,
    ManagementPlanComponent,
    FormManagementPlanComponent,
    Actions2Component,
    Actions4Component,
    ActionsComponent,
    AssignedManagementPlanComponent
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class PadModule {
}
