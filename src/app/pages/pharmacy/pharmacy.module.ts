import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
  NbInputModule,
  NbSelectModule,
  NbAlertModule,
  NbDialogModule,
  NbIconModule,
  NbCheckboxModule,
  NbRadioModule,
  NbTooltipModule,
  NbDatepickerModule, NbSpinnerModule, NbToggleModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { PagesModule } from '../pages.module';
import { DateFormatPipe } from '../../pipe/date-format.pipe';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { FormBillingRequestPharmacyComponent } from './billing-request-pharmacy/form-billing-request-pharmacy/form-billing-request-pharmacy.component';
import { AmountBillingRequestPharmacyComponent } from './billing-request-pharmacy/prod-billing-request-pharmacy-package/amount-billing-request-pharmacy.component';
import { ProdBillingRequestPharmacyPackageComponent } from './billing-request-pharmacy/prod-billing-request-pharmacy-package/prod-billing-request-pharmacy-package.component';
import { SelectProductBillingRequestPharmacyComponent } from './billing-request-pharmacy/prod-billing-request-pharmacy-package/select-prod-billing-request-pharmacy.component';
import { AmountSuppliesRequestComponent } from './billing-request-pharmacy/prod-supplies-request-package/amount-supplies-request.component';
import { ProdSuppliesRequestPackageComponent } from './billing-request-pharmacy/prod-supplies-request-package/prod-supplies-request-package.component';
import { SelectProductSuppliesRequestComponent } from './billing-request-pharmacy/prod-supplies-request-package/select-prod-supplies-request.component';
import { BillingRequestPharmacyComponent } from './billing-request-pharmacy/billing-request-pharmacy.component';
import { FormPharmacyIncomeComponent } from './pharmacy-income/form-pharmacy-income/form-pharmacy-income.component';
import { ActionsIncoComponent } from './pharmacy-income/actions.component';
import { PharmacyIncomeComponent } from './pharmacy-income/pharmacy-income.component';
import { AmountDamagedComponent } from './pharmacy-income/income-package/amountdamaged.component';
import { SelectIncomeComponent } from './pharmacy-income/income-package/select-income.component';
import { IncomePackageComponent } from './pharmacy-income/income-package/income-package.component';
import { AmountIncomeComponent } from './pharmacy-income/income-package/amountIncome.component';
import { FormPharmacyIncomeSuppliesComponent } from './pharmacy-income-supplies/form-pharmacy-income-supplies/form-pharmacy-income-supplies.component';
import { AmountDamagedSupComponent } from './pharmacy-income-supplies/income-supplies-package/amountDamagedSup.component';
import { AmountSupComeComponent } from './pharmacy-income-supplies/income-supplies-package/amountSupCome.component';
import { IncomeSuppliesPackageComponent } from './pharmacy-income-supplies/income-supplies-package/income-supplies-package.component';
import { SelectSuppliesIncomeComponent } from './pharmacy-income-supplies/income-supplies-package/select-supplies-income.component';
import { ActionsSupComponent } from './pharmacy-income-supplies/actions.component';
import { PharmacyIncomeSuppliesComponent } from './pharmacy-income-supplies/pharmacy-income-supplies.component';
import { PharmacyInventoryComponent } from './pharmacy-inventory/pharmacy-inventory.component';
import { FormPharmacyInventoryComponent } from './pharmacy-inventory/form-pharmacy-inventory/form-pharmacy-inventory.component';
import { ActionsInvComponent } from './pharmacy-inventory/actionsInv.component';
import { FormPharmaInvPersonComponent } from './pharmacy-inventory/form-pharma-inv-person/form-pharma-inv-person.component';
import { ActionsInvSupComponent } from './pharmacy-inventory-supplies/actionsInv.component';
import { PharmacyInventorySuppliesComponent } from './pharmacy-inventory-supplies/pharmacy-inventory-supplies.component';
import { FormPharmacyInventorySuppliesComponent } from './pharmacy-inventory-supplies/form-pharmacy-inventory-supplies/form-pharmacy-inventory-supplies.component';
import { FormPharmaInvSupPersonComponent } from './pharmacy-inventory-supplies/form-pharma-inv-sup-person/form-pharma-inv-sup-person.component';
import { PharmacyLotComponent } from './pharmacy-lot/pharmacy-lot.component';
import { FormPharmacyLotComponent } from './pharmacy-lot/form-pharmacy-lot/form-pharmacy-lot.component';
import { ProdLotPackageComponent } from './pharmacy-lot/prod-lot-package/prod-lot-package.component';
import { AmountComponent } from './pharmacy-lot/prod-lot-package/amount.component';
import { SelectPharmacyLotComponent } from './pharmacy-lot/prod-lot-package/select-prod-lot.component';
import { LotComponent } from './pharmacy-lot/prod-lot-package/lot.component';
import { DateComponent } from './pharmacy-lot/prod-lot-package/date.component';
import { PharmacyProductRequestComponent } from './pharmacy-product-request/pharmacy-product-request.component';
import { FormPharmacyProductRequestComponent } from './pharmacy-product-request/form-pharmacy-product-request/form-pharmacy-product-request.component';
import { ProdShippingPackageComponent } from './pharmacy-request/prod-shipping-package/prod-shipping-package.component';
import { SelectProductShippingComponent } from './pharmacy-request/prod-shipping-package/select-prod-shipping.component';
import { AmountShippingComponent } from './pharmacy-request/prod-shipping-package/amount-shipping.component';
import { PharmacyRequestComponent } from './pharmacy-request/pharmacy-request.component';
import { FormPharmacyRequestComponent } from './pharmacy-request/form-pharmacy-request/form-pharmacy-request.component';
import { ActionsSendComponent } from './pharmacy-request/actions.component';
import { FormPharmacyRequestPatientComponent } from './pharmacy-request-patient/form-pharmacy-request-patient/form-pharmacy-request-patient.component';
import { AmountShippingPatientComponent } from './pharmacy-request-patient/prod-shipping-patient-package/amount-shipping-patient.component';
import { SelectProductPatientShippingComponent } from './pharmacy-request-patient/prod-shipping-patient-package/select-prod-patient-shipping.component';
import { ProdShippingPatientPackageComponent } from './pharmacy-request-patient/prod-shipping-patient-package/prod-shipping-patient-package.component';
import { ActionsSendPatientComponent } from './pharmacy-request-patient/actions.component';
import { PharmacyRequestPatientComponent } from './pharmacy-request-patient/pharmacy-request-patient.component';
import { FormPharmacyReturnComponent } from './pharmacy-return/form-pharmacy-return/form-pharmacy-return.component';
import { AmountReturnComponent } from './pharmacy-return/prod-return-package/amount-return.component';
import { ProdReturnPackageComponent } from './pharmacy-return/prod-return-package/prod-return-package.component';
import { SelectProductReturnComponent } from './pharmacy-return/prod-return-package/select-prod-return.component';
import { ActionsReturnComponent } from './pharmacy-return/actions-return.component';
import { PharmacyReturnComponent } from './pharmacy-return/pharmacy-return.component';
import { ProductTabComponent } from './product-tab/product-tab.component';
import { PharmacyComponent } from './pharmacy.component';
import { UserResponsibleComponent } from './pharmacy-request-patient/prod-shipping-patient-package/user-responsible.component';
import { ActionsPatientComponent } from './pharmacy-income-patient/actions.component';
import { PharmacyRequestPatientsComponent } from './pharmacy-request-patients/pharmacy-request-patients.component';
import { PharmacyIncomePatientComponent } from './pharmacy-income-patient/pharmacy-income-patient.component';
import { IncomePackagePatientComponent } from './pharmacy-income-patient/income-patient-package/income-package-patient.component';
import { SelectIncomePatientComponent } from './pharmacy-income-patient/income-patient-package/select-income-patient.component';
import { AmountIncomePatientComponent } from './pharmacy-income-patient/income-patient-package/amountIncomePatient.component';
import { AmountDamagedPatientComponent } from './pharmacy-income-patient/income-patient-package/amountdamagedPatient.component';
import { FormPharmacyIncomePatientComponent } from './pharmacy-income-patient/form-pharmacy-income-patient/form-pharmacy-income-patient.component';
import { FormPharmacyProductSuppliesComponent } from './pharmacy-request-supplies/form-pharmacy-product-supplies/form-pharmacy-product-supplies.component';
import { PharmacyProductSuppliesComponent } from './pharmacy-request-supplies/pharmacy-product-supplies.component';
import { ProductRequestComponent } from './product-request/product-request.component';
import { AmountUnitComponent } from './pharmacy-lot/prod-lot-package/amountUnit.component';

