import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {AllocatedBudgetComponent} from './allocated-budget/allocated-budget.component';
import {ReportsComponent} from './reports.component';
import {GeneralComponent} from './general/general.component';
import {ReportsRoutingModule} from './reports-routing.module';
import {PagesModule} from '../../pages.module';
import {NbRouteTabsetModule, NbTabsetModule} from '@nebular/theme';
import {ConsolidatedLogisticComponent} from './consolidated-logistic/consolidated-logistic.component';
import {ConsolidatedTransportComponent} from './consolidated-transport/consolidated-transport.component';
import {SummaryLogisticComponent} from './summary-logistic/summary-logistic.component';
import {SummaryTransportComponent} from './summary-transport/summary-transport.component';
import {LinkSubprogramsComponent} from './link-subprograms.component';

@NgModule({
  declarations: [
    ReportsComponent,
    AllocatedBudgetComponent,
    GeneralComponent,
    ConsolidatedLogisticComponent,
    ConsolidatedTransportComponent,
    SummaryLogisticComponent,
    SummaryTransportComponent,
    LinkSubprogramsComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    PagesModule,
    NbTabsetModule,
    NbRouteTabsetModule,
  ],
  providers: [
    CurrencyPipe,
  ],
})
export class ReportsModule {
}
