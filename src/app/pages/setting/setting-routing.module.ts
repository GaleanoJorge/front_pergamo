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
import { SpecialAttentionComponent } from './special-attention/special-attention.component';
import { ScopeOfAttentionComponent } from './scope-of-attention/scope-of-attention.component';
import { ProgramComponent } from './program/program.component';
import { PavilionComponent } from './pavilion/pavilion.component';
import { FlatComponent } from './flat/flat.component';
import { BedComponent } from './bed/bed.component';
import { AffiliateTypeComponent } from './affiliate-type/affiliate-type.component';
import { AdmissionRouteComponent } from './admission-route/admission-route.component';
import { ObjetionCodeComponent } from './objetion-code/objetion-code.component';
import { ObjetionTypeComponent } from './objetion-type/objetion-type.component';
import { ReceivedByComponent } from './received_by/received-by.component';
import { RepeatedInitialComponent } from './repeated-initial/repeated-initial.component';
import { GlossModalityComponent } from './gloss-modality/gloss-modality.component';
import { GlossAmbitComponent } from './gloss-ambit/gloss-ambit.component';
import { GlossServiceComponent } from './gloss-service/gloss-service.component';
import { ObjetionCodeResponseComponent } from './objetion-code-response/objetion-code-response.component';
import { ObjetionResponseComponent } from './objetion-response/objetion-response.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { TypeProfessionalComponent } from './type-professional/type-professional.component';
import { SpecialFieldComponent } from './special-field/special-field.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { ObservationNoveltyComponent } from './observation-novelty/observation-novelty.component';
import { InabilityComponent } from './inability/inability.component';
import { ProductMassiveComponent } from './manual/product-massive/product-massive.component';
import { PolicyTypeComponent } from './policy-type/policy-type.component';
import { ProcedurePackage2Component } from './manual/procedure-massive/procedure-package2/procedure-package2.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { DietConsistencyComponent } from './diet-consistency/diet-consistency.component';
import { DietComponentComponent } from './diet-componet/diet-componet.component';
import { DietDayComponent } from './diet-day/diet-day.component';
import { DietWeekComponent } from './diet-week/diet-week.component';
import { DietDishComponent } from './diet-dish/diet-dish.component';
import { DietMenuTypeComponent } from './diet-menu-type/diet-menu-type.component';
import { DietSupplyTypeComponent } from './diet-supply-type/diet-supply-type.component';
import { DietSuppliesComponent } from './diet-supplies/diet-supplies.component';
import { DietMenuComponent } from './diet-menu/diet-menu.component';

