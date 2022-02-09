import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdmissionsComponent} from './admissions.component';
import {AdmissionsListComponent} from './admissions-list/admissions-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { FormPatientComponent } from './form-patient/form-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { AdmissionsPatientComponent } from './admissions-patient/admissions-patient.component';
import { BedManagementComponent } from './bed-management/bed-management.component';
import { PatientDataComponent } from './patient-data/patient-data.component';


const routes: Routes = [{
  path: '',
  component: AdmissionsComponent,
  children: [
    {
      path: 'list',
      component: AdmissionsListComponent,
    },
    {
      path: 'patient/create',
      component: FormPatientComponent,
    },
    {
      path: 'patient/:id/edit',
      component: EditPatientComponent,
    },
    {
      path: 'admissions-patient/:user_id',
      component: AdmissionsPatientComponent,
    },
    {
      path: 'bed-management',
      component: BedManagementComponent,
    },
    {
      path: 'patient-data/:admissions_id',
      component: PatientDataComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmissionsRoutingModule {
}
