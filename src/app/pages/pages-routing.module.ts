import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { PermissionsGuard } from '../guards/permissions.guard';
import { ChangePasswordGuard } from '../guards/change-password.guard';

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
      path: 'help-center',
      loadChildren: () => import('./help-center-main/help-center-main.module')
        .then(m => m.HelpCenterModule),
    },
    {
      path: 'help-center/administrative',
      loadChildren: () => import('./help-center-main/help-center-main.module')
        .then(m => m.HelpCenterModule),
    },
    {
      path: 'help-center/assistencial',
      loadChildren: () => import('./help-center-main/help-center-main.module')
        .then(m => m.HelpCenterModule),
    },
    {
      path: 'help-center/dashboard2',
      loadChildren: () => import('./help-center-main/help-center-main.module')
        .then(m => m.HelpCenterModule),
    },
    {
      path: 'help-center/finance',
      loadChildren: () => import('./help-center-main/help-center-main.module')
        .then(m => m.HelpCenterModule),
    },
    {
      path: 'help-center/logistic',
      loadChildren: () => import('./help-center-main/help-center-main.module')
        .then(m => m.HelpCenterModule),
    },
    {
      path: 'help-center/setting2',
      loadChildren: () => import('./help-center-main/help-center-main.module')
        .then(m => m.HelpCenterModule),
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
      path: 'clinic-history',
      loadChildren: () => import('./clinic-history/clinic-history.module')
        .then(m => m.ClinicHistoryModule),
    },
    {
      path: 'gloss',
      loadChildren: () => import('./gloss/gloss.module')
        .then(m => m.GlossModule),
      canActivate: [PermissionsGuard],
      data: { permission: 'gloss.read' }
    },
    {
      path: 'account-receivable',
      loadChildren: () => import('./account-receivable/account-receivable.module')
        .then(m => m.AccountReceivableModule),
    },
    {
      path: 'human-talent-request',
      loadChildren: () => import('./human-talent-request/human-talent-request.module')
        .then(m => m.HumanTalentRequestModule),
    },
    {
      path: 'reference',
      loadChildren: () => import('./reference/reference.module')
        .then(m => m.ReferenceModule),
    },
    {
      path: 'pad',
      loadChildren: () => import('./pad/pad.module')
        .then(m => m.PadModule),
    },
    {
      path: 'pah',
      loadChildren: () => import('./pah/pah.module')
        .then(m => m.PahModule),
    },
    {
      path: 'diets',
      loadChildren: () => import('./diets/diets.module')
        .then(m => m.DietsModule),
    },
    {
      path: 'billing-pad',
      loadChildren: () => import('./billing-pad/billing-pad.module')
        .then(m => m.BillingPadModule),
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
    // {
    //   path: 'mipres',
    //   loadChildren: () => import('./mipres/mipres.module')
    //     .then(m => m.MipresModule),
    //     canActivate: [PermissionsGuard],
    //   data: { permission: 'mipres.read' }
    // },
    {
      path: 'pad-complementary',
      loadChildren: () => import('./pad-complementary/pad-complementary.module')
        .then(m => m.PadComplementaryModule),
    },
    {
      path: 'authorization',
      loadChildren: () => import('./authorization/authorization.module')
        .then(m => m.AuthorizationModule),
    },
    {
      path: 'medical-records',
      loadChildren: () => import('./medical-records/medical-records.module')
        .then(m => m.MedicalRecordsModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'pharmacy',
      loadChildren: () => import('./pharmacy/pharmacy.module')
        .then(m => m.PharmacyModule),
    },
    {
      path: 'scheduling',
      loadChildren: () => import('./scheduling/scheduling.module')
        .then(m => m.SchedulingModule),
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
