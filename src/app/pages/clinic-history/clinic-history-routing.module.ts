import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackListComponent } from './background/back-list.component'; 
import { ChRecordListComponent } from './ch-record-list/ch-record-list.component';
import { ClinicHistoryListComponent } from './clinic-history-list/clinic-history-list.component';
import { ClinicHistoryNursingListComponent } from './clinic-history-nursing-list/clinic-history-nursing-list.component';
import { ClinicHistoryComponent } from './clinic-history.component';
import { EntryClinicHistoryComponent } from './entry-clinic-history/entry-clinic-history.component';
import { RespiratoryTherapyListComponent } from './respiratory-therapy-list/respiratory-therapy-list.component';
import { FormChScalesComponent } from './scales/form-ch-scales/form-ch-scales.component';


const routes: Routes = [{
  path: '',
  component: ClinicHistoryComponent,
  children: [
    {
      path: 'clinic-history-list/:id/:id2',
      component: ClinicHistoryListComponent,
    },

    {
      path: 'clinic-history-nursing-list/:id/:id2',
      component: ClinicHistoryNursingListComponent,
    },

    { path: 'respiratory-therapy-list/:id/:id2',
      component: RespiratoryTherapyListComponent,
    },
    {
      path: 'ch-record-list/:id/:id2',
      component: ChRecordListComponent,
    },
    {
      path: 'entry-clinic-history/:user_id',
      component: EntryClinicHistoryComponent,
    },
    {
      path: 'back-list/:id',
      component: BackListComponent,
    },
    {
      path: 'form-ch-scales/:id',
      component: FormChScalesComponent,
    }
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicHistoryRoutingModule {
}
