import { NgModule } from '@angular/core';
import {
  NbMenuModule,
  NbCardModule,
  NbAlertModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbRadioModule,
  NbToggleModule,
  NbListModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbSpinnerModule,
  NbBadgeModule,
  NbIconModule, NbContextMenuModule, NbAutocompleteModule, NbTooltipModule, NbFormFieldModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { MapComponent } from './map/map.component';
import { BaseListComponent } from './components/base-list/base-list.component';
import { BaseTableComponent } from './components/base-table/base-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusFieldComponent } from './components/status-field/status-field.component';
import { BaseFormComponent } from './components/base-form/base-form.component';
import { FormUsersComponent } from './components/form-users/form-users.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { CategoriesDialogComponent } from './components/form-users/categories-dialog.component';
import {CheckPermsDirective} from '../directives/check-perms.directive';
import {PermissionsGuard} from '../guards/permissions.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SpecialitiesDialogComponent } from './components/form-users/especialities-dialog.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { AmountWorkLocationComponent } from './components/form-users/work-location-package/amount-work-location.component';
import { SelectWorkLocationComponent } from './components/form-users/work-location-package/select-work-location.component';
import { WorkLocationPackageComponent } from './components/form-users/work-location-package/work-location-package.component';
import { BillingPadComponent } from './billing-pad/billing-pad.component';
import { UsersCampusComponent } from './components/form-users/users-campus/users-campus.component';
import { SelectUsersCampusComponent } from './components/form-users/users-campus/select-user-campus.component';
import { WebSpeachComponent } from './components/web-speach/web-speach.component';
import { InsumeRequestComponent } from './clinic-history/insume-request/insume-request.component';
import { FormInsumeRequestComponent } from './clinic-history/insume-request/form-insume-request/form-insume-request.component';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { ProductTabComponent } from './pharmacy/product-tab/product-tab.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { AssistanceStockComponent } from './setting/assistance-stock/assistance-stock.component';
import { FormAssistanceStockComponent } from './setting/assistance-stock/form-assistance-stock/form-assistance-stock.component';
import { FormAssistanceReturnComponent } from './setting/assistance-stock/form-assistance-return/form-assistance-return.component';
import { AgreementCheckComponent } from './components/form-users/agreement-package/agreement-check.component';
import { AgreementPackageComponent } from './components/form-users/agreement-package/agreement-package.component';
//import { ReferenceComponent } from './reference/reference.component';




@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    SignaturePadModule,
    NbMenuModule.forRoot(),
    NbAlertModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    NbDatepickerModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbRadioModule,
    NbToggleModule,
    NbListModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbBadgeModule,
    NbIconModule,
    NbContextMenuModule,
    NbAutocompleteModule,
    NbTooltipModule,
    NbFormFieldModule,
    NbRadioModule,
  ],
  declarations: [
    AgreementPackageComponent,
    AgreementCheckComponent,
    AssistanceStockComponent,
    FormAssistanceStockComponent,
    FormAssistanceReturnComponent,
    InsumeRequestComponent,
    FormInsumeRequestComponent,
    PagesComponent,
    BreadcrumbComponent,
    GraphicsComponent,
    MapComponent,
    BaseListComponent,
    BaseTableComponent,
    ConfirmDialogComponent,
    StatusFieldComponent,
    BaseFormComponent,
    FormUsersComponent,
    PersonalInformationComponent,
    CategoriesDialogComponent,
    SpecialitiesDialogComponent,
    CheckPermsDirective,
    ResetPasswordComponent,
    AmountWorkLocationComponent,
    SelectWorkLocationComponent,
    WorkLocationPackageComponent,
    BillingPadComponent,
   // ReferenceComponent,
    SelectUsersCampusComponent,
    UsersCampusComponent,
    WebSpeachComponent,
    
  ],
  exports: [
    BreadcrumbComponent,
    GraphicsComponent,
    MapComponent,
    BaseListComponent,
    BaseTableComponent,
    BaseFormComponent,
    FormUsersComponent,
    CheckPermsDirective,
    AmountWorkLocationComponent,
    SelectWorkLocationComponent,
    SelectUsersCampusComponent,
    WorkLocationPackageComponent,
    UsersCampusComponent,
    WebSpeachComponent,
    InsumeRequestComponent,
    FormInsumeRequestComponent,
    AssistanceStockComponent,
    FormAssistanceStockComponent,
    FormAssistanceReturnComponent,
  ],
  providers: [PermissionsGuard],
})
export class PagesModule {
}
