import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CertificatesComponent } from './certificate.components';
import { CertificatesFormComponent } from './certificates/certificates-form/certificates-form.component';
import { CertificatesListComponent } from './certificates/certificates-list/certificates.component';
import { GenerateListComponent } from './certificates/generate-list/generate-list.component';
import { PaperformatFormComponent } from './paperformat/paperformat-form/paperformat-form.component';
import { PaperformatListComponent } from './paperformat/paperformat-list/paperformat-list.component';
import { SignatureFormComponent } from './signature/signature-form/signature-form.component';
import { SignatureListComponent } from './signature/signature-list/signature-list.component';
import { TemplatesFormComponent } from './templates/templates-form/templates-form.component';
import { TemplatesListComponent } from './templates/templates-list/templates-list.component';

const routes: Routes = [{
  path: '',
  component: CertificatesComponent,
  children: [
    {
      path: '',
      component: CertificatesListComponent,
    },
    {
      path: 'register',
      component: CertificatesFormComponent,
    },
    {
      path: 'edit/:id',
      component: CertificatesFormComponent,
    },
    {
      path: 'generate/:id',
      component: GenerateListComponent,
    },
    {
      path: 'paperformat',
      component: PaperformatListComponent,
    },
    {
      path: 'paperformat/register',
      component: PaperformatFormComponent,
    },
    {
      path: 'paperformat/edit/:id',
      component: PaperformatFormComponent,
    },
    {
      path: 'signatures',
      component: SignatureListComponent,
    },
    {
      path: 'signatures/register',
      component: SignatureFormComponent,
    },
    {
      path: 'signatures/edit/:id',
      component: SignatureFormComponent,
    },
    {
      path: 'templates',
      component: TemplatesListComponent,
    },
    {
      path: 'templates/register',
      component: TemplatesFormComponent,
    },
    {
      path: 'templates/edit/:id',
      component: TemplatesFormComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificateRoutingModule {
}
