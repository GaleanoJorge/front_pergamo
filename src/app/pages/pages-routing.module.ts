import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { PermissionsGuard } from '../guards/permissions.guard';
import {ChangePasswordGuard} from '../guards/change-password.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [ChangePasswordGuard],
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule),
      canActivate: [PermissionsGuard],
      data: { permission: 'dashboard.read' },
    },
    {
      path: 'contract',
      loadChildren: () => import('./contract/contract.module')
        .then(m => m.ContractModule),
    },
    {
      path: 'admissions',
      loadChildren: () => import('./admissions/admissions.module')
        .then(m => m.AdmissionsModule),
    },
    {
      path: 'gloss',
      loadChildren: () => import('./gloss/gloss.module')
        .then(m => m.GlossModule),
        canActivate: [PermissionsGuard],
      data: { permission: 'gloss.read' }
    },
    {
      path: 'setting',
      loadChildren: () => import('./setting/setting.module')
        .then(m => m.SettingModule),
    },
    {
      path: 'file-explorer',
      loadChildren: () => import('./file-explorer/file-explorer.module')
        .then(m => m.FileExplorerModule),
    },
    {
      path: 'personal-information',
      component: PersonalInformationComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
