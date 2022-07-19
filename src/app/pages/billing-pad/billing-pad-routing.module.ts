import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BillingPadComponent} from './billing-pad.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { BillingAdmissionComponent } from './billing-admission/billing-admission.component';
import { BillingPadListComponent } from './billing-pad-list/billing-pad-list.component';
import { BillingPadProcedureComponent } from './billing-pad-procedure/billing-pad-procedure.component';
import { BillingPgpComponent } from './billing-pgp/billing-pgp.component';
import { BillingPadBriefcaseComponent } from './billing-pad-briefcase/billing-pad-briefcase.component';
import { BillingAdmissionsPadListComponent } from './billing-pad-admissions-list/billing-admissions-pad-list.component';


const routes: Routes = [{
  path: '',
  component: BillingPadComponent,
  children: [
    {
      path: 'list',
      component: BillingPadListComponent,
    },
    {
      path: 'billing-admission/:id',
      component: BillingAdmissionComponent,
    },
    {
      path: 'billing-pad-procedure/:admission_id/:billing_id',
      component: BillingPadProcedureComponent,
    },
    {
      path: 'billing-pgp/:contract_id',
      component: BillingPgpComponent,
    },
    {
      path: 'billing-pad-briefcase/:contract_id',
      component: BillingPadBriefcaseComponent,
    },
    {
      path: 'billing-pad-admissions/:briefcase_id',
      component: BillingAdmissionsPadListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingPadRoutingModule {
}
