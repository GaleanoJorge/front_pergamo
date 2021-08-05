import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SurveyComponent} from './survey.component';
import {SurveysComponent} from './surveys/surveys.component';
import {RouterModule} from '@angular/router';
import {SurveyRoutingModule} from './survey-routing.module';
import {ScheduledSurveysComponent} from './scheduled-surveys/scheduled-surveys.component';
import {PagesModule} from '../pages.module';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule, NbSpinnerModule,
  NbToggleModule,
  NbRadioModule,
  NbCheckboxModule,
  NbAlertModule,
  NbAccordionModule
} from '@nebular/theme';
import {FormSurveysComponent} from './surveys/form-surveys/form-surveys.component';
import {CreateSurveysComponent} from './surveys/create-surveys/create-surveys.component';
import {EditSurveysComponent} from './surveys/edit-surveys/edit-surveys.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SectionsSurveysComponent} from './sections-surveys/sections-surveys.component';
import {FormSectionSurveyComponent} from './sections-surveys/form-section-survey/form-section-survey.component';
import {ActionsComponent} from './surveys/actions.component';
import {ActionsSectionComponent} from './sections-surveys/actions.component';
import {OrderComponent} from './sections-surveys/order.component';
import {FormScheduledSurveysComponent} from './scheduled-surveys/form-scheduled-surveys/form-scheduled-surveys.component';
import {CreateScheduledSurveysComponent} from './scheduled-surveys/create-scheduled-surveys/create-scheduled-surveys.component';
import {EditScheduledSurveysComponent} from './scheduled-surveys/edit-scheduled-surveys/edit-scheduled-surveys.component';
import {ActionsScheduledComponent} from './scheduled-surveys/actions-scheduled.component';
import { SurveyRenderComponent } from './survey-render/survey-render.component';
import { SectionsBaseComponent } from '../components/sections-base/sections-base.component';
import { MySurveysComponent } from './my-surveys/my-surveys.component';
import { ActionsListComponent } from './my-surveys/actions-list.component';
import { SummarySurveysComponent } from './summary-surveys/summary-surveys.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveysComponent,
    ScheduledSurveysComponent,
    FormSurveysComponent,
    CreateSurveysComponent,
    EditSurveysComponent,
    SectionsSurveysComponent,
    FormSectionSurveyComponent,
    ActionsComponent,
    ActionsSectionComponent,
    OrderComponent,
    FormScheduledSurveysComponent,
    CreateScheduledSurveysComponent,
    EditScheduledSurveysComponent,
    ActionsScheduledComponent,
    SurveyRenderComponent,
    SectionsBaseComponent,
    MySurveysComponent,
    ActionsListComponent,
    SummarySurveysComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SurveyRoutingModule,
    PagesModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbToggleModule,
    NbIconModule,
    NbSpinnerModule,
    NbRadioModule,
    NbCheckboxModule,
    NbLayoutModule,
    NbAlertModule,
    NbAccordionModule
  ],
})
export class SurveyModule {
}
