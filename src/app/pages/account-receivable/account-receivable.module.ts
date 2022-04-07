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
import { AmountUserActivityComponent } from './account-receivable-list/user-activity/amount-user-activity.component';
import { SelectUserActivityComponent } from './account-receivable-list/user-activity/select-user-activity.component';
import { DishStockPackageComponent } from './account-receivable-list/user-activity/user-activity.component';
import { FormManagerPadComponent } from './account-receivable-list/form-manager-pad/form-manager-pad.component';




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
    AmountUserActivityComponent,
    SelectUserActivityComponent,
    DishStockPackageComponent,
    FormManagerPadComponent

  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class AccountReceivableModule {
}
