import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbTabsetModule,
    NbUserModule,
    NbInputModule, NbSelectModule, NbRadioModule, NbIconModule, NbSpinnerModule, NbPopoverModule, NbToggleModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';
import {AdmissionsRoutingModule} from './admissions-routing.module';
import {AdmissionsComponent} from './admissions.component';
import {AdmissionsListComponent} from './admissions-list/admissions-list.component';
import {PagesModule} from '../pages.module';
import {FormPatientComponent} from './form-patient/form-patient.component';
import {ActionsComponent} from './admissions-list/actions.component';
import {EditPatientComponent} from './edit-patient/edit-patient.component';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import { AdmissionsPatientComponent } from './admissions-patient/admissions-patient.component';
import { FormAdmissionsPatientComponent } from './admissions-patient/form-admissions-patient/form-admissions-patient.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
        NbTabsetModule,
        NbRouteTabsetModule,
        NbStepperModule,
        NbCardModule,
        NbButtonModule,
        NbListModule,
        NbAccordionModule,
        NbUserModule,
        AdmissionsRoutingModule,
        NbInputModule,
        PagesModule,
        Ng2SmartTableModule,
        NbPopoverModule,
        NbSelectModule,
        NbRadioModule,
        NbIconModule,
        NbSpinnerModule,
        NbToggleModule,
    ],
  declarations: [
    AdmissionsPatientComponent,
    FormAdmissionsPatientComponent,
    AdmissionsComponent,
    AdmissionsListComponent,
    FormPatientComponent,
    ActionsComponent,
    EditPatientComponent,
  ],
  providers: [
    DateFormatPipe,
  ],
  exports: [],
})
export class AdmissionsModule {
}
