import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
  NbLayoutModule,
} from '@nebular/theme';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardAComponent } from './dashboardA/dashboardA.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PagesModule } from '../pages.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbLayoutModule,
    ThemeModule,
    DashboardRoutingModule,
    NgxEchartsModule,
    PagesModule
  ],
  declarations: [
    DashboardComponent,
    DashboardAComponent,
  ],
  providers: [],
})
export class DashboardModule { }
