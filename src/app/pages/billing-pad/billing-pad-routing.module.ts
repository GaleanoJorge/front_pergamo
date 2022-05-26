import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BillingPadComponent} from './billing-pad.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { BillingAdmissionComponent } from './billing-admission/billing-admission.component';
import { BillingPadListComponent } from './billing-pad-list/billing-pad-list.component';
import { BillingPadProcedureComponent } from './billing-pad-procedure/billing-pad-procedure.component';


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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingPadRoutingModule {
}
