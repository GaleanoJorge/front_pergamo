import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ReportComponent} from './report.component';
import {GeneralComponent} from './general/general.component';
import {CompetitionComponent} from './competition/competition.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {ScoreComponent} from './score/score.component';

const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [
    {
      path: 'general',
      component: GeneralComponent,
    },
    {
      path: 'competition',
      component: CompetitionComponent,
    },
    {
      path: 'delivery',
      component: DeliveryComponent,
    },
    {
      path: 'score',
      component: ScoreComponent,
    },
    {
      path: 'sga-old',
      loadChildren: () => import('./sga-old/sga-old.module')
        .then(m => m.SgaOldModule),
    },
    {
      path: 'sga',
      loadChildren: () => import('./sga/sga.module')
        .then(m => m.SgaModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {
}
