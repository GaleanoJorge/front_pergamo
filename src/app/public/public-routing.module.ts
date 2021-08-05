import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { SuccessRegisterComponent } from './register/success-register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FindEmailComponent } from './find-email/find-email.component';
import { DownloadCertificateComponent } from './download-certificate/download-certificate.component';
import { RegisterAssistanceComponent } from './register-assistance/register-assistance.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'inscriptions',
        loadChildren: () => import('./inscriptions/inscriptions.module')
          .then(m => m.InscriptionsModule),
      },
      {
        path: 'register/:role',
        component: RegisterComponent,
      },
      {
        path: 'register/:role/success',
        component: SuccessRegisterComponent,
      },
      {
        path: 'password/reset/:token',
        component: ResetPasswordComponent,
      },
      {
        path: 'find-email',
        component: FindEmailComponent
      },
      {
        path: 'download-certificate',
        component: DownloadCertificateComponent
      },
      {
        path: 'register-assistance/:session_id/:urg_id',
        component: RegisterAssistanceComponent
      
      },
      {
        path: 'validate-login',
        component: AuthenticationComponent
      
      },
      {
        path: 'register-confirmation/:token',
        component: ConfirmationComponent
      
      },
      {
        path: 'reset-password',
        component: RecoveryPasswordComponent
      
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {
}
