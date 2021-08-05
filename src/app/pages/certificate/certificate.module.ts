import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateRoutingModule } from './certificate-routing.module';
import { RouterModule } from '@angular/router';

import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule, NbInputModule, NbSelectModule, NbAlertModule, NbDialogModule, NbIconModule, NbToggleModule, NbLayoutModule, NbSpinnerModule, NbCheckboxModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';

import { CertificatesComponent } from './certificate.components';

import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { CanvasComponent } from '../components/canvas/canvas.component'
import { DragulaModule } from 'ng2-dragula';
import { ColorCompactModule } from 'ngx-color/compact';
import { AngularDraggableModule } from 'angular2-draggable';

import { CertificatesListComponent } from './certificates/certificates-list/certificates.component';
import { SignatureListComponent } from './signature/signature-list/signature-list.component';
import { SignatureFormComponent } from './signature/signature-form/signature-form.component';
import { ListElementsComponent } from '../components/list-elements/list-elements.component';
import { PaperformatFormComponent } from './paperformat/paperformat-form/paperformat-form.component';
import { PaperformatListComponent } from './paperformat/paperformat-list/paperformat-list.component';
import { CertificatesFormComponent } from './certificates/certificates-form/certificates-form.component';
import { TemplatesFormComponent } from './templates/templates-form/templates-form.component';
import { TemplatesListComponent } from './templates/templates-list/templates-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from '../pages.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GenerateListComponent } from './certificates/generate-list/generate-list.component';
import { ActionsCertificateComponent } from './certificates/generate-list/actions-certificate.component';
import { SelectCerfiticateComponent } from './certificates/generate-list/select-certificate.component';


@NgModule({
  declarations: [
    CertificatesComponent,
    SignatureListComponent,
    CertificatesListComponent,
    SignatureFormComponent,
    ListElementsComponent,
    PaperformatFormComponent,
    PaperformatListComponent,
    CertificatesFormComponent,
    TemplatesFormComponent,
    TemplatesListComponent,
    CanvasComponent,
    GenerateListComponent,
    ActionsCertificateComponent,
    SelectCerfiticateComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    CertificateRoutingModule,
    NbRouteTabsetModule,
    NbButtonModule,
    NbListModule,
    NbCardModule,
    NbStepperModule,
    NbInputModule,
    NbSelectModule,
    NbAlertModule,
    NbDialogModule,
    NbIconModule,
    NbToggleModule,
    NbLayoutModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbUserModule,
    NbAccordionModule,
    NbTabsetModule,
    RxReactiveFormsModule,
    DragulaModule.forRoot(),
    ColorCompactModule,
    AngularDraggableModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    Ng2SmartTableModule
  ]
})
export class CertificateModule { }
