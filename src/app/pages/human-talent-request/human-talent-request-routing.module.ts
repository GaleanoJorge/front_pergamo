import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HumanTalentRequestComponent} from './human-talent-request.component';
import {HumanTalentRequestListComponent} from './human-talent-request-list/human-talent-request-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';



const routes: Routes = [{
  path: '',
  component: HumanTalentRequestComponent,
  children: [
    {
      path: 'list',
      component: HumanTalentRequestListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumanTalentRequestRoutingModule {
}