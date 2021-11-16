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
import { ProcedureMassiveComponent } from './manual/procedure-massive/procedure-massive.component';
import { CompanyTypeComponent } from './company-type/company-type.component';
import { RetinerComponent } from './retiner/retiner.component';
import { IvaComponent } from './iva/iva.component';
import { ManualPriceComponent } from './manual/manual-price/manual-price.component';
import { ProcedurePackageComponent } from './procedure/procedure-package/procedure-package.component';
import { FactoryComponent } from './factory/factory.component';
import { CompanyCategoryComponent } from './company-category/company-category.component';
import { CompanyMailComponent } from './company-mail/company-mail.component';
import { CompanyComponent } from './company/company.component';
import { CompanyCiiuComponent } from './company-ciiu/company-ciiu.component';
import { CompanyFiscalComponent } from './company-fiscal/company-fiscal.component';
import { ManualComponent } from './manual/manual.component';
import { CompanyTaxesComponent } from './company-taxes/company-taxes.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
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
import { AdministrationRouteComponent } from './administration-route/administration-route.component';
import { MeasurementUnitsComponent } from './measurement-units/measurement-units.component';
import { ProductConcentrationComponent } from './product-concentration/product-concentration.component';
import { ConsumptionUnitComponent } from './consumption-unit/consumption-unit.component';
import { ProductPresentationComponent } from './product-presentation/product-presentation.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductSubcategoryComponent } from './product-subcategory/product-subcategory.component';
import { ProductComponent } from './product/product.component';
import { InvimaStatusComponent } from './invima-status/invima-status.component';
import { StorageConditionsComponent } from './storage-conditions/storage-conditions.component';
import { RiskComponent } from './risk/risk.component';
import { ProductGenericComponent } from './product-generic/product-generic.component';
import { TypeAssetsComponent } from './type-assets/type-assets.component';
import { FixedAssetsComponent } from './fixed-assets/fixed-assets.component';
import { SectionalCouncilComponent } from './sectional-council/sectional-council.component';
import { DistrictComponent } from './district/district.component';
import { OfficeComponent } from './office/office.component';
import { DependenceComponent } from './dependence/dependence.component';
import { PositionComponent } from './position/position.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { EntityComponent } from './entity/entity.component';
import { RegionComponent } from './region/region.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { PermissionsGuard } from "../../guards/permissions.guard";
import { FormUserComponent } from './users/form-user/form-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ThemesComponent } from './themes/themes.component';
import { CoverageComponent } from './coverage/coverage.component';
import { FirmsComponent } from './firms/firms.component';
import { ContractStatusComponent } from './contract-status/contract-status.component';
import { InsuranceCarrierComponent } from './insurance-carrier/insurance-carrier.component';
import { ModalityComponent } from './modality/modality.component';
import { TypeBriefcaseComponent } from './type-briefcase/type-briefcase.component';
import { TypeContractComponent } from './type-contract/type-contract.component';
import { ObjetionCodeComponent } from './objetion-code/objetion-code.component';
import { ObjetionTypeComponent } from './objetion-type/objetion-type.component';
import { ReceivedByComponent } from './received_by/received-by.component';
import { RepeatedInitialComponent } from './repeated-initial/repeated-initial.component';

const routes: Routes = [{
  path: '',
  component: SettingComponent,
  children: [
    {
      path: 'coverage',
      component: CoverageComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'firms',
      component: FirmsComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'objetion-type',
      component: ObjetionTypeComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'received-by',
      component: ReceivedByComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'repeated-initial',
      component: RepeatedInitialComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'contract-status',
      component: ContractStatusComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'objetion-code',
      component: ObjetionCodeComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'insurance-carrier',
      component: InsuranceCarrierComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'modality',
      component: ModalityComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'type-briefcase',
      component: TypeBriefcaseComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'type-contract',
      component: TypeContractComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'administration-route',
      component: AdministrationRouteComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'type-assets',
      component: TypeAssetsComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'fixed-assets',
      component: FixedAssetsComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'measurement-units',
      component: MeasurementUnitsComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'product-concentration',
      component: ProductConcentrationComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'consumption-unit',
      component: ConsumptionUnitComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'product-presentation',
      component: ProductPresentationComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'product-group',
      component: ProductGroupComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'product',
      component: ProductComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'invima-status',
      component: InvimaStatusComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'storage-conditions',
      component: StorageConditionsComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'risk',
      component: RiskComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'product-category',
      component: ProductCategoryComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'product-subcategory',
      component: ProductSubcategoryComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'product-generic',
      component: ProductGenericComponent,
      data: { permission: 'roles.read' },
    },
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
      path: 'procedure-massive/:id',
      component: ProcedureMassiveComponent,
    },
    {
      path: 'manual-price/:id',
      component: ManualPriceComponent,
    },
    {
      path: 'procedure-package/:id',
      component: ProcedurePackageComponent,
    },
    {
      path: 'procedure-age',
      component: ProcedureAgeComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'factory',
      component: FactoryComponent,
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
      path: 'iva',
      component: IvaComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'retiner',
      component: RetinerComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'company-ciiu',
      component: CompanyCiiuComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'company-fiscal',
      component: CompanyFiscalComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'manual',
      component: ManualComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'payment-terms',
      component: PaymentTermsComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'company',
      component: CompanyComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'company-taxes',
      component: CompanyTaxesComponent,
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
      component: FiscalCharacteristicComponent,
      data: { permission: 'roles.read' },
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
      path: 'themes',
      component: ThemesComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {
}
