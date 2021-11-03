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
  NbDatepickerModule, NbSpinnerModule,
} from '@nebular/theme';
import {ServicesBriefcaseComponent} from './services-briefcase/services-briefcase.component';
import {ThemeModule} from '../../@theme/theme.module';
import {ContractRoutingModule} from './contract-routing.module';
import {ContractComponent} from './contract.component';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {ContractListComponent} from './contract-list/contract-list.component';
import {FormContractComponent} from './contract-list/form-contract/form-contract.component';
import {FileContractComponent} from './file-contract/file-contract.component';
import {FormFileContractComponent} from './file-contract/form-file-contract/form-file-contract.component';
import {BriefcaseComponent} from './briefcase/briefcase.component';
import {FormBriefcaseComponent} from './briefcase/form-briefcase/form-briefcase.component';
import {Actions2Component} from './contract-list/actions.component';
import {Actions3Component} from './briefcase/actions3.component';
import {ActionsComponent} from './briefcase/actions.component';
import {DetailServicesComponent} from './detail-services/detail-services.component';


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
    NbListModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSelectModule,
    ContractRoutingModule,
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
    BriefcaseComponent,
    ActionsComponent,
    DetailServicesComponent,
    FormBriefcaseComponent,
    ServicesBriefcaseComponent,
    FileContractComponent,
    FormFileContractComponent,
    ContractComponent,
    ContractListComponent,
    FormContractComponent,
    Actions2Component,
    Actions3Component
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class ContractModule {
}
