import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationalInstitutionMainComponent } from './educational-institution-main.component';
import { EducationalInstitutionListComponent } from './educational-institution-list/educational-institution-list-component';

const routes: Routes = [{
  path: '',
  component: EducationalInstitutionMainComponent,
  children: [
    {
      path: 'list',
      component: EducationalInstitutionListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationalInstitutionMainRoutingModule { }
