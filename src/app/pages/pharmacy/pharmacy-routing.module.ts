import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingRequestPharmacyComponent } from './billing-request-pharmacy/billing-request-pharmacy.component';
import { PharmaLotStockTabComponent } from './pharma-lot-stock-tab/pharma-lot-stock-tab.component';
import { PharmacyBulkLoadComponent } from './pharmacy-bulk-load/pharmacy-bulk-load.component';
import { PharmacyInventoryAdjustmentComponent } from './pharmacy-inventory-adjustment/pharmacy-inventory-adjustment.component';
import { PharmacyRequestPatientsComponent } from './pharmacy-request-patients/pharmacy-request-patients.component';
import { PharmacyRequestComponent } from './pharmacy-request/pharmacy-request.component';
import { PharmacyComponent } from './pharmacy.component';
import { ProductRequestComponent } from './product-request/product-request.component';
import { ProductTabComponent } from './product-tab/product-tab.component';



const routes: Routes = [{
  path: '',
  component: PharmacyComponent,
  children: [
    {
      path: 'pharma-lot-stock-tab',
      component: PharmaLotStockTabComponent,
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
      component: ProductRequestComponent,
    },
    {
      path: 'billing-request-pharmacy',
      component: BillingRequestPharmacyComponent,
    },
    {
      path: 'pharmacy-request-patients',
      component: PharmacyRequestPatientsComponent,
    },
    {
      path: 'pharmacy-inventory-adjustment',
      component: PharmacyInventoryAdjustmentComponent,
    },
    {
      path: 'pharmacy-bulk-load',
      component: PharmacyBulkLoadComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PharmacyRoutingModule {
}
