import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingRequestPharmacyComponent } from './billing-request-pharmacy/billing-request-pharmacy.component';
import { PharmacyInventoryComponent } from './pharmacy-inventory/pharmacy-inventory.component';
import { PharmacyLotComponent } from './pharmacy-lot/pharmacy-lot.component';
import { PharmacyProductRequestComponent } from './pharmacy-product-request/pharmacy-product-request.component';
import { PharmacyRequestPatientsComponent } from './pharmacy-request-patients/pharmacy-request-patients.component';
import { PharmacyRequestComponent } from './pharmacy-request/pharmacy-request.component';
import { PharmacyComponent } from './pharmacy.component';
import { ProductTabComponent } from './product-tab/product-tab.component';



const routes: Routes = [{
  path: '',
  component: PharmacyComponent,
  children: [
    {
      path: 'pharmacy-lot',
      component: PharmacyLotComponent,
    } ,
    {
    
    path: 'pharmacy-inventory',
    component: ProductTabComponent,
   
    },
    {
      path: 'pharmacy-request',
      component: PharmacyRequestComponent,
    },
    {
      path: 'pharmacy-product-request',
      component: PharmacyProductRequestComponent,
    },
    {
      path: 'billing-request-pharmacy',
      component: BillingRequestPharmacyComponent,
    },
    {
      path: 'pharmacy-request-patients',
      component: PharmacyRequestPatientsComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PharmacyRoutingModule {
}
