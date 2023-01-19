import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ReferenceComponent} from './reference.component';
import {ReferenceListComponent} from './reference-list/reference-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';



const routes: Routes = [{
  path: '',
  component: ReferenceComponent,
  children: [
    {
      path: 'list',
      component: ReferenceListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferenceRoutingModule {
}