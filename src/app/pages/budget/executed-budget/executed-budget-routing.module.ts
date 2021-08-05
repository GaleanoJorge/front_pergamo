import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExecutedBudgetComponent} from './executed-budget.component';
import {PermissionsGuard} from '../../../guards/permissions.guard';
import {ExecutedBudgetListComponent} from './executed-budget-list/executed-budget-list.component';
import {LogisticExecutedBudgetComponent} from './logistic-executed-budget/logistic-executed-budget.component';
import {TransportExecutedBudgetComponent} from './transport-executed-budget/transport-executed-budget.component';
import {DetailTicketsComponent} from './transport-executed-budget/detail-tickets/detail-tickets.component';

const routes: Routes = [{
  path: '',
  component: ExecutedBudgetComponent,
  children: [
    {
      path: 'list',
      component: ExecutedBudgetListComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-ejecutado.read'},
    },
    {
      path: ':id/logistic',
      component: LogisticExecutedBudgetComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-ejecutado.read'},
    },
    {
      path: ':id/transport',
      component: TransportExecutedBudgetComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-ejecutado.read'},
    },
    {
      path: ':id/detailt-tickets',
      component: DetailTicketsComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-ejecutado.read'},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecutedBudgetRoutingModule {
}
