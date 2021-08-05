import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SgaComponent } from './sga.component';
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

const routes: Routes = [{
  path: '',
  component: SgaComponent,
  children: [
    {
      path: 'consolidated-events',
      component: ConsolidatedEventsComponent
    },
    {
      path: 'academic-activities',
      component: AcademicActivitiesComponent,
    },
    {
      path: 'hours-assistance',
      component: HoursAssistanceComponent,
    },
    {
      path: 'attendees-all-courses',
      component: AttendeesAllCoursesComponent,
    },
    {
      path: 'registered-courses',
      component: RegisteredCoursesComponent,
    },
    {
      path: 'assigned-trainers',
      component: AssignedTrainersComponent,
    },
    {
      path: 'academic-record',
      component: AcademicRecordComponent
    },
    {
      path: 'activities-carried-out',
      component: ActivitiesCarriedOutComponent,
    },
    {
      path: 'multicriteria-inscribed-filters',
      component: MulticriteriaInscribedFiltersComponent,
    },
    {
      path: 'extraordinary-record',
      component: ExtraordinaryRecordComponent
    },
    {
      path: 'activities-pending-closing-event',
      component: ActivitiesPendingClosingEventComponent,
    },
    {
      path: 'activities-pending-assignment-trainer',
      component: ActivitiesPendingAssignmentTrainerComponent,
    },
    {
      path: 'multicriteria-filters',
      component: MulticriteriaFiltersComponent,
    },
    {
      path: 'survey-trainers',
      component: SurveyTrainersComponent,
    },
    {
      path: 'survey-courses',
      component: SurveyCoursesComponent,
    },
    {
      path: 'survey-tabulation',
      component: SurveyTabulationComponent,
    },
    {
      path: 'inconsistencies',
      component: InconsistenciesComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SgaRoutingModule { }
