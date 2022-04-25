import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackListComponent } from './background/back-list.component'; 
import { ChRecordListComponent } from './ch-record-list/ch-record-list.component';
import { ClinicHistoryListComponent } from './clinic-history-list/clinic-history-list.component';
import { ClinicHistoryComponent } from './clinic-history.component';
import { EntryClinicHistoryComponent } from './entry-clinic-history/entry-clinic-history.component';


const routes: Routes = [{
  path: '',
  component: ClinicHistoryComponent,
  children: [
    {
      path: 'clinic-history-list/:id/:id2',
      component: ClinicHistoryListComponent,
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
    }
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicHistoryRoutingModule {
}
