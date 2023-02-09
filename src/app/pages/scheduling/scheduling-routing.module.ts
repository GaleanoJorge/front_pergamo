import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssistencialViewComponent } from './assistencial-view/assistencial-view.component';
import { CopayCategoryComponent } from './copay_category/copay-category.component';
import { HealthcareItineraryComponent } from './healtcare-itinerary/healthcare-itinerary.component';
import { MedicalDiaryComponent } from './medical-diary/medical-diary.component';
import { MedicalComponent } from './medical-diary/medical/medical.component';
import { NonWorkingDaysComponent } from './non-working-days/non-working-days.component';
import { ReasonCancelComponent } from './reason-cancel/reason-cancel.component';
import { SchedulingComponent } from './scheduling.component';
import { TelemedicineListComponent } from './telemedicine/telemedicine-list/telemedicine-list.component';
import { TransferScheduleComponent } from './transfer-schedule/transfer-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulingComponent,
    children: [
      {
        path: 'telemedicine',
        component: TelemedicineListComponent,
      },
      {
        path: 'medical-diary',
        component: MedicalDiaryComponent,
      },
      {
        path: 'non-working-days',
        component: NonWorkingDaysComponent,
      },
      {
        path: 'medical-diary/medical/:id/:user',
        component: MedicalComponent,
      },
      {
        path: 'healthcare-itinerary',
        component: HealthcareItineraryComponent,
      },
      {
        path: 'copay-category',
        component: CopayCategoryComponent,
      },
      {
        path: 'assitencial-view',
        component: AssistencialViewComponent,
      },
      {
        path: 'reason-cancel',
        component: ReasonCancelComponent,
      },
      {
        path: 'schedule-transfer',
        component: TransferScheduleComponent,
      },
      {
        path: 'schedule-disable',
        component: TransferScheduleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingRoutingModule {}
