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
import { PreBillingPadListComponent} from './billing-pad-list/pre-billing-pad-list.component';
import { PreBillingPadRoutingModule } from './billing-pad-routing.module';
import { PreBillingAdmissionComponent } from './pre-billing-admission/pre-billing-admission.component';
import { FormPreBillingAdmissionComponent } from './pre-billing-admission/form-pre-billing-admission/form-pre-billing-admission.component';
import { ActionsStatusComponent } from './billing-pad-list/actions-status.component';

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
    PreBillingPadRoutingModule,
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
    PreBillingPadListComponent,
    PreBillingAdmissionComponent,
    FormPreBillingAdmissionComponent,
    ActionsStatusComponent,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class PreBillingPadModule {
}
