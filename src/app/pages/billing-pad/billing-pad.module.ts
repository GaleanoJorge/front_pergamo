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
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class BillingPadModule {
}
