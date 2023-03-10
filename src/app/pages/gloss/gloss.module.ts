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
import {GlossRoutingModule} from './gloss-routing.module';
import {GlossComponent} from './gloss.component';
import {PagesModule} from '../pages.module';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {GlossListComponent} from './gloss-list/gloss-list.component';
import {FormGlossComponent} from './gloss-list/form-gloss/form-gloss.component';
import {Actions2Component} from './gloss-list/actions.component';
import { ActionsSemaphoreComponent } from './gloss-list/actions-semaphore.component';
import { Actions3Component } from './gloss-conciliations/actions.component';
import { ConciliationsListComponent } from './gloss-conciliations/conciliations-list.component';
import { FormConciliationsComponent } from './gloss-conciliations/form-gloss/form-conciliations.component';




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
    GlossRoutingModule,
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
    GlossComponent,
    GlossListComponent,
    ConciliationsListComponent,
    FormConciliationsComponent,
    FormGlossComponent,
    Actions2Component,
    Actions3Component,
    ActionsSemaphoreComponent
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class GlossModule {
}
