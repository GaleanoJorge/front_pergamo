import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import { AdmissionsComponent } from './admissions.component';
import { RouterModule } from '@angular/router';
import { AdmissionsRoutingModule } from './admissions-routing.module';
import { PagesModule } from '../pages.module';
import { CardAdmissionsComponent } from './teachers/card-admissions.component';
import {
  NbAutocompleteModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule, NbSelectModule,
  NbSpinnerModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { ObservationsComponent } from './observations-component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StudentsComponent } from './students/students.component';
import { StudentsMassiveComponent } from './students-massive/students-massive.component';
import { CourseComponent } from './students/course/course.component';
import { CourseMassiveComponent } from './students-massive/course-massive/course-massive.component';
import { CardStudentsAdmissionsComponent } from './students/course/card-students-admissions.component';
import { StatsComponent } from './students/stats.component';
import { StatsMassiveComponent } from './students-massive/stats-massive.component';
import { CheckboxUser } from './students-massive/course-massive/checkbox-user';
import { InscriptionStatusAdmissionsComponent } from './students-massive/course-massive/inscription-status-admissions.component';


@NgModule({
  declarations: [
    TeachersComponent,
    AdmissionsComponent,
    CardAdmissionsComponent,
    ObservationsComponent,
    StudentsComponent,
    StudentsMassiveComponent,
    CourseComponent,
    CourseMassiveComponent,
    CardStudentsAdmissionsComponent,
    StatsComponent,
    StatsMassiveComponent,
    CheckboxUser,
    InscriptionStatusAdmissionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdmissionsRoutingModule,
    PagesModule,
    NbCardModule,
    NbButtonModule,
    NbBadgeModule,
    NbInputModule,
    NbCheckboxModule,
    FormsModule,
    NbSpinnerModule,
    NbAutocompleteModule,
    NbSelectModule,
    ReactiveFormsModule
  ],
})
export class AdmissionsModule {
}