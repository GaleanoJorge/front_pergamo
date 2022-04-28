import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  NbInputModule, NbSelectModule, NbRadioModule, NbIconModule, NbSpinnerModule, NbPopoverModule, NbToggleModule, NbTooltipModule, NbDialogModule, NbCheckboxModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ClinicHistoryRoutingModule } from './clinic-history-routing.module';
import { PagesModule } from '../pages.module';

import { DateFormatPipe } from '../../pipe/date-format.pipe';

import { Actions5Component } from './ch-record-list/actions.component';
import { FormClinicHistoryComponent } from './clinic-history-list/form-clinic-history/form-clinic-history.component';
import { FormReasonConsultationComponent } from './entry-clinic-history/form-reason-consultation/form-reason-consultation.component';
import { Actions6Component } from './entry-clinic-history/actions.component';
import { ClinicHistoryListComponent } from './clinic-history-list/clinic-history-list.component';
import { ClinicHistoryComponent } from './clinic-history.component';
import { ChRecordListComponent } from './ch-record-list/ch-record-list.component';
import { Actions4Component } from './clinic-history-list/actions.component';
import { FormsignsComponent } from './signs/form-signs/form-signs.component';
import { Actions1Component } from './signs/actions.component';
import { SignsListComponent } from './signs/signs.component';
import { EntryClinicHistoryComponent } from './entry-clinic-history/entry-clinic-history.component';
import { SystemExamComponent } from './system-exam/system-exam.component';
import { OrdersMedicalComponent } from './medical-orders/orders-medical.component';
import { FormOrdersMedicalComponent } from './medical-orders/form-orders-medical/form-orders-medical.component';
import { FormSystemExamComponent } from './system-exam/form-system-exam/form-system-exam.component';
import { PadModule } from '../pad/pad.module';
import { FormBackgroundComponent } from './background/back/form-background/form-background.component';

import { FormPhysicalExamComponent } from './physical-exam/form-physical-exam/form-physical-exam.component';
import { PhysicalExamComponent } from './physical-exam/physical-exam.component';
import { Actions3Component } from './physical-exam/actions.component';
import { Actions7Component } from './system-exam/actions.component';
import { DiagnosticListComponent } from './diagnostic/diagnostic.component';
import { Actions2Component } from './diagnostic/actions.component';
import { FormDiagnosticComponent } from './diagnostic/form-diagnostic/form-diagnostic.component';

import { FormBackGynecoComponent } from './background/back-gyneco/form-back-gyneco/form-back-gyneco.component';
import { BackgGynecoComponent } from './background/back-gyneco/back-gyneco.component';
import { Actions9Component } from './background/back-gyneco/actions.component';
import { BackListComponent } from './background/back-list.component';
import { BackgroundComponent } from './background/back/background.component';
import { Actions8Component } from './background/back/actions.component';
import { ChScalesComponent } from './scales/ch-scales.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    PadModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbTooltipModule,
    NbAccordionModule,
    NbUserModule,
    ClinicHistoryRoutingModule,
    NbInputModule,
    PagesModule,
    NbDialogModule.forRoot(),
    Ng2SmartTableModule,
    NbPopoverModule,
    NbSelectModule,
    NbRadioModule,
    NbIconModule,
    NbSpinnerModule,
    NbToggleModule,
    NbCheckboxModule,
  ],
  declarations: [
    ClinicHistoryComponent,
    FormClinicHistoryComponent,
    ClinicHistoryListComponent,
    FormReasonConsultationComponent,
    EntryClinicHistoryComponent,
    ChRecordListComponent,
    FormsignsComponent,
    SignsListComponent,
    Actions1Component,
    Actions4Component,
    Actions5Component,
    Actions6Component,
    OrdersMedicalComponent,
    FormDiagnosticComponent,
    DiagnosticListComponent,
    Actions2Component,
    FormPhysicalExamComponent,
    PhysicalExamComponent,
    Actions3Component,
    FormOrdersMedicalComponent,
    FormSystemExamComponent,
    SystemExamComponent,
    Actions7Component,

    FormBackgroundComponent,
    BackgroundComponent,
    Actions8Component,

    FormBackGynecoComponent,
    BackgGynecoComponent,
    Actions9Component,

    BackListComponent,

    ChScalesComponent,
    
   ],

  providers: [
    DateFormatPipe,
  ],
  exports: [],
})
export class ClinicHistoryModule {
}
