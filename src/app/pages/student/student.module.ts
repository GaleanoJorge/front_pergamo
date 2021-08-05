import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  NbInputModule, NbSelectModule, NbRadioModule, NbIconModule, NbSpinnerModule, NbPopoverModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentsComponent } from './students/students.component';
import { PagesModule } from '../pages.module';
import { FormStudentsComponent } from './students/form-students/form-students.component';
import { ActionsComponent } from './students/actions.component';
import { EditStudentComponent } from './students/edit-student/edit-student.component';
import { HistoryStudentComponent } from './students/history-student/history-student.component';
import { MyHistoryComponent } from './my-history/my-history.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { ActionsComponentCourses } from './my-courses/actionscourses.component';
import { MySesionComponent } from './my-sesion/my-sesion.component';
import { ActionsComponentSesion } from './my-sesion/actionssesion.component';
import { InfoComponentCourses } from './my-courses/infocourses.component';
import { DateFormatPipe } from '../../pipe/date-format.pipe';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    StudentRoutingModule,
    NbInputModule,
    PagesModule,
    Ng2SmartTableModule,
    NbPopoverModule,
    NbSelectModule,
    NbRadioModule,
    NbIconModule,
    NbSpinnerModule,
  ],
  declarations: [
    StudentComponent,
    StudentsComponent,
    FormStudentsComponent,
    ActionsComponent,
    EditStudentComponent,
    MyCoursesComponent,
    MyHistoryComponent,
    HistoryStudentComponent,
    ActionsComponentCourses,
    InfoComponentCourses,
    ActionsComponentSesion,
    MySesionComponent,
  ],
  providers: [
    DateFormatPipe
  ],
  exports: [],
})
export class StudentModule {
}
