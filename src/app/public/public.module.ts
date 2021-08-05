import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { ThemeModule } from '../@theme/theme.module';
import { CardProgramComponent } from './inscriptions/card-program.component';
import {
  NbAccordionModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { RegisterComponent } from './register/register.component';
import { PagesModule } from '../pages/pages.module';
import { SuccessRegisterComponent } from './register/success-register.component';
import { DateFormatPipe } from '../pipe/date-format.pipe';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FindEmailComponent } from './find-email/find-email.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DownloadCertificateComponent } from './download-certificate/download-certificate.component';
import { RegisterAssistanceComponent } from './register-assistance/register-assistance.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    PublicComponent,
    CardProgramComponent,
    RegisterComponent,
    SuccessRegisterComponent,
    ResetPasswordComponent,
    FindEmailComponent,
    DownloadCertificateComponent,
    RegisterAssistanceComponent,
    ConfirmationComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PublicRoutingModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    PagesModule,
    NbListModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    NbAccordionModule,
    NbAlertModule,
    NbInputModule,
  ],
  providers: [DateFormatPipe]
})
export class PublicModule {
}
