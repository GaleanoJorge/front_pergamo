import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {StudentComponent} from './student.component';
import {StudentsComponent} from './students/students.component';
import {FormStudentsComponent} from './students/form-students/form-students.component';
import {EditStudentComponent} from './students/edit-student/edit-student.component';
import {HistoryStudentComponent} from './students/history-student/history-student.component';
import {MyHistoryComponent} from './my-history/my-history.component';
import {MyCoursesComponent} from './my-courses/my-courses.component';
import {MySesionComponent} from './my-sesion/my-sesion.component';
import {PermissionsGuard} from '../../guards/permissions.guard';

const routes: Routes = [{
  path: '',
  component: StudentComponent,
  children: [
    {
      path: 'students',
      component: StudentsComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'discentes.read'},
    },
    {
      path: 'students/create',
      component: FormStudentsComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'discentes.create'},
    },
    {
      path: 'students/:id/edit',
      component: EditStudentComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'discentes.update'},
    },
    {
      path: 'students/history-student/:user_id',
      component: HistoryStudentComponent,
    },
    {
      path: 'mycourses',
      component: MyCoursesComponent,
    },
    {
    path: 'myhistory',
    component: MyHistoryComponent,
  },
    {
      path: 'mysession/:id',
      component: MySesionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {
}
