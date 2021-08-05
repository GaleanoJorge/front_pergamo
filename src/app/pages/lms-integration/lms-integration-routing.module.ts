import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataIntegrationComponent} from './data-integration/data-integration.component';
import {ProcessDetailActivityComponent} from './process-detail-activity/process-detail-activity.component';
import {ProcessDetailComponent} from './process-detail/process-detail.component';
import {ProcessRubricComponent} from './process-rubric/process-rubric.component';
import {ProcessDetailEnrollComponent} from './process-detail-enroll/process-detail-enroll.component';
import {ProcessCompetencesComponent} from './process-competences/process-competences.component';
import {CompetencesActivityComponent} from './competences-activity/competences-activity.component';
import {ProcessEnrollComponent} from './process-enroll/process-enroll.component';

const routes: Routes = [
  {
    path: '',
    component: DataIntegrationComponent,
  },
  {
    path: 'process/:id/detail',
    component: ProcessDetailComponent,
  },
  {
    path: 'process/:process_id/detail/:process_detail_id/activities',
    component: ProcessDetailActivityComponent,
  },
  {
    path: 'process/:process_id/detail/:process_detail_id/activities/:activity_id/rubrics',
    component: ProcessRubricComponent,
  },
  {
    path: 'process/:process_id/detail/:process_detail_id/activities/:activity_id/competences',
    component: ProcessCompetencesComponent,
  },
  {
    path: 'process/:process_id/detail/:process_detail_id/activities/:activity_id/competences/:competence_id',
    component: CompetencesActivityComponent,
  },
  {
    path: 'process/:id/enroll',
    component: ProcessEnrollComponent,
  },
  {
    path: 'process/:process_id/enroll/detail',
    component: ProcessDetailEnrollComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmsIntegrationRoutingModule {
}
