import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AccountReceivableComponent} from './account-receivable..component';
import {AccountReceivableListComponent} from './account-receivable-list/account-receivable-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { BillUserActivityComponent } from './bill-user-activity/bill-user-activity.component';


const routes: Routes = [{
  path: '',
  component: AccountReceivableComponent,
  children: [
    {
      path: 'list',
      component: AccountReceivableListComponent,
    },
    {
      path: 'bill-user-activity/:id',
      component: BillUserActivityComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountReceivableRoutingModule {
}