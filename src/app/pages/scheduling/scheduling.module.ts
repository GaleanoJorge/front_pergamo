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

    SchedulingComponent,
  ],
  exports: [

  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe,
  ],
})
export class SchedulingModule {

}
