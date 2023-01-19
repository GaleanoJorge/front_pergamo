import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PermissionsGuard} from '../../guards/permissions.guard';
import { MedicalRecordsListComponent } from './medical-records-list/medical-records-list.component';
import { MedicalRecordsComponent } from './medical-records.component';


const routes: Routes = [{
  path: '',
  component: MedicalRecordsComponent,
  children: [
    {
      path: 'list',
      component: MedicalRecordsListComponent,
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
export class MedicalRecordsRoutingModule {
}
