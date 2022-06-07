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
import { FormAssignedManagementPlanComponent } from './assigned-management-plan/form-assigned-management-plan/form-assigned-management-plan.component';
import { ActionsSemaphoreComponent } from './assigned-management-plan/actions-semaphore.component';
import { ActionsSemaphore2Component } from './management-plan/actions-semaphore.component';
import { PharmacyApplicationComponent } from './management-plan/pharmacy-application/pharmacy-application.component';
import { Actions3Component } from './management-plan/pharmacy-application/actions.component';




@NgModule({
  imports: [
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbToggleModule,
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
    PharmacyApplicationComponent,
    PadListComponent,
    FormPadComponent,
    ManagementPlanComponent,
    FormManagementPlanComponent,
    FormAssignedManagementPlanComponent,
    Actions2Component,
    Actions3Component,
    Actions4Component,
    ActionsSemaphoreComponent,
    ActionsSemaphore2Component,
    ActionsComponent,
    AssignedManagementPlanComponent
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
  exports: [ ManagementPlanComponent ]
})
export class PadModule {
}
