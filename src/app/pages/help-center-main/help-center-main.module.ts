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

import { NgxEchartsModule } from 'ngx-echarts';
import { PagesModule } from '../pages.module';
import { HelpCenterMainRoutingModule } from './help-center-main-routing.module';
import { HelpCenterMainComponent } from './help-center-main.component';
import { HelpCenterComponent } from './help-center/help-center.component';

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
    HelpCenterMainRoutingModule,
    NgxEchartsModule,
    PagesModule
  ],
  declarations: [
    HelpCenterMainComponent,
    HelpCenterComponent,
  ],
  providers: [],
})
export class HelpCenterModule { }
