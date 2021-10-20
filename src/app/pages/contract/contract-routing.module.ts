import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContractComponent} from './contract.component';
import {ContractListComponent} from './contract-list/contract-list.component';
import {FileContractComponent} from './file-contract/file-contract.component';
import {ServicesBriefcaseComponent} from './services-briefcase/services-briefcase.component';
import {PermissionsGuard} from '../../guards/permissions.guard';


const routes: Routes = [{
  path: '',
  component: ContractComponent,
  children: [
    {
      path: 'list',
      component: ContractListComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'roles.read'},
    },
    {
      path: 'file-contract/:id',
      component: FileContractComponent,
    },
    {
      path: 'services-briefcase/:id',
      component: ServicesBriefcaseComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {
}
