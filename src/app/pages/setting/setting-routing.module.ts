import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingComponent } from './setting.component'
import { UsersComponent } from './users/users.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ItemComponent } from './item/item.component';
import { RolesComponent } from './roles/roles.component';
import { CampusComponent } from './campus/campus.component';
import { CategoryComponent } from './category/category.component';
import { SectionalCouncilComponent } from './sectional-council/sectional-council.component';
import { DistrictComponent } from './district/district.component';
import { OfficeComponent } from './office/office.component';
import { DependenceComponent } from './dependence/dependence.component';
import { PositionComponent } from './position/position.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { EntityComponent } from './entity/entity.component';
import { CircuitComponent } from './circuit/circuit.component';
import { RegionComponent } from './region/region.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { AreaComponent } from './area/area.component';
import { SubareaComponent } from './subarea/subarea.component';
import { ValidityComponent } from './validity/validity.component';
import { PermissionsGuard } from "../../guards/permissions.guard";
import { FormUserComponent } from './users/form-user/form-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ExtraordinaryActionComponent } from './users/extraordinary-action/extraordinary-action.component';
import { ThemesComponent } from './themes/themes.component';
import { ExtraordinaryActionCoordinatorComponent } from './users/extraordinary-action-coordinator/extraordinary-action-coordinator.component';
import { ExtraordinaryActionFormerComponent } from './users/extraordinary-action-former/extraordinary-action-former.component';

const routes: Routes = [{
  path: '',
  component: SettingComponent,
  children: [
    {
      path: 'users',
      component: UsersComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'users/create/:id',
      component: FormUserComponent,
    },
    {
      path: 'users/edit/:id/:roleId',
      component: EditUserComponent,
    },
    {
      path: 'users/extraordinary-action/:id/:roleId',
      component: ExtraordinaryActionComponent,
    },
    {
      path: 'users/extraordinary-action-coordinator/:id/:roleId',
      component: ExtraordinaryActionCoordinatorComponent,
    },
    {
      path: 'users/extraordinary-action-former/:id/:roleId',
      component: ExtraordinaryActionFormerComponent,
    },
    {
      path: 'roles',
      component: RolesComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'roles.read' },
    },
    {
      path: 'permissions',
      component: PermissionsComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'permisos.read' },
    },
    {
      path: 'items',
      component: ItemComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'items.read' },
    },
    {
      path: 'campus',
      component: CampusComponent,
    },
    {
      path: 'categories',
      component: CategoryComponent,
    },
    {
      path: 'sectional-council',
      component: SectionalCouncilComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'concejo-seccional.read' },
    },
    {
      path: 'district',
      component: DistrictComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'distritos.read' },
    },
    {
      path: 'office',
      component: OfficeComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'despacho.read' },
    },
    {
      path: 'dependence',
      component: DependenceComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'dependencia.read' },
    },
    {
      path: 'position',
      component: PositionComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'cargos.read' },
    },
    {
      path: 'specialty',
      component: SpecialtyComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'especialidad.read' },
    },
    {
      path: 'entity',
      component: EntityComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'entidad.read' },
    },
    {
      path: 'circuit',
      component: CircuitComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'circuitos.read' },
    },
    {
      path: 'region',
      component: RegionComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'region.read' },
    },
    {
      path: 'municipality',
      component: MunicipalityComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'ciudad.read' },
    },
    {
      path: 'area',
      component: AreaComponent,
    },
    {
      path: 'subarea',
      component: SubareaComponent,
    },
    {
      path: 'themes',
      component: ThemesComponent,
    },
    {
      path: 'validity',
      component: ValidityComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {
}
