import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
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
  NbDatepickerModule, NbSpinnerModule, NbPopoverModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { PagesModule } from '../pages.module';
import { DateFormatPipe } from '../../pipe/date-format.pipe';
import { ReferenceRoutingModule } from './reference-routing.module';
import { ReferenceComponent } from './reference.component';
import { Actions2Component } from './reference-list/actions.component';
import { ActionsSemaphoreComponent } from './reference-list/actions-semaphore.component';
import { FormReferenceComponent } from './reference-list/form-reference/form-reference.component';
import { ReferenceListComponent } from './reference-list/reference-list.component';


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
    NbAccordionModule,
    NbUserModule,
    NbSelectModule,
    NbPopoverModule,
    ReferenceRoutingModule,
    NbAlertModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    NbSpinnerModule,
    PagesModule

  ],
  declarations: [
    FormReferenceComponent,
    ReferenceListComponent,
    ReferenceComponent,
    Actions2Component,
    ActionsSemaphoreComponent,
  ],
  exports: [
    FormReferenceComponent,
    ReferenceListComponent,
    ReferenceComponent,
    Actions2Component,
    ActionsSemaphoreComponent,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class ReferenceModule {
}
