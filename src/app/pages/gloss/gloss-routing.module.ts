import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GlossComponent} from './gloss.component';
import {GlossListComponent} from './gloss-list/gloss-list.component';
import {ServicesBriefcaseComponent} from './services-briefcase/services-briefcase.component';
import {BriefcaseComponent} from './briefcase/briefcase.component';
import {DetailServicesComponent} from './detail-services/detail-services.component';
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
    // {
    //   path: 'services-briefcase/:id',
    //   component: ServicesBriefcaseComponent,
    // },
    // {
    //   path: 'briefcase/:id',
    //   component: BriefcaseComponent,
    // },
    // {
    //   path: 'detail-services/:id',
    //   component: DetailServicesComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlossRoutingModule {
}
