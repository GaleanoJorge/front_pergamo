import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PreBillingPadComponent} from './billing-pad.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { PreBillingAdmissionComponent } from './pre-billing-admission/pre-billing-admission.component';
import { PreBillingPadListComponent } from './billing-pad-list/pre-billing-pad-list.component';


const routes: Routes = [{
  path: '',
  component: PreBillingPadComponent,
  children: [
    {
      path: 'list',
      component: PreBillingPadListComponent,
    },
    {
      path: 'pre-billing-admission/:id',
      component: PreBillingAdmissionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreBillingPadRoutingModule {
}