const routes: Routes = [{
  path: '',
  component: SettingComponent,
  children: [
    {
      path: 'coverage',
      component: CoverageComponent,

    },
    {
      path: 'firms',
      component: FirmsComponent,

    },
    {
      path: 'objetion-type',
      component: ObjetionTypeComponent,

    },
    {
      path: 'objetion-response',
      component: ObjetionResponseComponent,

    },
    {
      path: 'objetion-code-response',
      component: ObjetionCodeResponseComponent,

    },
    {
      path: 'inability',
      component: InabilityComponent,

    },
    {
      path: 'diet-componet',
      component: DietComponentComponent,

    },
    {
      path: 'diet-consistency',
      component: DietConsistencyComponent,

    },
    {
      path: 'diet-day',
      component: DietDayComponent,

    },
    {
      path: 'diet-day',
      component: DietDayComponent,

    },
    {
      path: 'diet-dish',
      component: DietDishComponent,

    },
    {
      path: 'diet-menu-type',
      component: DietMenuTypeComponent,

    },
    {
      path: 'diet-supplies',
      component: DietSuppliesComponent,

    },
    {
      path: 'diet-supply-type',
      component: DietSupplyTypeComponent,

    },
    {
      path: 'diet-week',
      component: DietWeekComponent,

    },
    {
      path: 'diet-menu',
      component: DietMenuComponent,

    },
    {
      path: 'gloss-modality',
      component: GlossModalityComponent,

    },
    {
      path: 'gloss-ambit',
      component: GlossAmbitComponent,

    },
    {
      path: 'contract-type',
      component: ContractTypeComponent,

    },
    {
      path: 'type-professional',
      component: TypeProfessionalComponent,

    },
    {
      path: 'observation-novelty',
      component: ObservationNoveltyComponent,

    },
    {
      path: 'policy-type',
      component: PolicyTypeComponent,
      data: { permission: 'roles.read' }
    },
    {
      path: 'special-field',
      component: SpecialFieldComponent,

    },
    {
      path: 'cost-center',
      component: CostCenterComponent,
      data: { Permission: 'roles.read' },
    },
    {
      path: 'gloss-service',
      component: GlossServiceComponent,

    },
    {
      path: 'received-by',
      component: ReceivedByComponent,

    },
    {
      path: 'repeated-initial',
      component: RepeatedInitialComponent,

    },
    {
      path: 'contract-status',
      component: ContractStatusComponent,

    },
    {
      path: 'objetion-code',
      component: ObjetionCodeComponent,

    },
    {
      path: 'insurance-carrier',
      component: InsuranceCarrierComponent,

    },
    {
      path: 'modality',
      component: ModalityComponent,

    },
    {
      path: 'special-attention',
      component: SpecialAttentionComponent,

    },
    {
      path: 'scope-of-attention',
      component: ScopeOfAttentionComponent,

    },
    {
      path: 'program',
      component: ProgramComponent,

    },
    {
      path: 'pavilion',
      component: PavilionComponent,

    },
    {
      path: 'flat',
      component: FlatComponent,

    },
    {
      path: 'bed',
      component: BedComponent,

    },
    {
      path: 'diagnosis',
      component: DiagnosisComponent,

    },
    {
      path: 'affiliate-type',
      component: AffiliateTypeComponent,

    },
    {
      path: 'admission-route',
      component: AdmissionRouteComponent,

    },
    {
      path: 'type-briefcase',
      component: TypeBriefcaseComponent,

    },
    {
      path: 'type-contract',
      component: TypeContractComponent,

    },
    {
      path: 'administration-route',
      component: AdministrationRouteComponent,

    },
    {
      path: 'type-assets',
      component: TypeAssetsComponent,

    },
    {
      path: 'fixed-assets',
      component: FixedAssetsComponent,

    },
    {
      path: 'measurement-units',
      component: MeasurementUnitsComponent,

    },
    {
      path: 'product-concentration',
      component: ProductConcentrationComponent,

    },
    {
      path: 'consumption-unit',
      component: ConsumptionUnitComponent,

    },
    {
      path: 'product-presentation',
      component: ProductPresentationComponent,

    },
    {
      path: 'product-group',
      component: ProductGroupComponent,

    },
    {
      path: 'product',
      component: ProductComponent,

    },
    {
      path: 'invima-status',
      component: InvimaStatusComponent,

    },
    {
      path: 'storage-conditions',
      component: StorageConditionsComponent,

    },
    {
      path: 'risk',
      component: RiskComponent,

    },
    {
      path: 'product-category',
      component: ProductCategoryComponent,

    },
    {
      path: 'product-subcategory',
      component: ProductSubcategoryComponent,

    },
    {
      path: 'product-generic',
      component: ProductGenericComponent,

    },
    {
      path: 'users',
      component: UsersComponent,

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

    },
    {
      path: 'permissions',
      component: PermissionsComponent,
      canActivate: [PermissionsGuard],
      data: { permission: 'permisos.read' },
    },
    {
      path: 'manual/procedure-massive/procedure-package/:id',
      component: ProcedurePackage2Component,
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
      path: 'procedure-massive/:id',
      component: ProductMassiveComponent,
    },
    {
      path: 'product-massive/:id',
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

    },
    {
      path: 'factory',
      component: FactoryComponent,

    },
    {
      path: 'taxes',
      component: TaxesComponent,

    },
    {
      path: 'ciiu-group',
      component: CiiuGroupComponent,

    },
    {
      path: 'ciiu-division',
      component: CiiuDivisionComponent,

    },
    {
      path: 'ciiu-class',
      component: CiiuClassComponent,

    },
    {
      path: 'procedure-category',
      component: ProcedureCategoryComponent,

    },
    {
      path: 'rips-typefile',
      component: RipsTypeFileComponent,

    },
    {
      path: 'rips-type',
      component: RipsTypeComponent,

    },
    {
      path: 'pbs-type',
      component: PbsTypeComponent,

    },
    {
      path: 'purpose-service',
      component: PurposeServiceComponent,

    },
    {
      path: 'procedure-type',
      component: ProcedureTypeComponent,

    },
    {
      path: 'company-kindperson',
      component: CompanyKindpersonComponent,

    },
    {
      path: 'company-category',
      component: CompanyCategoryComponent,

    },
    {
      path: 'company-mail/:id',
      component: CompanyMailComponent,

    },
    {
      path: 'company-document/:id',
      component: CompanyDocumentComponent,

    },
    {
      path: 'document-account',
      component: DocumentAccountComponent,

    },
    {
      path: 'document',
      component: DocumentComponent,

    },
    {
      path: 'iva',
      component: IvaComponent,

    },
    {
      path: 'relationship',
      component: RelationshipComponent,
      data: { permission: 'roles.read' },
    },
    {
      path: 'retiner',
      component: RetinerComponent,

    },
    {
      path: 'company-ciiu',
      component: CompanyCiiuComponent,

    },
    {
      path: 'company-fiscal',
      component: CompanyFiscalComponent,

    },
    {
      path: 'manual',
      component: ManualComponent,

    },
    {
      path: 'payment-terms',
      component: PaymentTermsComponent,

    },
    {
      path: 'company',
      component: CompanyComponent,

    },
    {
      path: 'company-taxes/:id',
      component: CompanyTaxesComponent,
    },
    {
      path: 'company-type',
      component: CompanyTypeComponent,

    },
    {
      path: 'procedure',
      component: ProcedureComponent,

    },
    {
      path: 'procedure-purpose',
      component: ProcedurePurposeComponent,

    },
    {
      path: 'fiscal-clasification',
      component: FiscalClasificationComponent,

    },
    {
      path: 'fiscal-characteristic',
      component: FiscalCharacteristicComponent,

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
