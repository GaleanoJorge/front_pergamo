import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AccountReceivableComponent} from './account-receivable..component';
import {AccountReceivableListComponent} from './account-receivable-list/account-receivable-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';


const routes: Routes = [{
  path: '',
  component: AccountReceivableComponent,
  children: [
    {
      path: 'list',
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