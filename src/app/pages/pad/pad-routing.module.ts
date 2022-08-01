import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PadComponent} from './pad.component';
import {PadListComponent} from './pad-list/pad-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { ManagementPlanComponent } from './management-plan/management-plan.component';
import { AssignedManagementPlanComponent } from './assigned-management-plan/assigned-management-plan.component';
import { PharmacyApplicationComponent } from './management-plan/pharmacy-application/pharmacy-application.component';
import { ConsentsInformedComponent } from './consents-informed/consents-informed.component';
import { AdmissionsPatientPadComponent } from './admissions-patient/admissions-patient.component';


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
      path: 'consents-informed/:id/:user',
      component: ConsentsInformedComponent,
    },
    {
      path: 'assigned-management-plan/:management_id/:user',
      component: AssignedManagementPlanComponent,
    },
    {
      path: 'management-plan/pharmacy-application',
      component: PharmacyApplicationComponent,
    },
    {
      path: 'admissions-patient-pad/:patient_id/:user_id',
      component: AdmissionsPatientPadComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PadRoutingModule {
}
