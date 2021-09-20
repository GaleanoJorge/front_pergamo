import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingComponent } from './setting.component'
import { UsersComponent } from './users/users.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ItemComponent } from './item/item.component';
import { RolesComponent } from './roles/roles.component';
import { CampusComponent } from './campus/campus.component';
import { ProcedureAgeComponent } from './procedure-age/procedure-age.component';
import { RipsTypeFileComponent } from './rips-typefile/rips-typefile.component';
import { RipsTypeComponent } from './rips-type/rips-type.component';
import { PbsTypeComponent } from './pbs-type/pbs-type.component';
import { PurposeServiceComponent } from './purpose-service/purpose-service.component';
import { ProcedureTypeComponent } from './procedure-type/procedure-type.component';
import { ProcedureCategoryComponent } from './procedure-category/procedure-category.component';
import { CompanyKindpersonComponent } from './company-kindperson/company-kindperson.component';
import { CompanyTypeComponent } from './company-type/company-type.component';
import { CompanyCategoryComponent } from './company-category/company-category.component';
import { CompanyMailComponent } from './company-mail/company-mail.component';
import { CompanyDocumentComponent } from './company-document/company-document.component';
import { DocumentAccountComponent } from './document-account/document-account.component';
import { DocumentComponent } from './document/document.component';
import { TaxesComponent } from './taxes/taxes.component';
import { CiiuClassComponent } from './ciiu-class/ciiu-class.component';
import { CiiuGroupComponent } from './ciiu-group/ciiu-group.component';
import { CiiuDivisionComponent } from './ciiu-division/ciiu-division.component';
import { FiscalClasificationComponent } from './fiscal-clasification/fiscal-clasification.component';
import { FiscalCharacteristicComponent } from './fiscal-characteristic/fiscal-characteristic.component';
import { ProcedurePurposeComponent } from './procedure-purpose/procedure-purpose.component';
import { ProcedureComponent } from './procedure/procedure.component';
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
      data: { permission: 'roles.read' },
    },
    {
      path: 'procedure-age',
      component: ProcedureAgeComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'taxes',
      component: TaxesComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'ciiu-group',
      component: CiiuGroupComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'ciiu-division',
      component: CiiuDivisionComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'ciiu-class',
      component: CiiuClassComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'procedure-category',
      component: ProcedureCategoryComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'rips-typefile',
      component: RipsTypeFileComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'rips-type',
      component: RipsTypeComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'pbs-type',
      component: PbsTypeComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'purpose-service',
      component: PurposeServiceComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'procedure-type',
      component: ProcedureTypeComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'company-kindperson',
      component: CompanyKindpersonComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'company-category',
      component: CompanyCategoryComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'company-mail',
      component: CompanyMailComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'company-document',
      component: CompanyDocumentComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'document-account',
      component: DocumentAccountComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'document',
      component: DocumentComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'company-type',
      component: CompanyTypeComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'procedure',
      component: ProcedureComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'procedure-purpose',
      component: ProcedurePurposeComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'fiscal-clasification',
      component: FiscalClasificationComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'fiscal-characteristic',
      component:  FiscalCharacteristicComponent,
      data: { permission: 'roles.read' },
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
