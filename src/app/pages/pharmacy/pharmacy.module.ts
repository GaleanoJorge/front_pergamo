import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyComponent } from './pharmacy.component';
import { PagesModule } from '../pages.module';
import { DateFormatPipe } from '../../pipe/date-format.pipe';
import { FormPharmacyLotComponent } from './pharmacy-lot/form-pharmacy-lot/form-pharmacy-lot.component';
import { PharmacyLotComponent } from './pharmacy-lot/pharmacy-lot.component';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  imports: [
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    PharmacyRoutingModule,
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
    PharmacyLotComponent,
    PharmacyComponent,
    FormPharmacyLotComponent,
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe,
  ],
})
export class PharmacyModule {
}
