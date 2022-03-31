import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChRecordListComponent } from './ch-record-list/ch-record-list.component';
import { ClinicHistoryListComponent } from './clinic-history-list/clinic-history-list.component';
import { ClinicHistoryComponent } from './clinic-history.component';
import { EntryClinicHistoryComponent } from './entry-clinic-history/entry-clinic-history.component';
import { SignsListComponent } from './signs/signs.component';


const routes: Routes = [{
  path: '',
  component: ClinicHistoryComponent,
  children: [
    {
      path: 'clinic-history-list/:id',
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
      path: 'form-signs/:id',
      component: SignsListComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicHistoryRoutingModule {
}
