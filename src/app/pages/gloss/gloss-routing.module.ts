import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GlossComponent} from './gloss.component';
import {GlossListComponent} from './gloss-list/gloss-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';


const routes: Routes = [{
  path: '',
  component: GlossComponent,
  children: [
    {
      path: 'list',
      component: GlossListComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'roles.read'},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlossRoutingModule {
}
