import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
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
  NbInputModule,
  NbSelectModule,
  NbAlertModule,
  NbDialogModule,
  NbIconModule,
  NbCheckboxModule,
  NbRadioModule,
  NbTooltipModule,
  NbDatepickerModule, NbSpinnerModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {HumanTalentRequestComponent} from './human-talent-request.component';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {HumanTalentRequestListComponent} from './human-talent-request-list/human-talent-request-list.component';
import {FormHumanTalentRequestComponent} from './human-talent-request-list/form-human-talent-request/form-human-talent-request.component';
import {Actions2Component} from './human-talent-request-list/actions.component';
import { ActionsSemaphoreComponent } from './human-talent-request-list/actions-semaphore.component';
import { HumanTalentRequestRoutingModule } from './human-talent-request-routing.module';







@NgModule({
  imports: [
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbRadioModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbTooltipModule,
    NbListModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSelectModule,
    HumanTalentRequestRoutingModule,
    NbAlertModule,
    PagesModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    NbSpinnerModule,
  ],
  declarations: [
    HumanTalentRequestComponent,
    HumanTalentRequestListComponent,
    FormHumanTalentRequestComponent,
    Actions2Component,
    ActionsSemaphoreComponent,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class HumanTalentRequestModule {
}
