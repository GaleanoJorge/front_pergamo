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

import { HelpCenterRoutingModule } from './help-center-routing.module';
import { HelpCenterComponent } from './help-center.component';
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
    HelpCenterRoutingModule,
    NgxEchartsModule,
    PagesModule
  ],
  declarations: [
    HelpCenterComponent,
    HelpCenterComponent,
  ],
  providers: [],
})
export class HelpCenterModule { }
