import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PahComponent} from './pah.component';
import {PahListComponent} from './pah-list/pah-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { InstanceAdmissionComponent } from './instance-admission/instance-admission.component';


const routes: Routes = [{
  path: '',
  component: PahComponent,
  children: [
    {
      path: 'list',
      component: PahListComponent,
    },
    {
      path: 'instance-admission/:admission_id',
      component: InstanceAdmissionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PahRoutingModule {
}
