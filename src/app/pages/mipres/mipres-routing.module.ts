import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MipresComponent} from './mipres.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import { MipresListComponent } from './mipres-list/mipres-list.component';


const routes: Routes = [{
  path: '',
  component: MipresComponent,
  children: [
    {
      path: 'list',
      component: MipresListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MipresRoutingModule {
}
