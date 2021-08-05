import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule, NbInputModule, NbSelectModule, NbAlertModule, NbDialogModule, NbIconModule, NbToggleModule, NbLayoutModule, NbSpinnerModule, NbCheckboxModule, NbDatepickerModule,
} from '@nebular/theme';
import { CommonModule } from '@angular/common';

import { LmsIntegrationRoutingModule } from './lms-integration-routing.module';
import { DataIntegrationComponent } from './data-integration/data-integration.component';
import { ThemeModule } from '../../@theme/theme.module';
import { PagesModule } from '../pages.module';
import { DateFormatPipe } from '../../pipe/date-format.pipe';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { TableLmsIntegrationComponent } from './components/table-lms-integration/table-lms-integration.component';
import { ActionsTableLmsIntegrationComponent } from './components/actions-table/actions-table-lms-integration.component';
import { ProcessDetailComponent } from './process-detail/process-detail.component';
import { ProcessDetailActivityComponent } from './process-detail-activity/process-detail-activity.component';
import { ProcessRubricComponent } from './process-rubric/process-rubric.component';
import { DetailsTableComponent } from './components/details-table/details-table.component';
import { ProcessDetailEnrollComponent } from './process-detail-enroll/process-detail-enroll.component';
import { ProcessCompetencesComponent } from './process-competences/process-competences.component';
import { CompetencesActivityComponent } from './competences-activity/competences-activity.component';
import { ProcessEnrollComponent } from './process-enroll/process-enroll.component';


@NgModule({
    //declarations: [DataIntegrationComponent, ActionsTableLmsIntegrationComponent, ProcessDetailComponent, ProcessDetailActivityComponent, ProcessRubricComponent, ProcessDetailEnrollComponent],
    declarations: [DataIntegrationComponent, ActionsTableLmsIntegrationComponent, TableLmsIntegrationComponent, ProcessDetailComponent, ProcessDetailActivityComponent, ProcessRubricComponent, DetailsTableComponent, ProcessDetailEnrollComponent, ProcessCompetencesComponent, CompetencesActivityComponent, ProcessEnrollComponent],

    imports: [
        NbInputModule,
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
        NbTabsetModule,
        NbRouteTabsetModule,
        NbStepperModule,
        NbCardModule,
        NbButtonModule,
        NbListModule,
        NbListModule,
        NbAccordionModule,
        NbUserModule,
        NbSelectModule,
        NbAlertModule,
        NbDialogModule.forRoot(),
        NbCheckboxModule,
        Ng2SmartTableModule,
        NbIconModule,
        NbDatepickerModule,
        CommonModule,
        LmsIntegrationRoutingModule,
        PagesModule,
        NbEvaIconsModule,
        NbLayoutModule,
        NbSpinnerModule,
    ],
    providers: [
        DateFormatPipe,
    ],
  exports: [
    DetailsTableComponent,
    TableLmsIntegrationComponent,
  ],
})
export class LmsIntegrationModule { }
