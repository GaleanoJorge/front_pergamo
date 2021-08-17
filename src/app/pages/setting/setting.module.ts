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
  NbTabsetModule, NbUserModule, NbInputModule, NbSelectModule, NbAlertModule, NbDialogModule, NbIconModule, NbToggleModule, NbLayoutModule, NbSpinnerModule, NbCheckboxModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesPermissionsComponent } from './roles-permissions/roles-permissions.component';
import { ItemComponent } from './item/item.component';
import { PagesModule } from '../pages.module';
import { DynamicItemComponent } from './dynamic-item/dynamic-item.component';
import { CampusComponent } from './campus/campus.component';
import { CategoryComponent } from './category/category.component';
import { SectionalCouncilComponent } from './sectional-council/sectional-council.component';
import { StatusFieldComponent } from './sectional-council/status-field.component';
import { FormSectionalCouncilComponent } from './sectional-council/form-sectional-council/form-sectional-council.component';
import { ActionsComponent } from './sectional-council/actions.component';
import { DistrictComponent } from './district/district.component';
import { FormDistrictComponent } from './district/form-district/form-district.component';
import { OfficeComponent } from './office/office.component';
import { FormOfficeComponent } from './office/form-office/form-office.component';
import { DependenceComponent } from './dependence/dependence.component';
import { FormDependenceComponent } from './dependence/form-dependence/form-dependence.component';
import { PositionComponent } from './position/position.component';
import { FormPositionComponent } from './position/form-position/form-position.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { FormSpecialtyComponent } from './specialty/form-specialty/form-specialty.component';
import { EntityComponent } from './entity/entity.component';
import { FormEntityComponent } from './entity/form-entity/form-entity.component';
import { CircuitComponent } from './circuit/circuit.component';
import { FormCircuitComponent } from './circuit/form-circuit/form-circuit.component';
import { FormRegionComponent } from './region/form-region/form-region.component';
import { FormCampusComponent } from './campus/form-campus/form-campus.component';
import { RegionComponent } from './region/region.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { FormMunicipalityComponent } from './municipality/form-municipality/form-municipality.component';
import { FormAreaComponent } from './area/form-area/form-area.component';
import { AreaComponent } from './area/area.component';
import { SubareaComponent } from './subarea/subarea.component';
import { FormSubareaComponent } from './subarea/form-subarea/form-subarea.component';
import { ThemesComponent } from './themes/themes.component';
import { FormThemesComponent } from './themes/form-themes/form-themes.component';
import { ValidityComponent } from './validity/validity.component';
import { FormValidityComponent } from './validity/form-validity/form-validity.component';
import { DateFormatPipe } from '../../pipe/date-format.pipe';
import { ActionsUsersComponent } from './users/actions-users.component';
import { FormUserComponent } from './users/form-user/form-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ExtraordinaryActionComponent } from './users/extraordinary-action/extraordinary-action.component';
import { ActionsExtraordinaryComponent } from './users/actions-extraordinary.component';
import { FormExtraordinaryActionComponent } from './users/form-extraordinary-action/form-extraordinary-action.component';
import { ExtraordinaryActionCoordinatorComponent } from './users/extraordinary-action-coordinator/extraordinary-action-coordinator.component';
import { FormExtraordinaryActionCoordinatorComponent } from './users/form-extraordinary-action-coordinator/form-extraordinary-action-coordinator.component';
import { FormExtraordinaryActionFormerComponent } from './users/form-extraordinary-action-former/form-extraordinary-action-former.component';
import { ExtraordinaryActionFormerComponent } from './users/extraordinary-action-former/extraordinary-action-former.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbDialogModule.forRoot(),
    NbListModule,
    NbInputModule,
    NbToggleModule,
    NbSelectModule,
    NbAccordionModule,
    NbUserModule,
    NbAlertModule,
    SettingRoutingModule,
    PagesModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbLayoutModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbIconModule
  ],
  declarations: [
    SettingComponent,
    UsersComponent,
    RolesComponent,
    PermissionsComponent,
    RolesPermissionsComponent,
    ItemComponent,
    DynamicItemComponent,
    FormCampusComponent,
    CampusComponent,
    CategoryComponent,
    SectionalCouncilComponent,
    StatusFieldComponent,
    FormSectionalCouncilComponent,
    ActionsComponent,
    DistrictComponent,
    FormDistrictComponent,
    OfficeComponent,
    FormOfficeComponent,
    DependenceComponent,
    FormDependenceComponent,
    PositionComponent,
    FormPositionComponent,
    SpecialtyComponent,
    FormSpecialtyComponent,
    EntityComponent,
    FormEntityComponent,
    CircuitComponent,
    FormCircuitComponent,
    FormRegionComponent,
    RegionComponent,
    MunicipalityComponent,
    FormMunicipalityComponent,
    FormAreaComponent,
    AreaComponent,
    SubareaComponent,
    FormSubareaComponent,
    ThemesComponent,
    FormThemesComponent,
    ValidityComponent,
    FormValidityComponent,
    ActionsUsersComponent,
    FormUserComponent,
    EditUserComponent,
    ExtraordinaryActionComponent,
    ActionsExtraordinaryComponent,
    FormExtraordinaryActionComponent,
    ExtraordinaryActionCoordinatorComponent,
    FormExtraordinaryActionCoordinatorComponent,
    FormExtraordinaryActionFormerComponent,
    ExtraordinaryActionFormerComponent
  ],
  providers: [
    DateFormatPipe
  ],
})
export class SettingModule {
}
