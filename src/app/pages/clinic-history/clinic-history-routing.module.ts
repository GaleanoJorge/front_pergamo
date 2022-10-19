import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackListComponent } from './background/back-list.component'; 
import { ChNutritionListComponent } from './ch-nutrition-list/ch-nutrition-list.component';
import { PsychologyListComponent } from './ch-psychology/psychology-list/psychology-list.component';
import { ChRecordListComponent } from './ch-record-list/ch-record-list.component';
import { SocialWorkListComponent } from './ch-social-work/social-work-list/social-work-list.component';
import { ClinicHistoryLanguageListComponent } from './clinic-history-language-list/clinic-history-language-list.component';
import { ClinicHistoryListComponent } from './clinic-history-list/clinic-history-list.component';
import { ClinicHistoryNursingListComponent } from './clinic-history-nursing-list/clinic-history-nursing-list.component';
import { ClinicHistoryComponent } from './clinic-history.component';
import { ClinicHistoryOccupationalTherapy } from './entry-clinic-history-occupational-therapy/ch-occupational-therapy.component';
import { ClinicHistoryPhysicTherapy } from './entry-clinic-history-physical-therapy/ch-physic-therapy.component';
import { EntryClinicHistoryComponent } from './entry-clinic-history/entry-clinic-history.component';
import { RespiratoryTherapyListComponent } from './respiratory-therapy-list/respiratory-therapy-list.component';
import { FormChScalesComponent } from './scales/form-ch-scales/form-ch-scales.component';
import { TracingListComponent } from './tracing-list/tracing-list.component';


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
      path: 'ch-nutrition-list/:id/:id2',
      component: ChNutritionListComponent,
    },
    {
      path: 'clinic-history-language-list/:id/:id2',
      component: ClinicHistoryLanguageListComponent,
    },
    {
      path: 'clinic-history-physical-therapy-list/:id/:id2',
      component: ClinicHistoryPhysicTherapy,
    },
    {
  
      path: 'ch-record-list/:id/:id2/:id3',
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
    },
    {
      path: 'entry-clinic-history-occupational-therapy/:id/:id2',
      component: ClinicHistoryOccupationalTherapy,
    },
    {
      path: 'ch-social-work/social-work-list/:id1/:id2',
      component: SocialWorkListComponent,
    },
    {
      path: 'ch-psychology/psychology-list/:id1/:id2',
      component: PsychologyListComponent,
    }, 
    {
      path: 'tracing-list/tracing-list/:id1/:id2',
      component: TracingListComponent,
    }
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicHistoryRoutingModule {
}
