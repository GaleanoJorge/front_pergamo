import {RouterModule, Routes} from '@angular/router';

import {InscriptionsComponent} from './inscriptions.component';
import {NgModule} from '@angular/core';
import {StudentsComponent} from './students/students.component';

const routes: Routes = [
  {
    path: '',
    component: InscriptionsComponent,
    children: [
      {
        path: 'students',
        component: StudentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionsRoutingModule {
}
