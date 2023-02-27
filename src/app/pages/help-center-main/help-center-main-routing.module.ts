import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpCenterComponent } from './help-center/help-center.component';

const routes: Routes = [{
  path: '',
  component: HelpCenterComponent,
  children: [
    {
      path: 'help-center',
      component: HelpCenterComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpCenterMainRoutingModule {
}