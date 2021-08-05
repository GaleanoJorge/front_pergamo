import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CourseComponent} from './course.component';
import {CourseListComponent} from './course-list/course-list.component';
import {GroupsComponent} from './groups/groups.component';
import {CourseApprovalComponent} from './course-approval/course-approval.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import {CompetencesActivitiesComponent} from './competences-activities/competences-activities.component';

const routes: Routes = [{
  path: '',
  component: CourseComponent,
  children: [
    {
      path: 'list',
      component: CourseListComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'cursos.read'},
    },
    {
      path: 'list/:id',
      component: CourseListComponent,
    },
    {
      path: ':id/groups',
      component: GroupsComponent,
    },
    {
      path: ':id/courseapproval',
      component: CourseApprovalComponent,
    },
    {
      path: ':id/competences',
      component: CompetencesActivitiesComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {
}
