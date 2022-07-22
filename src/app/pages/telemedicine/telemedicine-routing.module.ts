import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TelemedicineComponent} from './telemedicine.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { TelemedicineListComponent } from './telemedicine-list/telemedicine-list.component';


const routes: Routes = [{
  path: '',
  component: TelemedicineComponent,
  children: [
    {
      path: 'list',
      component: TelemedicineListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelemedicineRoutingModule {
}
