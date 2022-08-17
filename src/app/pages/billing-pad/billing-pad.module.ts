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
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import { BillingPadListComponent} from './billing-pad-list/billing-pad-list.component';
import { BillingPadRoutingModule } from './billing-pad-routing.module';
import { BillingAdmissionComponent } from './billing-admission/billing-admission.component';
import { FormBillingPadComponent } from './billing-pad-procedure/form-billing-pad/form-billing-pad.component';
import { ActionsStatusComponent } from './billing-pad-list/actions-status.component';
import { ActionsBillingComponent } from './billing-admission/actions-billing.component';
import { BillingPadProcedureComponent } from './billing-pad-procedure/billing-pad-procedure.component';
import { ActionsPadProcedureComponent } from './billing-pad-procedure/actions-pad-procedure.component';
import { SelectServiceBillingComponent } from './billing-pad-procedure/select-service-billing.component';
import { FormShowBillingPadComponent } from './billing-admission/form-show-billing-pad/form-show-billing-pad.component';
import { BillingPgpComponent } from './billing-pgp/billing-pgp.component';
import { ActionsBillingPgpComponent } from './billing-pgp/actions-billing-pgp.component';
import { FormShowBillingPgpComponent } from './billing-pgp/form-show-billing-pgp/form-show-billing-pgp.component';
import { FormCreateBillingPgpComponent } from './billing-pgp/form-create-billing-pgp/form-create-billing-pgp.component';
import { BillingAdmissionsPadListComponent } from './billing-pad-admissions-list/billing-admissions-pad-list.component';
import { ActionsAdmissionsListComponent } from './billing-pad-admissions-list/actions-admissions-list.component';
import { BillingPadContracsComponent } from './billing-pad-contracts/billing-pad-contracts.component';
import { ActionsBillingPadContracsComponent } from './billing-pad-contracts/actions-billing-pad-contracts.component';
import { BillingPadBriefcaseComponent } from './billing-pad-briefcase/billing-pad-briefcase.component';
import { ActionsBillingPadBriefcaseComponent } from './billing-pad-briefcase/actions-billing-pad-briefcase.component';
import { ActionsSemaphoreAdmissionsListComponent } from './billing-pad-admissions-list/actions -semaphore-admissions-list.component';

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
    BillingPadRoutingModule,
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
    BillingPadListComponent,
    BillingAdmissionComponent,
    FormBillingPadComponent,
    ActionsStatusComponent,
    ActionsBillingComponent,
    BillingPadProcedureComponent,
    ActionsPadProcedureComponent,
    SelectServiceBillingComponent,
    FormShowBillingPadComponent,
    BillingPgpComponent,
    ActionsBillingPgpComponent,
    FormShowBillingPgpComponent,
    FormCreateBillingPgpComponent,
    BillingAdmissionsPadListComponent,
    ActionsAdmissionsListComponent,
    BillingPadContracsComponent,
    ActionsBillingPadContracsComponent,
    BillingPadBriefcaseComponent,
    ActionsBillingPadBriefcaseComponent,
    ActionsSemaphoreAdmissionsListComponent,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class BillingPadModule {
}
