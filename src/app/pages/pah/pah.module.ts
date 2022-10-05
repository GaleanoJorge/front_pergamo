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
import {PahRoutingModule} from './pah-routing.module';
import {PahComponent} from './pah.component';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {PahListComponent} from './pah-list/pah-list.component';
import {FormPahComponent} from './pah-list/form-pah/form-pah.component';
import {Actions2Component} from './pah-list/actions.component';
import {InstanceAdmissionComponent} from './instance-admission/instance-admission.component';
import {FormInstanceAdmissionComponent} from './instance-admission/form-instance-admission/form-instance-admission.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { ActionsSemaphoreComponent } from './instance-admission/actions-semaphore.component';
import { Actions4Component } from './instance-admission/actions.component';




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
    PahRoutingModule,
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
    PahComponent,
    PahListComponent,
    FormPahComponent,
    Actions2Component,
    InstanceAdmissionComponent,
    FormInstanceAdmissionComponent,
    ActionsSemaphoreComponent,
    Actions4Component,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe,
  ],
  exports: [ ]
})
export class PahModule {
}
