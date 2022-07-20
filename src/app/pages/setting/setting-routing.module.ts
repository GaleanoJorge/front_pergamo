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
import { SectionalCouncilComponent } from './sectional-council/sectional-council.component';
import { DistrictComponent } from './district/district.component';
import { OfficeComponent } from './office/office.component';
import { DependenceComponent } from './dependence/dependence.component';
import { PositionComponent } from './position/position.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { EntityComponent } from './entity/entity.component';
import { RegionComponent } from './region/region.component';
import { MunicipalityComponent } from './municipality/municipality.component';
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
import { HourlyFrequencyComponent } from './hourly-frequency/hourly-frequency.component';
import { LocalityComponent } from './locality/locality.component';
import { NeighborhoodOrResidenceComponent } from './neighborhood/neighborhood.component';
import { PadRiskComponent } from './pad-risk/pad-risk.component';
import { TariffComponent } from './tariff/tariff.component';
import { LocationCapacityComponent } from './location-capacity/location-capacity.component';
import { SingleLocationCapacityComponent } from './location-capacity/sigle-location-capacity/single-location-capacity.component';
import { AuthStatusComponent } from './auth-status/auth-status.component';
import { PharmacyRequestComponent } from './pharmacy-request/pharmacy-request.component';
import { BillingComponent } from './billing/billing.component';
import { PharmacyStockComponent } from './pharmacy-stock/pharmacy-stock.component';
import { PharmacyInventoryComponent } from './pharmacy-inventory/pharmacy-inventory.component';
import { PharmacyProductRequestComponent } from './pharmacy-product-request/pharmacy-product-request.component';
import { FormPharmacyUpdateMaxMinComponent } from './pharmacy-update-max-min/form-pharmacy-update-max-min/form-pharmacy-update-max-min.component';
import { TcBillingComponent } from './tc-billing/tc-billing.component';
import { TcRadicationComponent } from './tc-radication/tc-radication.component';
import { TcHumanTalentComponent } from './tc-human-talent/tc-human-talent.component';
import { PharmacyLotComponent } from './pharmacy-lot/pharmacy-lot.component';
import { PharmacyIncomeComponent } from './pharmacy-income/pharmacy-income.component';
import { NomProductComponent } from './nom-product/nom-product.component';
import { FixedConditionComponent } from './fixed-condition/fixed-condition.component';
import { FixedPropertyComponent } from './fixed-property/fixed-property.component';
import { FixedCodeComponent } from './fixed-code/fixed-code.component';
import { FixedAreaCampusComponent } from './fixed-area-campus/fixed-area-campus.component';
import { FixedClasificationComponent } from './fixed-clasification/fixed-clasification.component';
import { FixedTypeComponent } from './fixed-type/fixed-type.component';
import { FixedLocationCampusComponent } from './fixed-location-campus/fixed-location-campus.component';
import { FixedAssetsComponent } from './fixed-assets/fixed-assets.component';
import { FixedAccessoriesComponent } from './fixed-accessories/fixed-accessories.component';
import { FixedInventaryComponent } from './fixed-inventary/fixed-inventary.component';
import { MinimumSalaryComponent } from './minimum-salary/minimum-salary.component';
import { TaxValueUnitComponent } from './tax-value-unit/tax-value-unit.component';
import { MunicipalityIcaComponent } from './municipality-ica/municipality-ica.component';
import { FixedTabComponent } from './fixed-tab/fixed-tab.component';
import { FormFixedRequestComponent } from './fixed-request/form-fixed-request/form-fixed-request.component';
import { FixedTabRequestsComponent } from './fixed-tab-requests/fixed-tab-requests.component';
import { ProductSuppliesComponent } from './product-supplies/product-supplies.component';
import { SuppliesCommComponent } from './supplies-comm/supplies-comm.component';
import { ProductTabComponent } from './product-tab/product-tab.component';
import { BillingRequestPharmacyComponent } from './billing-request-pharmacy/billing-request-pharmacy.component';
import { BillingTabComponent } from './billing-tab/billing-tab.component';
import { tcRentabilityComponent } from './tc-rentability/tc-rentability.component';
import { AssistanceStockComponent } from './assistance-stock/assistance-stock.component';
import { InsumeMassiveComponent } from './manual/insume-massive/insume-massive.component';

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
      path: 'locality',
      component: LocalityComponent,

    },
    {
      path: 'neighborhood',
      component: NeighborhoodOrResidenceComponent,

    },
    {
      path: 'pad-risk',
      component: PadRiskComponent,

    },
    {
      path: 'tariff',
      component: TariffComponent,

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
    },
    {
      path: 'special-field',
      component: SpecialFieldComponent,

    },
    {
      path: 'cost-center',
      component: CostCenterComponent,
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
      path: 'auth-status',
      component: AuthStatusComponent,

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

    }
    ,
    {
      path: 'nom-product',
      component: NomProductComponent,

    },
    {
      path: 'billing',
      component: BillingTabComponent,

    },
    {
      path: 'pharmacy-lot',
      component: PharmacyLotComponent,

    },
    {
      path: 'pharmacy-stock',
      component: PharmacyStockComponent,

    },
    {
      path: 'pharmacy-inventory',
      component: ProductTabComponent,

    },
    {
      path: 'pharmacy-product-request',
      component: PharmacyProductRequestComponent,

    },
    {
      path: 'pharmacy-request',
      component: PharmacyRequestComponent,

    },
    {
      path: 'pharmacy-update-max-min',
      component: FormPharmacyUpdateMaxMinComponent,
    }
    ,
    {
      path: 'pharmacy-income',
      component: PharmacyIncomeComponent,
    }

    ,
    {
      path: 'invima-status',
      component: InvimaStatusComponent,

    },
    {
      path: 'storage-conditions',
      component: StorageConditionsComponent,

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
      path: 'location-capacity/single-location-capacity/:user_id',
      component: SingleLocationCapacityComponent,

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
      // canActivate: [PermissionsGuard],
      // // data: { permission: 'roles.read'},

    },
    {
      path: 'location-capacity',
      component: LocationCapacityComponent,

    },
    {
      path: 'permissions',
      component: PermissionsComponent,
    },
    {
      path: 'manual/procedure-massive/procedure-package/:id',
      component: ProcedurePackage2Component,
    },
    {
      path: 'items',
      component: ItemComponent,
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
      path: 'insume-massive/:id',
      component: InsumeMassiveComponent,
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
    },
    {
      path: 'district',
      component: DistrictComponent,

    },
    {
      path: 'office',
      component: OfficeComponent,
    },
    {
      path: 'dependence',
      component: DependenceComponent,

    },
    {
      path: 'position',
      component: PositionComponent,

    },
    {
      path: 'specialty',
      component: SpecialtyComponent,
    },
    {
      path: 'entity',
      component: EntityComponent,

    },
    {
      path: 'region',
      component: RegionComponent,

    },
    {
      path: 'municipality',
      component: MunicipalityComponent,

    },
    {
      path: 'themes',
      component: ThemesComponent,
    },
    {
      path: 'hourly-frequency',
      component: HourlyFrequencyComponent,
    },
    {
      path: 'tc-billing',
      component: TcBillingComponent,
    },
    {
      path: 'tc-radication',
      component: TcRadicationComponent,
    },
    {
      path: 'tc-human-talent',
      component: TcHumanTalentComponent,
    },
    {
      path: 'fixed-area-campus',
      component: FixedAreaCampusComponent,
    },
    {
      path: 'fixed-code',
      component: FixedCodeComponent,
    },
    {
      path: 'fixed-condition',
      component: FixedConditionComponent,
    },
    {
      path: 'fixed-property',
      component: FixedPropertyComponent,
    },
    {
      path: 'fixed-clasification',
      component: FixedClasificationComponent,
    },
    {
      path: 'fixed-type',
      component: FixedTypeComponent,
    },
    {
      path: 'fixed-location-campus',
      component: FixedLocationCampusComponent,
    },
    {
      path: 'fixed-accessories',
      component: FixedAccessoriesComponent,
    },
    {
      path: 'minimum-salary',
      component: MinimumSalaryComponent,
    },
    {
      path: 'tax-value-unit',
      component: TaxValueUnitComponent,
    },
    {
      path: 'municipality-ica',
      component: MunicipalityIcaComponent,
    },
    {
      path: 'fixed-inventary',
      component: FixedTabComponent,
    },
    {
      path: 'fixed-request',
      component: FormFixedRequestComponent,
    },
    {
      path: 'fixed-access-requests',
      component: FixedTabRequestsComponent,
    },
    {
      path: 'product-supplies',
      component: ProductSuppliesComponent,
    },
    {
      path: 'supplies-comm',
      component: SuppliesCommComponent,
    },
    {
      path: 'tc-rentability',
      component: tcRentabilityComponent,
    },
    {
      path: 'billing-request-pharmacy',
      component: BillingRequestPharmacyComponent,
    },
    {
      path: 'assistance-stock',
      component: AssistanceStockComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {
}
