import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PadComponent} from './pad.component';
import {PadListComponent} from './pad-list/pad-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { ManagementPlanComponent } from './management-plan/management-plan.component';
import { AssignedManagementPlanComponent } from './assigned-management-plan/assigned-management-plan.component';
import { PharmacyApplicationComponent } from './management-plan/pharmacy-application/pharmacy-application.component';


const routes: Routes = [{
  path: '',
  component: PadComponent,
  children: [
    {
      path: 'list',
      component: PadListComponent,
    },
    {
      path: 'management-plan/:id/:user',
      component: ManagementPlanComponent,
    },
    {
      path: 'assigned-management-plan/:management_id/:user',
      component: AssignedManagementPlanComponent,
    },
    {
      path: 'management-plan/pharmacy-application',
      component: PharmacyApplicationComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PadRoutingModule {
}
