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
import { SpecialFieldComponent } from './setting/special-field/special-field.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    NbMenuModule,
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
  ],
  declarations: [
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
  ],
  providers: [PermissionsGuard],
})
export class PagesModule {
}
