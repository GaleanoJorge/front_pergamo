import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PahComponent} from './pah.component';
import {PahListComponent} from './pah-list/pah-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { InstanceAdmissionComponent } from './instance-admission/instance-admission.component';
import { InterconsultationComponent } from './interconsultation/interconsultation.component';


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
    {
      path: 'interconsultation/:id/:id2/:id3',
      component: InterconsultationComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PahRoutingModule {
}
