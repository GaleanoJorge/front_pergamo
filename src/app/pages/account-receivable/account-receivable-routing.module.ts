import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AccountReceivableComponent} from './account-receivable..component';
import {AccountReceivableListComponent} from './account-receivable-list/account-receivable-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { BillUserActivityComponent } from './bill-user-activity/bill-user-activity.component';
import { AccountPatientComponent } from './account-patient/account-patient.component';
import { BillUserActivityPatientComponent } from './bill-user-activity-patient/bill-user-activity-patient.component';


const routes: Routes = [{
  path: '',
  component: AccountReceivableComponent,
  children: [
    {
      path: 'list',
      component: AccountReceivableListComponent,
    },
    {
      path: 'account-patient',
      component: AccountPatientComponent,
    },
    {
      path: 'bill-user-activity/:id',
      component: BillUserActivityComponent,
    },
    {
      path: 'bill-user-activity-patient/:id',
      component: BillUserActivityPatientComponent,
    },
    {
      path: 'billings-user-activity/:id',
      component: AccountReceivableListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountReceivableRoutingModule {
}