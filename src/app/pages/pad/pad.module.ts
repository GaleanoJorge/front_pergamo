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
import { FormConsentsInformedComponent } from './consents-informed/form-consents-informed/form-consents-informed.component';
import { ConsentsInformedComponent } from './consents-informed/consents-informed.component';
import { ActionsCIComponent } from './consents-informed/actions.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { AdmissionsPatientPadComponent } from './admissions-patient/admissions-patient.component';
import { ActionsPadComponent } from './admissions-patient/actions.component';
import { SuppliesView } from './management-plan/supplies-view/supplies-view.component';
import { AssistanceStockComponent } from '../setting/assistance-stock/assistance-stock.component';
import { FixedPlanComponent } from './management-plan/fixed-plan/fixed-plan.component';
import { FormFixedPlanComponent } from './management-plan/fixed-plan/form-fixed-plan/form-fixed-plan.component';
import { FormFixedReturnComponent } from './management-plan/fixed-return/form-fixed-return/form-fixed-return.component';
import { FixedReturnComponent } from './management-plan/fixed-return/fixed-return.component';
import { ActionsRetuPatientComponent } from './management-plan/fixed-return/actions.component';




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
    SignaturePadModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    NbSpinnerModule,
  ],
  declarations: [
    SuppliesView,
    PadComponent,
    PharmacyApplicationComponent,
    PadListComponent,
    ConsentsInformedComponent,
    FormPadComponent,
    AdmissionsPatientPadComponent,
    ManagementPlanComponent,
    FormManagementPlanComponent,
    FormConsentsInformedComponent,
    ActionsPadComponent,
    FormAssignedManagementPlanComponent,
    Actions2Component,
    Actions3Component,
    Actions4Component,
    ActionsCIComponent,
    ActionsSemaphoreComponent,
    ActionsSemaphore2Component,
    ActionsComponent,
    AssignedManagementPlanComponent,
    FormFixedPlanComponent,
    FixedPlanComponent,
    FormFixedReturnComponent,
    FixedReturnComponent,
    ActionsRetuPatientComponent
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe,
  ],
  exports: [ ManagementPlanComponent ]
})
export class PadModule {
}
