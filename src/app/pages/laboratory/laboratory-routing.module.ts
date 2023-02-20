import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaboratoryListComponent } from './laboratory-list/laboratory-list.component';
import { LaboratoryComponent } from './laboratory.component';

const routes: Routes = [{
  path: '',
  component: LaboratoryComponent,
  children: [
    {
      path: 'list',
      component: LaboratoryListComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoryRoutingModule {
  
}
