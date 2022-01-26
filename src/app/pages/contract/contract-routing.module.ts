import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContractComponent} from './contract.component';
import {ContractListComponent} from './contract-list/contract-list.component';
import {FileContractComponent} from './file-contract/file-contract.component';
import {ServicesBriefcaseComponent} from './services-briefcase/services-briefcase.component';
import {BriefcaseComponent} from './briefcase/briefcase.component';
import {DetailServicesComponent} from './detail-services/detail-services.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { PolicyComponent } from './policy/policy.component';


const routes: Routes = [{
  path: '',
  component: ContractComponent,
  children: [
    {
      path: 'list',
      component: ContractListComponent,
    },
    {
      path: 'file-contract/:id',
      component: FileContractComponent,
    },
    {
      path: 'services-briefcase/:id',
      component: ServicesBriefcaseComponent,
    },
    {
      path: 'briefcase/:id',
      component: BriefcaseComponent,
    },
    {
      path: 'detail-services/:id',
      component: DetailServicesComponent,
    },
    {
      path: 'policy/:id',
      component: PolicyComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {
}
