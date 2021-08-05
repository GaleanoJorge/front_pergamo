import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAComponent } from './dashboardA/dashboardA.component';

const routes: Routes = [{
  path: '',
  component: DashboardAComponent,
  children: [
    {
      path: 'dashboardA',
      component: DashboardAComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
