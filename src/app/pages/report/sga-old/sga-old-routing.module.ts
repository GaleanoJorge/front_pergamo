import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AcademicActivitiesDoneComponent} from './academic-activities-done/academic-activities-done.component';
import {SgaOldComponent} from './sga-old.component';
import {SummonedVsAttendeesComponent} from './summoned-vs-attendees/summoned-vs-attendees.component';
import {DiscentesActivitiesComponent} from './discentes-activities/discentes-activities.component';
import {DiscentesMulticriterioComponent} from './discentes-multicriterio/discentes-multicriterio.component';
import {RecordHoursComponent} from './record-hours/record-hours.component';
import {AcademicRecordComponent} from './academic-record/academic-record.component';
import {IndividualSurveysComponent} from './individual-surveys/individual-surveys.component';
import {SurveysDoneComponent} from './surveys-done/surveys-done.component';
import {MulticriterioGeneralComponent} from './multicriterio-general/multicriterio-general.component';

const routes: Routes = [{
  path: '',
  component: SgaOldComponent,
  children: [
    {
      path: 'academic-activities-done',
      component: AcademicActivitiesDoneComponent,
    },
    {
      path: 'summoned-vs-attendees',
      component: SummonedVsAttendeesComponent,
    },
    {
      path: 'discentes-activities',
      component: DiscentesActivitiesComponent,
    },
    {
      path: 'discentes-multicriterio',
      component: DiscentesMulticriterioComponent,
    },
    {
      path: 'record-hours',
      component: RecordHoursComponent,
    },
    {
      path: 'academic-record',
      component: AcademicRecordComponent,
    },
    {
      path: 'individual-surveys',
      component: IndividualSurveysComponent,
    },
    {
      path: 'surveys-done',
      component: SurveysDoneComponent,
    },
    {
      path: 'multicriterio-general',
      component: MulticriterioGeneralComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SgaOldRoutingModule {
}
