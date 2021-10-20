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
      path: 'category',
      loadChildren: () => import('./category/category.module')
        .then(m => m.CategoryModule),
    },
    {
      path: 'student',
      loadChildren: () => import('./student/student.module')
        .then(m => m.StudentModule),
    },
    {
      path: 'teacher',
      loadChildren: () => import('./teacher/teacher.module')
        .then(m => m.TeacherModule),
    },
    {
      path: 'course',
      loadChildren: () => import('./course/course.module')
        .then(m => m.CourseModule),
    },
    {
      path: 'contract',
      loadChildren: () => import('./contract/contract.module')
        .then(m => m.ContractModule),
    },
    {
      path: 'educational-institution',
      loadChildren: () => import('./educational-institution-main/educational-institution-main.module')
        .then(m => m.EducationalInstitutionMainModule),
    },
    {
      path: 'report',
      loadChildren: () => import('./report/report.module')
        .then(m => m.ReportModule),
    },
    {
      path: 'setting',
      loadChildren: () => import('./setting/setting.module')
        .then(m => m.SettingModule),
    },
    {
      path: 'educationalconfiguration',
      loadChildren: () => import('./educational-configuration/educational-configuration.module')
        .then(m => m.EducationalConfigurationModule),
    },
    {
      path: 'pollconfiguration',
      loadChildren: () => import('./poll-configuration/poll-configuration.module')
        .then(m => m.PollConfigurationModule),
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
      path: 'admissions',
      loadChildren: () => import('./admissions/admissions.module')
        .then(m => m.AdmissionsModule),
    },
    {
      path: 'assistance-session',
      loadChildren: () => import('./assistance-session/assistance-session.module')
        .then(m => m.AssistanceSessionModule),
    },
    {
      path: 'survey',
      loadChildren: () => import('./survey/survey.module')
        .then(m => m.SurveyModule),
    },
    {
      path: 'certificates',
      loadChildren: () => import('./certificate/certificate.module')
        .then(m => m.CertificateModule),
    },
    {
      path: 'budget',
      loadChildren: () => import('./budget/budget.module')
        .then(m => m.BudgetModule),
    },
    {
      path: 'lms-integration',
      loadChildren: () => import('./lms-integration/lms-integration.module')
        .then(m => m.LmsIntegrationModule),
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
