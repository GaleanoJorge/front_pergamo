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
  NbDatepickerModule, NbSpinnerModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DietsRoutingModule } from './diets-routing.module';
import { DietsComponent } from './diets.component';
import { PagesModule } from '../pages.module';
import { DateFormatPipe } from '../../pipe/date-format.pipe';
import { Actions2Component } from './diet-order/actions.component';
import { DishPackageComponent } from './diet-order/dish-package/dish-package.component';
import { SelectDishComponent } from './diet-order/dish-package/select-dish.component';
import { FormAdmissionsComponent } from './diet-order/form-admissions/form-admissions.component';
import { SelectAdmissionsComponent } from './diet-order/admissions-package/select-admissions.component';
import { AdmissionsPackageComponent } from './diet-order/admissions-package/admissions-package.component';
import { DietsListComponent } from './diets-list/diets-list.component';
import { FormDietOrderComponent } from './diet-order/form-diet-order/form-diet-order.component';
import { DietOrderComponent } from './diet-order/diet-order.component';
import { DietAdmissionComponent } from './diet-admission/diet-admission.component';
import { ActionsDietAdmissionComponent } from './diet-admission/actions-diet-admission.component';
import { FormDietAdmissionComponent } from './diet-admission/form-diet-admission/form-diet-admission.component';
import { ComponentPackageComponent } from './diet-admission/admission-package/component-package.component';
import { SelectComponentComponent } from './diet-admission/admission-package/select-component.component';
import { DietStockComponent } from './diet-stock/diet-stock.component';
import { FormDietStockComponent } from './diet-stock/form-diet-stock/form-diet-stock.component';
import { DietSuppliesInputComponent } from './diet-supplies-input/diet-supplies-input.component';
import { ActionsInputComponent } from './diet-supplies-input/actions-input.component';
import { FormDietSuppliesInputComponent } from './diet-supplies-input/form-diet-supplies-input/form-diet-supplies-input.component';
import { DietSuppliesOutputComponent } from './diet-supplies-output/diet-supplies-output.component';
import { ActionsDietSuppliesOutputComponent } from './diet-supplies-output/actions.component';
import { FormDietSuppliesOutputComponent } from './diet-supplies-output/form-diet-supplies-output/form-diet-supplies-output.component';
import { DietSuppliesOutputPackageComponent } from './diet-supplies-output/diet-supplies-output-package/diet-supplies-output-package.component';
import { SelectDietSuppliesOutputComponent } from './diet-supplies-output/diet-supplies-output-package/select-diet-supplies-output.component';
import { AmountDietSuppliesOutputComponent } from './diet-supplies-output/diet-supplies-output-package/amount-diet-supplies-output.component';




@NgModule({
  imports: [
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
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
    DietsRoutingModule,
    NbAlertModule,
    PagesModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
    NbSpinnerModule,
  ],
  declarations: [
    DietsComponent,
    DietsListComponent,
    Actions2Component,
    DishPackageComponent,
    SelectDishComponent,
    FormAdmissionsComponent,
    SelectAdmissionsComponent,
    AdmissionsPackageComponent,
    FormDietOrderComponent,
    DietOrderComponent,
    DietAdmissionComponent,
    ActionsDietAdmissionComponent,
    FormDietAdmissionComponent,
    ComponentPackageComponent,
    SelectComponentComponent,
    DietStockComponent,
    FormDietStockComponent,
    DietSuppliesInputComponent,
    ActionsInputComponent,
    FormDietSuppliesInputComponent,
    DietSuppliesOutputComponent,
    ActionsDietSuppliesOutputComponent,
    FormDietSuppliesOutputComponent,
    DietSuppliesOutputPackageComponent,
    SelectDietSuppliesOutputComponent,
    AmountDietSuppliesOutputComponent,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class DietsModule {
}
