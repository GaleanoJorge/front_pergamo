import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule, NbAlertModule, NbSelectModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';
import {ReportRoutingModule} from './report-routing.module';
import {ReportComponent} from './report.component';
import {GeneralComponent} from './general/general.component';
import {Report1Component} from './report1/report1.component';
import {Report2Component} from './report2/report2.component';
import {Report3Component} from './report3/report3.component';
import {Report4Component} from './report4/report4.component';
import {Report5Component} from './report5/report5.component';
import {PagesModule} from '../pages.module';
import {NgxEchartsModule} from 'ngx-echarts';
import {Report6Component} from './report6/report6.component';
import {Report7Component} from './report7/report7.component';
import {Report8Component} from './report8/report8.component';
import {Report9Component} from './report9/report9.component';
import {Report10Component} from './report10/report10.component';
import {Report11Component} from './report11/report11.component';
import {Report11BComponent} from './report11-b/report11-b.component';
import {Report13Component} from './report13/report13.component';
import {Report15Component} from './report15/report15.component';
import {Report16Component} from './report16/report16.component';
import {Report16bComponent} from './report16b/report16b.component';
import {ScoreComponent} from './score/score.component';
import {CompetitionComponent} from './competition/competition.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {GoalsComponent} from './goals/goals.component';
import {FuidComponent} from './fuid/fuid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbAlertModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSelectModule,
    ReportRoutingModule,
    NgxEchartsModule,
    PagesModule,
  ],
  declarations: [
    ReportComponent,
    GeneralComponent,
    CompetitionComponent,
    DeliveryComponent,
    ScoreComponent,
    Report1Component,
    Report2Component,
    Report3Component,
    Report4Component,
    Report5Component,
    Report6Component,
    Report7Component,
    Report8Component,
    Report9Component,
    Report10Component,
    Report11Component,
    Report11BComponent,
    Report13Component,
    Report15Component,
    Report16Component,
    Report16bComponent,
    GoalsComponent,
    FuidComponent,
  ],
  exports: [
    ReportComponent,
    GeneralComponent,
    CompetitionComponent,
    DeliveryComponent,
    ScoreComponent,
    Report1Component,
    Report2Component,
    Report3Component,
    Report4Component,
    Report5Component,
    Report6Component,
    Report7Component,
    Report8Component,
    Report9Component,
    Report10Component,
    Report11Component,
    Report11BComponent,
    Report13Component,
    Report15Component,
    Report16Component,
    Report16bComponent,
  ],
})
export class ReportModule {
}
