import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExecutedBudgetListComponent} from './executed-budget-list/executed-budget-list.component';
import {ExecutedBudgetComponent} from './executed-budget.component';
import {RouterModule} from '@angular/router';
import {ExecutedBudgetRoutingModule} from './executed-budget-routing.module';
import {PagesModule} from '../../pages.module';
import {
  NbButtonModule,
  NbCardModule, NbFormFieldModule,
  NbIconModule,
  NbInputModule, NbPopoverModule,
  NbSelectModule, NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme';
import {ActionsExecutedBudgetComponent} from './executed-budget-list/actions-executed-budget.component';
import {FormExecutedBudgetComponent} from './form-executed-budget/form-executed-budget.component';
import {LogisticExecutedBudgetComponent} from './logistic-executed-budget/logistic-executed-budget.component';
import {TransportExecutedBudgetComponent} from './transport-executed-budget/transport-executed-budget.component';
import {EventsConceptExecutedComponent} from './events-concept-executed/events-concept-executed.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventsConceptSpecialExecutedComponent} from './events-concept-special-executed/events-concept-special-executed.component';
import {EventsConceptExtrasComponent} from './events-concept-extras/events-concept-extras.component';
import {FormEventsConceptExtrasComponent} from './events-concept-extras/form-events-concept-extras/form-events-concept-extras.component';
import {ResumeEventExecutedComponent} from './resume-event-executed/resume-event-executed.component';
import {TransportExtrasBudgetComponent} from './transport-executed-budget/transport-extras-budget/transport-extras-budget.component';
import {FormTransportExtrasBudgetComponent} from './transport-executed-budget/transport-extras-budget/form-transport-extras-budget/form-transport-extras-budget.component';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';
import { DetailTicketsComponent } from './transport-executed-budget/detail-tickets/detail-tickets.component';

@NgModule({
  declarations: [
    ExecutedBudgetListComponent,
    ExecutedBudgetComponent,
    ActionsExecutedBudgetComponent,
    FormExecutedBudgetComponent,
    LogisticExecutedBudgetComponent,
    TransportExecutedBudgetComponent,
    EventsConceptExecutedComponent,
    EventsConceptSpecialExecutedComponent,
    EventsConceptExtrasComponent,
    FormEventsConceptExtrasComponent,
    ResumeEventExecutedComponent,
    TransportExtrasBudgetComponent,
    FormTransportExtrasBudgetComponent,
    DetailTicketsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ExecutedBudgetRoutingModule,
    PagesModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbCardModule,
    NbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbPopoverModule,
  ],
  providers: [
    DateFormatPipe,
  ],
})
export class ExecutedBudgetModule {
}
