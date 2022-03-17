import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChRecordListComponent } from './ch-record-list/ch-record-list.component';
import { ClinicHistoryListComponent } from './clinic-history-list/clinic-history-list.component';
import { ClinicHistoryComponent } from './clinic-history.component';
import { EntryClinicHistoryComponent } from './entry-clinic-history/entry-clinic-history.component';


const routes: Routes = [{
  path: '',
  component: ClinicHistoryComponent,
  children: [
    {
      path: 'clinic-history-list/:id',
      component: ClinicHistoryListComponent,

    },
    {
      path: 'ch-record-list/:id',
      component: ChRecordListComponent,

    },
    {
      path: 'entry-clinic-history/:user_id',
      component: EntryClinicHistoryComponent,

    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicHistoryRoutingModule {
}