@NgModule({
  imports: [
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbToggleModule,
    NbRouteTabsetModule,
    NbRadioModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbTooltipModule,
    NbListModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSelectModule,
    PharmacyRoutingModule,
    NbAlertModule,
    PagesModule,
    SignaturePadModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    NbSpinnerModule,
  ],
  declarations: [
    FormBillingRequestPharmacyComponent,
    AmountBillingRequestPharmacyComponent,
    ProdBillingRequestPharmacyPackageComponent,
    SelectProductBillingRequestPharmacyComponent,
    AmountSuppliesRequestComponent,
    ProdSuppliesRequestPackageComponent,
    SelectProductSuppliesRequestComponent,
    BillingRequestPharmacyComponent,

    FormPharmacyIncomeComponent,
    PharmacyIncomeComponent,
    ActionsIncoComponent,
    AmountDamagedComponent,
    AmountIncomeComponent,
    IncomePackageComponent,
    SelectIncomeComponent,

    FormPharmacyIncomeSuppliesComponent,
    AmountDamagedSupComponent,
    AmountSupComeComponent,
    IncomeSuppliesPackageComponent,
    SelectSuppliesIncomeComponent,
    ActionsSupComponent,
    PharmacyIncomeSuppliesComponent,


    PharmacyInventoryComponent,
    FormPharmacyInventoryComponent,
    ActionsInvComponent,
    FormPharmaInvPersonComponent,

    ActionsInvSupComponent,
    PharmacyInventorySuppliesComponent,
    FormPharmacyInventorySuppliesComponent,
    FormPharmaInvSupPersonComponent,


    PharmacyLotComponent,
    FormPharmacyLotComponent,
    ProdLotPackageComponent,
    SelectPharmacyLotComponent,
    AmountComponent,
    LotComponent,
    DateComponent,
    AmountUnitComponent,

    PharmacyProductRequestComponent,
    FormPharmacyProductRequestComponent,
    FormPharmacyProductSuppliesComponent,
    PharmacyProductSuppliesComponent,
    ProductRequestComponent,

    ProdShippingPackageComponent,
    SelectProductShippingComponent,
    AmountShippingComponent,
    PharmacyRequestComponent,
    FormPharmacyRequestComponent,
    ActionsSendComponent,

    FormPharmacyRequestPatientComponent,
    AmountShippingPatientComponent,
    ProdShippingPatientPackageComponent,
    SelectProductPatientShippingComponent,
    ActionsSendPatientComponent,
    PharmacyRequestPatientComponent,

    FormPharmacyReturnComponent,
    AmountReturnComponent,
    ProdReturnPackageComponent,
    SelectProductReturnComponent,
    ActionsReturnComponent,
    PharmacyReturnComponent,
    UserResponsibleComponent,
    ProductTabComponent,
    PharmacyComponent,

    ActionsPatientComponent,
    PharmacyRequestPatientsComponent,
    PharmacyIncomePatientComponent,
    IncomePackagePatientComponent,
    SelectIncomePatientComponent,
    AmountIncomePatientComponent,
    AmountDamagedPatientComponent,
    FormPharmacyIncomePatientComponent,

  ],
  exports: [
    FormBillingRequestPharmacyComponent,
    AmountBillingRequestPharmacyComponent,
    ProdBillingRequestPharmacyPackageComponent,
    SelectProductBillingRequestPharmacyComponent,
    AmountSuppliesRequestComponent,
    ProdSuppliesRequestPackageComponent,
    SelectProductSuppliesRequestComponent,
    BillingRequestPharmacyComponent,

    FormPharmacyIncomeComponent,
    PharmacyIncomeComponent,
    ActionsIncoComponent,
    AmountDamagedComponent,
    AmountIncomeComponent,
    IncomePackageComponent,
    SelectIncomeComponent,

    FormPharmacyIncomeSuppliesComponent,
    AmountDamagedSupComponent,
    AmountSupComeComponent,
    IncomeSuppliesPackageComponent,
    SelectSuppliesIncomeComponent,
    ActionsSupComponent,
    PharmacyIncomeSuppliesComponent,


    PharmacyInventoryComponent,
    FormPharmacyInventoryComponent,
    ActionsInvComponent,
    FormPharmaInvPersonComponent,

    ActionsInvSupComponent,
    PharmacyInventorySuppliesComponent,
    FormPharmacyInventorySuppliesComponent,
    FormPharmaInvSupPersonComponent,


    PharmacyLotComponent,
    FormPharmacyLotComponent,
    ProdLotPackageComponent,
    SelectPharmacyLotComponent,
    AmountComponent,
    LotComponent,
    DateComponent,
    AmountUnitComponent,

    PharmacyProductRequestComponent,
    FormPharmacyProductRequestComponent,
    FormPharmacyProductSuppliesComponent,
    PharmacyProductSuppliesComponent,
    ProductRequestComponent,

    ProdShippingPackageComponent,
    SelectProductShippingComponent,
    AmountShippingComponent,
    PharmacyRequestComponent,
    FormPharmacyRequestComponent,
    ActionsSendComponent,

    FormPharmacyRequestPatientComponent,
    AmountShippingPatientComponent,
    ProdShippingPatientPackageComponent,
    SelectProductPatientShippingComponent,
    ActionsSendPatientComponent,
    PharmacyRequestPatientComponent,

    FormPharmacyReturnComponent,
    AmountReturnComponent,
    ProdReturnPackageComponent,
    SelectProductReturnComponent,
    ActionsReturnComponent,
    PharmacyReturnComponent,

    ProductTabComponent,
    UserResponsibleComponent,
    ActionsPatientComponent,

    PharmacyRequestPatientsComponent,
    PharmacyIncomePatientComponent,
    IncomePackagePatientComponent,
    SelectIncomePatientComponent,
    AmountIncomePatientComponent,
    AmountDamagedPatientComponent,
    FormPharmacyIncomePatientComponent,


  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe,
  ],
})
export class PharmacyModule {

}
