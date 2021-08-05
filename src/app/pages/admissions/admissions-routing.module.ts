import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdmissionsComponent} from './admissions.component';
import {TeachersComponent} from './teachers/teachers.component';
import {StudentsComponent} from './students/students.component';
import {CourseComponent} from './students/course/course.component';
import {CourseMassiveComponent} from './students-massive/course-massive/course-massive.component';
import {StudentsMassiveComponent} from './students-massive/students-massive.component';

const routes: Routes = [{
  path: '',
  component: AdmissionsComponent,
  children: [
    {
      path: 'teachers',
      component: TeachersComponent,
    },
    {
      path: 'students',
      component: StudentsComponent,
    },
    {
      path: 'students/course/:course_id',
      component: CourseComponent,
    },
    {
      path: 'students-massive',
      component: StudentsMassiveComponent,
    },
    {
      path: 'students-massive/course-massive/:course_id',
      component: CourseMassiveComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmissionsRoutingModule {
}
