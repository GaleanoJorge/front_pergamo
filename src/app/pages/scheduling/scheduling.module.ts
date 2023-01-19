import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, PercentPipe } from '@angular/common';
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
  NbDatepickerModule, NbSpinnerModule, NbToggleModule, NbAutocompleteModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { PagesModule } from '../pages.module';
import { DateFormatPipe } from '../../pipe/date-format.pipe';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { SchedulingRoutingModule } from './scheduling-routing.module';
import { TelemedicineListComponent } from './telemedicine/telemedicine-list/telemedicine-list.component';
import { FormTelemedicineComponent } from './telemedicine/telemedicine-list/form-telemedicine/form-telemedicine.component';
import { NonWorkingDaysComponent } from './non-working-days/non-working-days.component';
import { FormNonWorkingDaysComponent } from './non-working-days/form-non-working-days/form-non-working-days.component';
import { MedicalDiaryComponent } from './medical-diary/medical-diary.component';
import { ActionsMedicalDiaryComponent } from './medical-diary/actions.component';
import { MedicalComponent } from './medical-diary/medical/medical.component';
import { ActionsMedicalComponent } from './medical-diary/medical/actions.component';
import { FormMedicalDiaryComponent } from './medical-diary/form-medical-diary/form-medical-diary.component';
import { SchedulingComponent } from './scheduling.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ActionsDaysComponent } from './non-working-days/actions.component';
import { CupsCheckComponent } from './medical-diary/cups-package/cups-check.component';
import { CupsPackageComponent } from './medical-diary/cups-package/cups-package.component';
import { FormHealthcareItineraryComponent } from './healtcare-itinerary/form-healtcare-itinerary/form-healthcare-itinerary.component';
import { HealthcareItineraryComponent } from './healtcare-itinerary/healthcare-itinerary.component';
import { PatientTableComponent } from './healtcare-itinerary/patient-table/patient-table.component';
import { PatientCheckComponent } from './healtcare-itinerary/patient-check.component';
import { FormPatientComponent } from './healtcare-itinerary/form-patient/form-patient.component';
import { FormHealthcareItineraryAgendantComponent } from './healtcare-itinerary/form-healtcare-itinerary-agendant/form-healtcare-itinerary-agendant.component';
import { CopayCategoryComponent } from './copay_category/copay-category.component';
import { FormCopayCategoryComponent } from './copay_category/form-copay_category/form-copay_category.component';
import { StatusFieldComponent } from './copay_category/status-field.component';
import { FormConfirmDisabledComponent } from './copay_category/form-confirm-disabled/form-confirm-disabled.component';
import { SchedulingTableComponent } from './healtcare-itinerary/scheduling-table/scheduling-table.component';
import { ActionsSchedulingComponent } from './healtcare-itinerary/scheduling-table/actions-scheduling.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { AssistencialViewComponent } from './assistencial-view/assistencial-view.component';
import { FormAssistencialViewComponent } from './assistencial-view/form-assistencial-view/form-assistencial-view.component';
import { actionsSemaphore } from './assistencial-view/actionsSemaphore.component';
import { ActionsAssistencialComponent } from './assistencial-view/actions-assistencial.component';
import { ReasonCancelComponent } from './reason-cancel/reason-cancel.component';
import { FormReasonCancelComponent } from './reason-cancel/form-reason-cancel/form-reason-cancel.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormTransferScheduleComponent } from './transfer-schedule/form-transfer-schedule/form-transfer-schedule.component';
import { TransferScheduleComponent } from './transfer-schedule/transfer-schedule.component';




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
    SchedulingRoutingModule,
    NbAlertModule,
    PagesModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    NbAutocompleteModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    NbSpinnerModule,
    ScheduleModule,
  ],
  declarations: [

    ReasonCancelComponent,
    FormReasonCancelComponent,

    AssistencialViewComponent,
    FormAssistencialViewComponent,
    actionsSemaphore,
    ActionsAssistencialComponent,

    EditPatientComponent,
    ActionsSchedulingComponent,
    SchedulingTableComponent,
    StatusFieldComponent,
    FormConfirmDisabledComponent,
    CopayCategoryComponent,
    FormCopayCategoryComponent,

    FormHealthcareItineraryAgendantComponent,

    PatientTableComponent,
    PatientCheckComponent,

    FormHealthcareItineraryComponent,
    HealthcareItineraryComponent,
    
    CupsPackageComponent,
    CupsCheckComponent,
    
    TelemedicineListComponent,
    FormTelemedicineComponent,
    
    ActionsDaysComponent,
    NonWorkingDaysComponent,
    FormNonWorkingDaysComponent,
    
    MedicalDiaryComponent,
    ActionsMedicalDiaryComponent,
    
    MedicalComponent,
    ActionsMedicalComponent,
    
    FormMedicalDiaryComponent,
    FormPatientComponent,
    
    SchedulingComponent,

    TransferScheduleComponent,
    FormTransferScheduleComponent
  ],
  exports: [

  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe,
    PercentPipe
  ],
})
export class SchedulingModule {

}
