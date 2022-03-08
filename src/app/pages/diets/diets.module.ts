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
import { FormDietsComponent } from './diets-list/form-diets/form-diets.component';
import { Actions2Component } from './diets-list/actions.component';
import { DietsListComponent } from './diets-list/diets-list.component';
import { DishPackageComponent } from './diets-list/dish-package/dish-package.component';
import { SelectDishComponent } from './diets-list/dish-package/select-dish.component';
import { FormAdmissionsComponent } from './diets-list/form-admissions/form-admissions.component';
import { SelectAdmissionsComponent } from './diets-list/admissions-package/select-admissions.component';
import { AdmissionsPackageComponent } from './diets-list/admissions-package/admissions-package.component';




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
    FormDietsComponent,
    Actions2Component,
    DishPackageComponent,
    SelectDishComponent,
    FormAdmissionsComponent,
    SelectAdmissionsComponent,
    AdmissionsPackageComponent,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
})
export class DietsModule {
}
