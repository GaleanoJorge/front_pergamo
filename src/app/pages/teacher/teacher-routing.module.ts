import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherComponent } from './teacher.component';
import { TeachersComponent } from './teachers/teachers.component';
import {CreateTeacherComponent} from './teachers/create-teacher/create-teacher.component';
import {EditTeacherComponent} from './teachers/edit-teacher/edit-teacher.component';
import {HistoryTeacherComponent} from './teachers/history-teacher/history-teacher.component';
import {MySesionComponent} from './my-sesion/my-sesion.component';
import {PermissionsGuard} from '../../guards/permissions.guard';

const routes: Routes = [{
  path: '',
  component: TeacherComponent,
  children: [
    {
      path: 'teachers',
      component: TeachersComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'formadores.read'},
    },
    {
      path: 'teachers/create',
      component: CreateTeacherComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'formadores.create'},
    },
    {
      path: 'teachers/:id/edit',
      component: EditTeacherComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'formadores.update'},
    },
    {
      path: 'teachers/history-teacher/:user_id',
      component: HistoryTeacherComponent,
    },
    {
      path: 'teachers/mysession',
      component: MySesionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {
}
