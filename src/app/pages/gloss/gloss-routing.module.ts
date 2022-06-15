import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GlossComponent} from './gloss.component';
import {GlossListComponent} from './gloss-list/gloss-list.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { ConciliationsListComponent } from './gloss-conciliations/conciliations-list.component';


const routes: Routes = [{
  path: '',
  component: GlossComponent,
  children: [
    {
      path: 'list',
      component: GlossListComponent,
    },
    {
      path: 'conciliations',
      component: ConciliationsListComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlossRoutingModule {
}
