import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPharmacyLotComponent } from './pharmacy-lot/form-pharmacy-lot/form-pharmacy-lot.component';
import { PharmacyLotComponent } from './pharmacy-lot/pharmacy-lot.component';

import { PharmacyComponent } from './pharmacy.component';


const routes: Routes = [{
  path: '',
  component: PharmacyComponent,
  children: [
    
    {
      path: 'pharmacy-lot',
      component: PharmacyLotComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PharmacyRoutingModule {
}
