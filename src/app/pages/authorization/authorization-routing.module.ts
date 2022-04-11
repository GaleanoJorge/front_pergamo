import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthorizationComponent} from './authorization.component';
import {AuthorizationListComponent} from './authorization-list/authorization-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';


const routes: Routes = [{
  path: '',
  component: AuthorizationComponent,
  children: [
    {
      path: 'list',
      component: AuthorizationListComponent,
    },
    // {
    //   path: 'management-plan/:id',
    //   component: ManagementPlanComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {
}
