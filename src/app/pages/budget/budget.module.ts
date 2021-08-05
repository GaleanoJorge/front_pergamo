import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {ConceptBaseComponent} from './concept-base/concept-base.component';
import {BudgetComponent} from './budget.component';
import {BudgetRoutingModule} from './budget-routing.module';
import {PagesModule} from '../pages.module';
import {
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbFormFieldModule,
  NbIconModule,
  NbInputModule, NbPopoverModule,
  NbSelectModule,
  NbSpinnerModule, NbTabsetModule,
} from '@nebular/theme';
import {FormConceptBaseComponent} from './concept-base/form-concept-base/form-concept-base.component';
import {CreateConceptBaseComponent} from './concept-base/create-concept-base/create-concept-base.component';
import {EditConceptBaseComponent} from './concept-base/edit-concept-base/edit-concept-base.component';
import {ActionsConceptBaseComponent} from './concept-base/actions-concept-base.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConceptComponent} from './concept/concept.component';
import {FormConceptComponent} from './concept/form-concept/form-concept.component';
import {ActionsConceptComponent} from './concept/actions-concept.component';
import {BudgetParameterizationComponent} from './budget-parameterization/budget-parameterization.component';
import {FormBudgetParameterizationComponent} from './budget-parameterization/form-budget-parameterization/form-budget-parameterization.component';
import {ContratcsComponent} from './contratcs/contratcs.component';
import {FormContratcsComponent} from './contratcs/form-contratcs/form-contratcs.component';
import {CreateContratcsComponent} from './contratcs/create-contratcs/create-contratcs.component';
import {EditContratcsComponent} from './contratcs/edit-contratcs/edit-contratcs.component';
import {ActionsContractsComponent} from './contratcs/actions-contracts.component';
import {PaymentsComponent} from './payments/payments.component';
import {FormPaymentsComponent} from './payments/form-payments/form-payments.component';
import {ActionsPaymentComponent} from './payments/actions-payment.component';
import {DateFormatPipe} from '../../pipe/date-format.pipe';
import {PreliminaryBudgetComponent} from './preliminary-budget/preliminary-budget.component';
import {FormPreliminaryBudgetComponent} from './preliminary-budget/form-preliminary-budget/form-preliminary-budget.component';
import {CreatePreliminaryBudgetComponent} from './preliminary-budget/create-preliminary-budget/create-preliminary-budget.component';
import {EditPreliminaryBudgetComponent} from './preliminary-budget/edit-preliminary-budget/edit-preliminary-budget.component';
import {EventsDayComponent} from './events-day/events-day.component';
import {FormEventsDayComponent} from './events-day/form-events-day/form-events-day.component';
import {ActionsPreliminaryBudgetComponent} from './preliminary-budget/actions-preliminary-budget.component';
import {EventsConceptsComponent} from './events-concepts/events-concepts.component';
import {FormEventsConceptsComponent} from './events-concepts/form-events-concepts/form-events-concepts.component';
import {EventsConceptsSpecialComponent} from './events-concepts-special/events-concepts-special.component';
import {FormEventsConceptsSpecialComponent} from './events-concepts-special/form-events-concepts-special/form-events-concepts-special.component';
import {EventsHistotyStatusComponent} from './events-histoty-status/events-histoty-status.component';
import {FormEventsHistoryStatusComponent} from './events-histoty-status/form-events-history-status/form-events-history-status.component';
import {ContractsEventsComponent} from './contratcs/contracts-events/contracts-events.component';
import { ChangeValidityComponent } from './change-validity/change-validity.component';
import { ReconcileTicketsComponent } from './reconcile-tickets/reconcile-tickets.component';

@NgModule({
  declarations: [
    BudgetComponent,
    ConceptBaseComponent,
    FormConceptBaseComponent,
    CreateConceptBaseComponent,
    EditConceptBaseComponent,
    ActionsConceptBaseComponent,
    ConceptComponent,
    FormConceptComponent,
    ActionsConceptComponent,
    BudgetParameterizationComponent,
    FormBudgetParameterizationComponent,
    ContratcsComponent,
    FormContratcsComponent,
    CreateContratcsComponent,
    EditContratcsComponent,
    ActionsContractsComponent,
    PaymentsComponent,
    FormPaymentsComponent,
    ActionsPaymentComponent,
    PreliminaryBudgetComponent,
    FormPreliminaryBudgetComponent,
    CreatePreliminaryBudgetComponent,
    EditPreliminaryBudgetComponent,
    EventsDayComponent,
    FormEventsDayComponent,
    ActionsPreliminaryBudgetComponent,
    EventsConceptsComponent,
    FormEventsConceptsComponent,
    EventsConceptsSpecialComponent,
    FormEventsConceptsSpecialComponent,
    EventsHistotyStatusComponent,
    FormEventsHistoryStatusComponent,
    ContractsEventsComponent,
    ChangeValidityComponent,
    ReconcileTicketsComponent,
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    PagesModule,
    NbButtonModule,
    NbIconModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule,
    NbSpinnerModule,
    NbCardModule,
    FormsModule,
    NbFormFieldModule,
    NbTabsetModule,
    NbPopoverModule,
    NbCheckboxModule,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe,
  ],
})
export class BudgetModule {
}
