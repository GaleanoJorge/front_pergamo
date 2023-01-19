import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DietsComponent} from './diets.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { DietsListComponent } from './diets-list/diets-list.component';


const routes: Routes = [{
  path: '',
  component: DietsComponent,
  children: [
    {
      path: 'list',
      component: DietsListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietsRoutingModule {
}
