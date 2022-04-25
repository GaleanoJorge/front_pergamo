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
import {AuthorizationRoutingModule} from './authorization-routing.module';
import {AuthorizationComponent} from './authorization.component';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {AuthorizationListComponent} from './authorization-list/authorization-list.component';
import {HistoricAuthorizationListComponent} from './authorization-list/historic-authorization/historic-authorization.component';
import { ActionsStatusComponent } from './authorization-list/actions-status.component';
import { ActionsAuthNumberComponent } from './authorization-list/actions-auth-number.component';
import { FormObservationComponent } from './authorization-list/historic-authorization/form-observation/form-observation.component';




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
    AuthorizationRoutingModule,
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
    FormObservationComponent,
    ActionsStatusComponent,
    ActionsAuthNumberComponent,
    AuthorizationComponent,
    AuthorizationListComponent,
    HistoricAuthorizationListComponent,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class AuthorizationModule {
}
