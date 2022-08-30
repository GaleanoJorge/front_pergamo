import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalDiaryComponent } from './medical-diary/medical-diary.component';
import { MedicalComponent } from './medical-diary/medical/medical.component';
import { NonWorkingDaysComponent } from './non-working-days/non-working-days.component';
import { SchedulingComponent } from './scheduling.component';
import { TelemedicineListComponent } from './telemedicine/telemedicine-list/telemedicine-list.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingRoutingModule {}
