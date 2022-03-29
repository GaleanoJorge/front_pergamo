import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdmissionsComponent} from './admissions.component';
import {AdmissionsListComponent} from './admissions-list/admissions-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { FormPatientComponent } from './form-patient/form-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { AdmissionsPatientComponent } from './admissions-patient/admissions-patient.component';
import { BedManagementComponent } from './bed-management/bed-management.component';


const routes: Routes = [{
  path: '',
  component: AdmissionsComponent,
  children: [
    {
      path: 'list',
      component: AdmissionsListComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'roles.read'},
    },
    {
      path: 'patient/create',
      component: FormPatientComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'roles.create'},
    },
    {
      path: 'patient/:id/edit',
      component: EditPatientComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'roles.update'},
    },
    {
      path: 'admissions-patient/:user_id',
      component: AdmissionsPatientComponent,
    },
    {
      path: 'bed-management',
      component: BedManagementComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmissionsRoutingModule {
}
