import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SgaOldComponent} from './sga-old.component';
import {AcademicActivitiesDoneComponent} from './academic-activities-done/academic-activities-done.component';
import {SgaOldRoutingModule} from './sga-old-routing.module';
import {PagesModule} from '../../pages.module';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbIconModule,
  NbInputModule, NbRadioModule,
  NbSpinnerModule,
} from '@nebular/theme';
import {SummonedVsAttendeesComponent} from './summoned-vs-attendees/summoned-vs-attendees.component';
import {DiscentesActivitiesComponent} from './discentes-activities/discentes-activities.component';
import { DiscentesMulticriterioComponent } from './discentes-multicriterio/discentes-multicriterio.component';
import {FormsModule} from '@angular/forms';
import { RecordHoursComponent } from './record-hours/record-hours.component';
import { AcademicRecordComponent } from './academic-record/academic-record.component';
import { IndividualSurveysComponent } from './individual-surveys/individual-surveys.component';
import { SurveysDoneComponent } from './surveys-done/surveys-done.component';
import { MulticriterioGeneralComponent } from './multicriterio-general/multicriterio-general.component';

@NgModule({
  declarations: [
    SgaOldComponent,
    AcademicActivitiesDoneComponent,
    SummonedVsAttendeesComponent,
    DiscentesActivitiesComponent,
    DiscentesMulticriterioComponent,
    RecordHoursComponent,
    AcademicRecordComponent,
    IndividualSurveysComponent,
    SurveysDoneComponent,
    MulticriterioGeneralComponent,
  ],
  imports: [
    CommonModule,
    SgaOldRoutingModule,
    PagesModule,
    NbInputModule,
    NbAutocompleteModule,
    NbSpinnerModule,
    NbCardModule,
    FormsModule,
    NbButtonModule,
    NbIconModule,
    NbRadioModule,
    NbCheckboxModule,
  ],
})
export class SgaOldModule {
}
