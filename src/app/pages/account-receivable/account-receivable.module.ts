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
import {AccountReceivableComponent} from './account-receivable..component';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {AccountReceivableListComponent} from './account-receivable-list/account-receivable-list.component';
import {FormAccountReceivableComponent} from './account-receivable-list/form-account-receivable/form-account-receivable.component';
import {Actions2Component} from './account-receivable-list/actions.component';
import { ActionsSemaphoreComponent } from './account-receivable-list/actions-semaphore.component';
import { AccountReceivableRoutingModule } from './account-receivable-routing.module';
import { RentReliefPackageComponent } from './account-receivable-list/form-rent-relief/rent-relief-package/rent-relief-package.component';
import { FormRentReliefComponent } from './account-receivable-list/form-rent-relief/form-rent-relief.component';
import { BillUserActivityComponent } from './bill-user-activity/bill-user-activity.component';
import { ActionsBillComponent } from './bill-user-activity/actions.component';
import { SelectRentReliefPackageComponent } from './account-receivable-list/form-rent-relief/rent-relief-package/select-rent-relief-package.component';
import { AmountRentReliefPackageComponent } from './account-receivable-list/form-rent-relief/rent-relief-package/amount-rent-relief-package.component';
import { FileRentReliefPackageComponent } from './account-receivable-list/form-rent-relief/rent-relief-package/file-rent-relief-package.component';
import { FormConfirmPayComponent } from './account-receivable-list/form-confirm-pay/form-confirm-pay.component';
import { FormRejectAccountComponent } from './account-receivable-list/form-rent-relief/form-reject-account/form-reject-account.component';
import { AccountPatientActionsComponent } from './account-patient/account-patient-actions.component';
import { AccountPatientComponent } from './account-patient/account-patient.component';
import { BillUserActivityPatientComponent } from './bill-user-activity-patient/bill-user-activity-patient.component';




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
    AccountReceivableRoutingModule,
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
    AccountReceivableComponent,
    AccountReceivableListComponent,
    FormAccountReceivableComponent,
    Actions2Component,
    ActionsSemaphoreComponent,
    RentReliefPackageComponent,
    FormRentReliefComponent,
    BillUserActivityComponent,
    ActionsBillComponent,
    SelectRentReliefPackageComponent,
    AmountRentReliefPackageComponent,
    FileRentReliefPackageComponent,
    FormConfirmPayComponent,
    FormRejectAccountComponent,
    AccountPatientActionsComponent,
    AccountPatientComponent,
    BillUserActivityPatientComponent,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class AccountReceivableModule {
}
