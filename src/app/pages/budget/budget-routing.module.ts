import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BudgetComponent} from './budget.component';
import {ConceptBaseComponent} from './concept-base/concept-base.component';
import {CreateConceptBaseComponent} from './concept-base/create-concept-base/create-concept-base.component';
import {EditConceptBaseComponent} from './concept-base/edit-concept-base/edit-concept-base.component';
import {BudgetParameterizationComponent} from './budget-parameterization/budget-parameterization.component';
import {PermissionsGuard} from '../../guards/permissions.guard';
import {ContratcsComponent} from './contratcs/contratcs.component';
import {CreateContratcsComponent} from './contratcs/create-contratcs/create-contratcs.component';
import {EditContratcsComponent} from './contratcs/edit-contratcs/edit-contratcs.component';
import {PreliminaryBudgetComponent} from './preliminary-budget/preliminary-budget.component';
import {CreatePreliminaryBudgetComponent} from './preliminary-budget/create-preliminary-budget/create-preliminary-budget.component';
import {EditPreliminaryBudgetComponent} from './preliminary-budget/edit-preliminary-budget/edit-preliminary-budget.component';
import {ChangeValidityComponent} from './change-validity/change-validity.component';
import {ReconcileTicketsComponent} from './reconcile-tickets/reconcile-tickets.component';

const routes: Routes = [{
  path: '',
  component: BudgetComponent,
  children: [
    {
      path: 'parameterization',
      component: BudgetParameterizationComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-parametrizacion.create'},
    },
    {
      path: 'concepts',
      component: ConceptBaseComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-conceptos.read'},
    },
    {
      path: 'concepts/create',
      component: CreateConceptBaseComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-conceptos.create'},
    },
    {
      path: 'concepts/:id/edit',
      component: EditConceptBaseComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-conceptos.update'},
    },
    {
      path: 'contracts',
      component: ContratcsComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-contratos.read'},
    },
    {
      path: 'contracts/create',
      component: CreateContratcsComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-contratos.create'},
    },
    {
      path: 'contracts/:id/edit',
      component: EditContratcsComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-contratos.update'},
    },
    {
      path: 'preliminary',
      component: PreliminaryBudgetComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-preliminar.read'},
    },
    {
      path: 'preliminary/create',
      component: CreatePreliminaryBudgetComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-preliminar.create'},
    },
    {
      path: 'preliminary/:id/edit',
      component: EditPreliminaryBudgetComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-preliminar.update'},
    },
    {
      path: 'executed',
      loadChildren: () => import('./executed-budget/executed-budget.module')
        .then(m => m.ExecutedBudgetModule),
    },
    {
      path: 'reports',
      loadChildren: () => import('./reports/reports.module')
        .then(m => m.ReportsModule),
    },
    {
      path: 'change-validity',
      component: ChangeValidityComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'presupuesto-preliminar.read'},
    },
    {
      path: 'reconcile-tickets',
      component: ReconcileTicketsComponent,
      canActivate: [PermissionsGuard],
      data: {permission: 'conciliar-tiquetes.read'},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetRoutingModule {
}
