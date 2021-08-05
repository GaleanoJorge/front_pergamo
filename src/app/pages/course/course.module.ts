import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
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
  NbDatepickerModule, NbSpinnerModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';
import {CourseRoutingModule} from './course-routing.module';
import {CourseComponent} from './course.component';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {CourseListComponent} from './course-list/course-list.component';
import {FormCourseComponent} from './course-list/form-course/form-course.component';
import {FormCourseApprovalComponent} from './course-approval/form-course-approval/form-course-approval.component';
import { StatsApprovalComponent } from './course-approval/stats-approval.component';
import { CourseApprovalComponent } from './course-approval/course-approval.component';
import {Actions2Component} from './course-list/actions.component';
import {Status2FieldComponent} from './course-list/status-field.component';
import {GroupsComponent} from './groups/groups.component';
import {FormGroupComponent} from './groups/form-group/form-group.component';
import {FormSessionComponent} from './groups/form-session/form-session.component';
import {ActionsSessionComponent} from './groups/actions-session.component';
import { CompetencesActivitiesComponent } from './competences-activities/competences-activities.component';
import {LmsIntegrationModule} from '../lms-integration/lms-integration.module';

@NgModule({
  imports: [
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSelectModule,
    CourseRoutingModule,
    NbAlertModule,
    PagesModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    LmsIntegrationModule,
    NbSpinnerModule,
  ],
  declarations: [
    CourseComponent,
    CourseListComponent,
    FormCourseComponent,
    Actions2Component,
    FormCourseApprovalComponent,
    StatsApprovalComponent,
    CourseApprovalComponent,
    Status2FieldComponent,
    GroupsComponent,
    FormGroupComponent,
    FormSessionComponent,
    ActionsSessionComponent,
    CompetencesActivitiesComponent,
  ],
  providers: [
    DateFormatPipe,
  ],
})
export class CourseModule {
}
