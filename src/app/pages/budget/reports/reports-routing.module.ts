import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportsComponent} from './reports.component';
import {PermissionsGuard} from '../../../guards/permissions.guard';
import {GeneralComponent} from './general/general.component';
import {AllocatedBudgetComponent} from './allocated-budget/allocated-budget.component';
import {ConsolidatedLogisticComponent} from './consolidated-logistic/consolidated-logistic.component';
import {ConsolidatedTransportComponent} from './consolidated-transport/consolidated-transport.component';
import {SummaryLogisticComponent} from './summary-logistic/summary-logistic.component';
import {SummaryTransportComponent} from './summary-transport/summary-transport.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path: 'allocated-budget',
      component: AllocatedBudgetComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-reportes.read'},
    },
    {
      path: 'consolidated-logistic',
      component: ConsolidatedLogisticComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-reportes.read'},
    },
    {
      path: 'consolidated-transport',
      component: ConsolidatedTransportComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-reportes.read'},
    },
    {
      path: 'summary-logistic',
      component: SummaryLogisticComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-reportes.read'},
    },
    {
      path: 'summary-transport',
      component: SummaryTransportComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-reportes.read'},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {
}
