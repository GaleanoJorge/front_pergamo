import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SurveyComponent} from './survey.component';
import {SurveysComponent} from './surveys/surveys.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import {ScheduledSurveysComponent} from './scheduled-surveys/scheduled-surveys.component';
import {CreateSurveysComponent} from './surveys/create-surveys/create-surveys.component';
import {EditSurveysComponent} from './surveys/edit-surveys/edit-surveys.component';
import {CreateScheduledSurveysComponent} from './scheduled-surveys/create-scheduled-surveys/create-scheduled-surveys.component';
import {EditScheduledSurveysComponent} from './scheduled-surveys/edit-scheduled-surveys/edit-scheduled-surveys.component';
import {SurveyRenderComponent} from './survey-render/survey-render.component';
import {MySurveysComponent} from './my-surveys/my-surveys.component';
import {SummarySurveysComponent} from './summary-surveys/summary-surveys.component';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [{
  path: '',
  component: SurveyComponent,
  children: [
    {
      path: 'surveys',
      component: SurveysComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'plantillas-encuesta.read'},
    },
    {
      path: 'surveys/create',
      component: CreateSurveysComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'plantillas-encuesta.create'},
    },
    {
      path: 'surveys/:id/edit',
      component: EditSurveysComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'plantillas-encuesta.update'},
    },
    {
      path: 'surveys/:survey_id/scheduled-surveys',
      component: ScheduledSurveysComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'encuestas-programadas.read'},
    },
    {
      path: 'surveys/:survey_id/scheduled-surveys/create',
      component: CreateScheduledSurveysComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'encuestas-programadas.read'},
    },
    {
      path: 'surveys/:survey_id/scheduled-surveys/:id/edit',
      component: EditScheduledSurveysComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'encuestas-programadas.read'},
    },
    {
      path: 'scheduled-surveys',
      component: ScheduledSurveysComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'encuestas-programadas.read'},
    },
    {
      path: 'my-surveys',
      component: MySurveysComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'mis-encuestas.read'},
    },
    {
      path: 'surveys/:id',
      component: SurveyRenderComponent,
      data: {},
    },
    {
      path: 'summary-surveys/:id',
      component: SummarySurveysComponent,
      data: {permission: 'encuestas-programadas.read'},
    },
    {
      path: 'statistics',
      component: StatisticsComponent,
      data: {permission: 'encuestas-programadas.read'},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule {
}
