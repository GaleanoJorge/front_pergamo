import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PadComplementaryComponent} from './pad-complementary.component';
import {PadComplementaryListComponent} from './pad-list/pad-complementary-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { ManagementPlanComponent } from './management-plan/management-plan.component';


const routes: Routes = [{
  path: '',
  component: PadComplementaryComponent,
  children: [
    {
      path: 'list',
      component: PadComplementaryListComponent,
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
export class PadComplementaryRoutingModule {
}
