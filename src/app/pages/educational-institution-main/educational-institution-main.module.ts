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
  NbTabsetModule,
  NbUserModule,
  NbInputModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { EducationalInstitutionMainRoutingModule } from './educational-institution-main-routing.module';
import { EducationalInstitutionMainComponent } from './educational-institution-main.component';
import { EducationalInstitutionListComponent } from './educational-institution-list/educational-institution-list-component';
import { PagesModule } from '../pages.module';

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
    EducationalInstitutionMainRoutingModule,
    NbInputModule,
    PagesModule,
    Ng2SmartTableModule
  ],
  declarations: [
    EducationalInstitutionMainComponent,
    EducationalInstitutionListComponent
  ],
  providers: [],
})
export class EducationalInstitutionMainModule { }
