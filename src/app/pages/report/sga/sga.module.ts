import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SgaComponent } from './sga.component';
import { SgaRoutingModule } from './sga-routing.module';
import { PagesModule } from '../../pages.module';
import { FormsModule } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, 
  NbIconModule, 
  NbInputModule, 
  NbRadioModule, 
  NbSelectModule, 
  NbSpinnerModule
} from '@nebular/theme';

import { AcademicActivitiesComponent } from './academic-activities/academic-activities.component';
import { HoursAssistanceComponent } from './hours-assistance/hours-assistance.component';
import { AttendeesAllCoursesComponent } from './attendees-all-courses/attendees-all-courses.component';
import { RegisteredCoursesComponent } from './registered-courses/registered-courses.component';
import { AssignedTrainersComponent } from './assigned-trainers/assigned-trainers.component';
import { ActivitiesCarriedOutComponent } from './activities-carried-out/activities-carried-out.component';
import { MulticriteriaInscribedFiltersComponent } from './multicriteria-inscribed-filters/multicriteria-inscribed-filters.component';
import { ActivitiesPendingClosingEventComponent } from './activities-pending-closing-event/activities-pending-closing-event.component';
import { ActivitiesPendingAssignmentTrainerComponent } from './activities-pending-assignment-trainer/activities-pending-assignment-trainer.component';
import { ConsolidatedEventsComponent } from './consolidated-events/consolidated-events.component';
import { AcademicRecordComponent } from './academic-record/academic-record.component';
import { ExtraordinaryRecordComponent } from './extraordinary-record/extraordinary-record.component';
import { MulticriteriaFiltersComponent } from './multicriteria-filters/multicriteria-filters.component';
import { SurveyTrainersComponent } from './survey-trainers/survey-trainers.component';
import { SurveyCoursesComponent } from './survey-courses/survey-courses.component';
import { SurveyTabulationComponent } from './survey-tabulation/survey-tabulation.component';
import { InconsistenciesComponent } from './inconsistencies/inconsistencies.component';


@NgModule({
  declarations: [
    SgaComponent,
    AcademicActivitiesComponent,
    HoursAssistanceComponent,
    AttendeesAllCoursesComponent,
    RegisteredCoursesComponent,
    AssignedTrainersComponent,
    ActivitiesCarriedOutComponent,
    MulticriteriaInscribedFiltersComponent,
    ActivitiesPendingClosingEventComponent,
    ActivitiesPendingAssignmentTrainerComponent,
    ConsolidatedEventsComponent,
    AcademicRecordComponent,
    ExtraordinaryRecordComponent,
    MulticriteriaFiltersComponent,
    SurveyTrainersComponent,
    SurveyCoursesComponent,
    SurveyTabulationComponent,
    InconsistenciesComponent,
  ],
  imports: [
    CommonModule,
    SgaRoutingModule,
    PagesModule,
    NbSelectModule,
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
export class SgaModule {
}
