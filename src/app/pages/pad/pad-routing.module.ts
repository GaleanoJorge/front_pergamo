import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PadComponent} from './pad.component';
import {PadListComponent} from './pad-list/pad-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { ManagementPlanComponent } from './management-plan/management-plan.component';


const routes: Routes = [{
  path: '',
  component: PadComponent,
  children: [
    {
      path: 'list',
      component: PadListComponent,
    },
    {
      path: 'management-plan/:id',
      component: ManagementPlanComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PadRoutingModule {
}
