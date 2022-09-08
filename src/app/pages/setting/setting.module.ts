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
  NbRadioModule,
  NbTooltipModule,
  NbPopoverModule,
  NbTabsetModule, NbUserModule, NbInputModule, NbSelectModule, NbAlertModule, NbDialogModule, NbIconModule, NbToggleModule, NbLayoutModule, NbSpinnerModule, NbCheckboxModule,
} from '@nebular/theme';
import { RipsTypeFileComponent } from './rips-typefile/rips-typefile.component';
import { ManualComponent } from './manual/manual.component';
import { FormManualComponent } from './manual/form-manual/form-manual.component';
import { RipsTypeComponent } from './rips-type/rips-type.component';
import { ProcedurePackageComponent } from './procedure/procedure-package/procedure-package.component';
import { PbsTypeComponent } from './pbs-type/pbs-type.component';
import { PurposeServiceComponent } from './purpose-service/purpose-service.component';
import { ProcedureTypeComponent } from './procedure-type/procedure-type.component';
import { FormRipsTypeFileComponent } from './rips-typefile/form-rips-typefile/form-rips-typefile.component';
import { FormRipsTypeComponent } from './rips-type/form-rips-type/form-rips-type.component';
import { FormPbsTypeComponent } from './pbs-type/form-pbs-type/form-pbs-type.component';
import { FormPurposeServiceComponent } from './purpose-service/form-purpose-service/form-purpose-service.component';
import { FormProcedureTypeComponent } from './procedure-type/form-procedure-type/form-procedure-type.component';
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
import { FiscalClasificationComponent } from './fiscal-clasification/fiscal-clasification.component';
import { FormFiscalClasificationComponent } from './fiscal-clasification/form-fiscal-clasification/form-fiscal-clasification.component';
import { FiscalCharacteristicComponent } from './fiscal-characteristic/fiscal-characteristic.component';
import { FormFiscalCharacteristicComponent } from './fiscal-characteristic/form-fiscal-characteristic/form-fiscal-characteristic.component';
import { CiiuGroupComponent } from './ciiu-group/ciiu-group.component';
import { FormCiiuGroupComponent } from './ciiu-group/form-ciiu-group/form-ciiu-group.component';
import { CiiuDivisionComponent } from './ciiu-division/ciiu-division.component';
import { FormCiiuClassComponent } from './ciiu-class/form-ciiu-class/form-ciiu-class.component';
import { CiiuClassComponent } from './ciiu-class/ciiu-class.component';
import { FormCiiuDivisionComponent } from './ciiu-division/form-ciiu-division/form-ciiu-division.component';
import { FactoryComponent } from './factory/factory.component';
import { FormFactoryComponent } from './factory/form-factory/form-factory.component';
import { CompanyKindpersonComponent } from './company-kindperson/company-kindperson.component';
import { ProcedureAgeComponent } from './procedure-age/procedure-age.component';
import { ProcedureCategoryComponent } from './procedure-category/procedure-category.component';
import { CompanyCategoryComponent } from './company-category/company-category.component';
import { CompanyTypeComponent } from './company-type/company-type.component';
import { FormCompanyCategoryComponent } from './company-category/form-company-category/form-company-category.component';
import { FormCompanyTypeComponent } from './company-type/form-company-type/form-company-type.component';
import { ProcedurePurposeComponent } from './procedure-purpose/procedure-purpose.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { TaxesComponent } from './taxes/taxes.component';
import { CompanyMailComponent } from './company-mail/company-mail.component';
import { CompanyDocumentComponent } from './company-document/company-document.component';
import { DocumentAccountComponent } from './document-account/document-account.component';
import { DocumentComponent } from './document/document.component';
import { FormCompanyMailComponent } from './company-mail/form-company-mail/form-company-mail.component';
import { FormCompanyDocumentComponent } from './company-document/form-company-document/form-company-document.component';
import { FormDocumentAccountComponent } from './document-account/form-document-account/form-document-account.component';
import { FormDocumentComponent } from './document/form-document/form-document.component';
import { FormTaxesComponent } from './taxes/form-taxes/form-taxes.component';
import { SectionalCouncilComponent } from './sectional-council/sectional-council.component';
import { StatusFieldComponent } from './sectional-council/status-field.component';
import { FormSectionalCouncilComponent } from './sectional-council/form-sectional-council/form-sectional-council.component';
import { FormCompanyKindpersonComponent } from './company-kindperson/form-company-kindperson/form-company-kindperson.component';
import { ActionsComponent } from './sectional-council/actions.component';
import { ActionsProcedureComponent } from './procedure/actions.component';
import { ActionsComponent2 } from './manual/manual-price/actions.component';
import { ActionsManualComponent } from './manual/actions.component';
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
import { FormRegionComponent } from './region/form-region/form-region.component';
import { FormCampusComponent } from './campus/form-campus/form-campus.component';
import { FormProcedureAgeComponent } from './procedure-age/form-procedure-age/form-procedure-age.component';
import { FormProcedureCategoryComponent } from './procedure-category/form-procedure-category/form-procedure-category.component';
import { FormProcedureComponent } from './procedure/form-procedure/form-procedure.component';
import { FormProcedurePurposeComponent } from './procedure-purpose/form-procedure-purpose/form-procedure-purpose.component';
import { RegionComponent } from './region/region.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { FormMunicipalityComponent } from './municipality/form-municipality/form-municipality.component';
import { ThemesComponent } from './themes/themes.component';
import { FormThemesComponent } from './themes/form-themes/form-themes.component';
import { DateFormatPipe } from '../../pipe/date-format.pipe';
import { ActionsUsersComponent } from './users/actions-users.component';
import { FormUserComponent } from './users/form-user/form-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ActionsExtraordinaryComponent } from './users/actions-extraordinary.component';
import { IvaComponent } from './iva/iva.component';
import { FormIvaComponent } from './iva/form-iva/form-iva.component';
import { RetinerComponent } from './retiner/retiner.component';
import { FormRetinerComponent } from './retiner/form-retiner/form-retiner.component';
import { CompanyComponent } from './company/company.component';
import { FormCompanyComponent } from './company/form-company/form-company.component';
import { CompanyCiiuComponent } from './company-ciiu/company-ciiu.component';
import { FormCompanyCiiuComponent } from './company-ciiu/form-company-ciiu/form-company-ciiu.component';
import { CompanyFiscalComponent } from './company-fiscal/company-fiscal.component';
import { FormCompanyFiscalComponent } from './company-fiscal/form-company-fiscal/form-company-fiscal.component';
import { CompanyTaxesComponent } from './company-taxes/company-taxes.component';
import { FormCompanyTaxesComponent } from './company-taxes/form-company-taxes/form-company-taxes.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { FormPaymentTermsComponent } from './payment-terms/form-payment-terms/form-payment-terms.component';
import { ProcedureMassiveComponent } from './manual/procedure-massive/procedure-massive.component';
import { ManualPriceComponent } from './manual/manual-price/manual-price.component';
import { SelectComponent } from './manual/procedure-massive/select.component';
import { AdministrationRouteComponent } from './administration-route/administration-route.component';
import { MeasurementUnitsComponent } from './measurement-units/measurement-units.component';
import { ProductConcentrationComponent } from './product-concentration/product-concentration.component';
import { ConsumptionUnitComponent } from './consumption-unit/consumption-unit.component';
import { ProductPresentationComponent } from './product-presentation/product-presentation.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductSubcategoryComponent } from './product-subcategory/product-subcategory.component';
import { ProductGenericComponent } from './product-generic/product-generic.component';
import { FormAdministrationRouteComponent } from './administration-route/form-administration-route/form-administration-route.component';
import { FormMeasurementUnitsComponent } from './measurement-units/form-measurement-units/form-measurement-units.component';
import { FormProductConcentrationComponent } from './product-concentration/form-product-concentration/form-product-concentration.component';
import { FormConsumptionUnitComponent } from './consumption-unit/form-consumption-unit/form-consumption-unit.component';
import { FormProductPresentationComponent } from './product-presentation/form-product-presentation/form-product-presentation.component';
import { FormProductGroupComponent } from './product-group/form-product-group/form-product-group.component';
import { FormProductCategoryComponent } from './product-category/form-product-category/form-product-category.component';
import { FormProductSubcategoryComponent } from './product-subcategory/form-product-subcategory/form-product-subcategory.component';
import { FormProductGenericComponent } from './product-generic/form-product-generic/form-product-generic.component';
import { FixedAssetsComponent } from './fixed-assets/fixed-assets.component';
import { FormFixedAssetsComponent } from './fixed-assets/form-fixed-assets/form-fixed-assets.component';
import { ProductComponent } from './product/product.component';
import { InvimaStatusComponent } from './invima-status/invima-status.component';
import { StorageConditionsComponent } from './storage-conditions/storage-conditions.component';
import { RiskComponent } from './risk/risk.component';
import { FormProductComponent } from './product/form-product/form-product.component';
import { FormInvimaStatusComponent } from './invima-status/form-invima-status/form-invima-status.component';
import { FormStorageConditionsComponent } from './storage-conditions/form-storage-conditions/form-storage-conditions.component';
import { FormRiskComponent } from './risk/form-risk/form-risk.component';
import { CoverageComponent } from './coverage/coverage.component';
import { FirmsComponent } from './firms/firms.component';
import { InsuranceCarrierComponent } from './insurance-carrier/insurance-carrier.component';
import { ModalityComponent } from './modality/modality.component';
import { TypeBriefcaseComponent } from './type-briefcase/type-briefcase.component';
import { TypeContractComponent } from './type-contract/type-contract.component';
import { FormCoverageComponent } from './coverage/form-coverage/form-coverage.component';
import { FormFirmsComponent } from './firms/form-firms/form-firms.component';
import { FormInsuranceCarrierComponent } from './insurance-carrier/form-insurance-carrier/form-insurance-carrier.component';
import { FormModalityComponent } from './modality/form-modality/form-modality.component';
import { FormTypeBriefcaseComponent } from './type-briefcase/form-type-briefcase/form-type-briefcase.component';
import { FormTypeContractComponent } from './type-contract/form-type-contract/form-type-contract.component';
import { ContractStatusComponent } from './contract-status/contract-status.component';
import { FormContractStatusComponent } from './contract-status/form-contract-status/form-contract-status.component';
import { SpecialAttentionComponent } from './special-attention/special-attention.component';
import { FormScopeOfAttentionComponent } from './scope-of-attention/form-scope-of-attention/form-scope-of-attention.component';
import { FormSpecialAttentionComponent } from './special-attention/form-special-attention/form-special-attention.component';
import { ScopeOfAttentionComponent } from './scope-of-attention/scope-of-attention.component';
import { ProgramComponent } from './program/program.component';
import { FormProgramComponent } from './program/form-program/form-program.component';
import { PavilionComponent } from './pavilion/pavilion.component';
import { FormPavilionComponent } from './pavilion/form-pavilion/form-pavilion.component';
import { FlatComponent } from './flat/flat.component';
import { FormFlatComponent } from './flat/form-flat/form-flat.component';
import { BedComponent } from './bed/bed.component';
import { FormBedComponent } from './bed/form-bed/form-bed.component';
import { AffiliateTypeComponent } from './affiliate-type/affiliate-type.component';
import { FormAffiliateTypeComponent } from './affiliate-type/form-affiliate-type/form-affiliate-type.component';
import { AdmissionRouteComponent } from './admission-route/admission-route.component';
import { FormAdmissionRouteComponent } from './admission-route/form-admission-route/form-admission-route.component';
import { ObjetionCodeComponent } from './objetion-code/objetion-code.component';
import { FormObjetionCodeComponent } from './objetion-code/form-objetion-code/form-objetion-code.component';
import { ObjetionTypeComponent } from './objetion-type/objetion-type.component';
import { FormObjetionTypeComponent } from './objetion-type/form-objetion-type/form-objetion-type.component';
import { ReceivedByComponent } from './received_by/received-by.component';
import { FormReceivedByComponent } from './received_by/form-received-by/form-received-by.component';
import { RepeatedInitialComponent } from './repeated-initial/repeated-initial.component';
import { FormRepeatedInitialComponent } from './repeated-initial/form-repeated-initial/form-repeated-initial.component';
import { GlossModalityComponent } from './gloss-modality/gloss-modality.component';
import { FormGlossModalityComponent } from './gloss-modality/form-gloss-modality/form-gloss-modality.component';
import { GlossAmbitComponent } from './gloss-ambit/gloss-ambit.component';
import { FormGlossAmbitComponent } from './gloss-ambit/form-gloss-ambit/form-gloss-ambit.component';
import { GlossServiceComponent } from './gloss-service/gloss-service.component';
import { FormGlossServiceComponent } from './gloss-service/form-gloss-service/form-gloss-service.component';
import { ObjetionCodeResponseComponent } from './objetion-code-response/objetion-code-response.component';
import { FormObjetionCodeResponseComponent } from './objetion-code-response/form-objetion-code-response/form-objetion-code-response.component';
import { ObjetionResponseComponent } from './objetion-response/objetion-response.component';
import { FormObjetionResponseComponent } from './objetion-response/form-objetion-response/form-objetion-response.component';
import { FormDiagnosisComponent } from './diagnosis/form-diagnosis/form-diagnosis.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { FormSpecialFieldComponent } from './special-field/form-special-field/form-special-field.component';
import { SpecialFieldComponent } from './special-field/special-field.component';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { FormContractTypeComponent } from './contract-type/form-contract-type/form-contract-type.component';
import { FormTypeProfessionalComponent } from './type-professional/form-type-professional/form-type-professional.component';
import { TypeProfessionalComponent } from './type-professional/type-professional.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { FormCostCenterComponent } from './cost-center/form-cost-center/form-cost-center.component';
import { FormObservationNoveltyComponent } from './observation-novelty/form-observation-novelty/form-observation-novelty.component';
import { ObservationNoveltyComponent } from './observation-novelty/observation-novelty.component';
import { InabilityComponent } from './inability/inability.component';
import { FormInabilityComponent } from './inability/form-inability/form-inability.component';
import { FormAdmissionsPatientComponent } from '../admissions/admissions-patient/form-admissions-patient/form-admissions-patient.component';
import { AdmissionsPatientComponent } from '../admissions/admissions-patient/admissions-patient.component';
import { FormManualProcedureComponent } from './manual/form-manual-procedure/form-manual-procedure.component';
import { FormManualProductComponent } from './manual/form-manual-product/form-manual-product.component';
import { ProductMassiveComponent } from './manual/product-massive/product-massive.component';
import { ActionsComponentProcedure } from './manual/procedure-massive/actions.component';
import { ActionsComponentProduct } from './manual/product-massive/actions.component';
import { FormPolicyTypeComponent } from './policy-type/form-policy-type/form-policy-type.component';
import { PolicyTypeComponent } from './policy-type/policy-type.component';
import { ProcedurePackage2Component } from './manual/procedure-massive/procedure-package2/procedure-package2.component';
import { SelectProcedureComponent } from './procedure/procedure-package/select-procedure.component';
import { DietConsistencyComponent } from './diet-consistency/diet-consistency.component';
import { FormDietConsistencyComponent } from './diet-consistency/form-diet-consistency/form-diet-consistency.component';
import { DietComponentComponent } from './diet-componet/diet-componet.component';
import { FormDietComponentComponent } from './diet-componet/form-diet-componet/form-diet-componet.component';
import { DietDayComponent } from './diet-day/diet-day.component';
import { FormDietDayComponent } from './diet-day/form-diet-day/form-diet-day.component';
import { DietWeekComponent } from './diet-week/diet-week.component';
import { FormDietWeekComponent } from './diet-week/form-diet-week/form-diet-week.component';
import { DietDishComponent } from './diet-dish/diet-dish.component';
import { FormDietDishComponent } from './diet-dish/form-diet-dish/form-diet-dish.component';
import { DietMenuTypeComponent } from './diet-menu-type/diet-menu-type.component';
import { FormDietMenuTypeComponent } from './diet-menu-type/form-diet-menu-type/form-diet-menu-type.component';
import { DietSupplyTypeComponent } from './diet-supply-type/diet-supply-type.component';
import { FormDietSupplyTypeComponent } from './diet-supply-type/form-diet-supply-type/form-diet-supply-type.component';
import { DietSuppliesComponent } from './diet-supplies/diet-supplies.component';
import { FormDietSuppliesComponent } from './diet-supplies/form-diet-supplies/form-diet-supplies.component';
import { DishStockPackageComponent } from './diet-dish/dish-stock-package/dish-stock-package.component';
import { SelectDishStockComponent } from './diet-dish/dish-stock-package/select-dish-stock.component';
import { AmountDishStockComponent } from './diet-dish/dish-stock-package/amount-dish-stock.component';
import { DietMenuComponent } from './diet-menu/diet-menu.component';
import { Actions2Component } from './diet-menu/actions.component';
import { FormDietMenuComponent } from './diet-menu/form-diet-menu/form-diet-menu.component';
import { DishPackageComponent } from './diet-menu/dish-package/dish-package.component';
import { SelectDishComponent } from './diet-menu/dish-package/select-dish.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { FormRelationshipComponent } from './relationship/form-relationship/form-relationship.component';
import { ActionsCompanyComponent } from './company/actions.component';
import { ActionsComponentEditDelete } from './company-mail/actions.component';
import { ActionsCDComponent } from './company-document/actionsCD.component';
import { FormHourlyFrequencyComponent } from './hourly-frequency/form-hourly-frequency/form-hourly-frequency.component';
import { HourlyFrequencyComponent } from './hourly-frequency/hourly-frequency.component';
import { ActionsDishComponent } from './diet-dish/actions-dish.component';
import { LocalityComponent } from './locality/locality.component';
import { FormLocalityComponent } from './locality/form-locality/form-locality.component';
import { FormNeighborhoodOrResidenceComponent } from './neighborhood/form-neighborhood/form-neighborhood.component';
import { NeighborhoodOrResidenceComponent } from './neighborhood/neighborhood.component';
import { PadRiskComponent } from './pad-risk/pad-risk.component';
import { FormPadRiskComponent } from './pad-risk/form-pad-risk/form-pad-risk.component';
import { TariffComponent } from './tariff/tariff.component';
import { FormTariffComponent } from './tariff/form-tariff/form-tariff.component';
import { LocationCapacityComponent } from './location-capacity/location-capacity.component';
import { ActionsLocationCapacityComponent } from './location-capacity/actions-location-capacity.component';
import { SingleLocationCapacityComponent } from './location-capacity/sigle-location-capacity/single-location-capacity.component';
import { ActionsSingleLocationCapacityComponent } from './location-capacity/sigle-location-capacity/actions-single-location-capacity.component';
import { FormLocationCapacityComponent } from './location-capacity/sigle-location-capacity/form-location-capacity/form-location-capacity.component';
import { FormFinancialDataComponent } from './users/form-financial-data/form-financial-data.component';
import { AuthStatusComponent } from './auth-status/auth-status.component';
import { FormAuthStatusComponent } from './auth-status/form-auth-status/form-auth-status.component';
import { FormEditLocationCapacityComponent } from './location-capacity/sigle-location-capacity/form-edit-location-capacity/form-edit-location-capacity.component';
import { BillingComponent } from './billing/billing.component';
import { FormBillingComponent } from './billing/form-billing/form-billing.component';
import { PharmacyStockComponent } from './pharmacy-stock/pharmacy-stock.component';
import { FormPharmacyStockComponent } from './pharmacy-stock/form-pharmacy-stock/form-pharmacy-stock.component';
import { PharmacyUpdateMaxMinComponent } from './pharmacy-update-max-min/pharmacy-update-max-min.component';
import { FormPharmacyUpdateMaxMinComponent } from './pharmacy-update-max-min/form-pharmacy-update-max-min/form-pharmacy-update-max-min.component';
import { ProdBillingPackageComponent } from './billing/prod-billing-package/prod-billing-package.component';
import { AmountBillingComponent } from './billing/prod-billing-package/amount-billing.component';
import { SelectProductBillingComponent } from './billing/prod-billing-package/select-prod-billing.component';
import { AmountProcedureComponent } from './procedure/procedure-package/amount-procedure-package.component';
import { DynamicProcedurePackageComponent } from './procedure/procedure-package/dynamic-procedure-package.component';
import { TcHumanTalentComponent } from './tc-human-talent/tc-human-talent.component';
import { TcRadicationComponent } from './tc-radication/tc-radication.component';
import { TcBillingComponent } from './tc-billing/tc-billing.component';
import { AmountUnitBillingComponent } from './billing/prod-billing-package/amount-unit-billing.component';
import { BaseLocationPackageComponent } from './location-capacity/sigle-location-capacity/base-location-package/base-location-package.component';
import { NomProductComponent } from './nom-product/nom-product.component';
import { FormNomProductComponent } from './nom-product/form-nom-product/form-nom-product.component';
import { FormFixedAreaCampusComponent } from './fixed-area-campus/form-fixed-area-campus/form-fixed-area-campus.component';
import { FixedAreaCampusComponent } from './fixed-area-campus/fixed-area-campus.component';
import { FixedCodeComponent } from './fixed-code/fixed-code.component';
import { FixedConditionComponent } from './fixed-condition/fixed-condition.component';
import { FixedPropertyComponent } from './fixed-property/fixed-property.component';
import { FormFixedConditionComponent } from './fixed-condition/form-fixed-condition/form-fixed-condition.component';
import { FormFixedCodeComponent } from './fixed-code/form-fixed-code/form-fixed-code.component';
import { FormFixedPropertyComponent } from './fixed-property/form-fixed-property/form-fixed-property.component';
import { FixedClasificationComponent } from './fixed-clasification/fixed-clasification.component';
import { FormFixedClasificationComponent } from './fixed-clasification/form-fixed-clasification/form-fixed-clasification.component';
import { FormFixedTypeComponent } from './fixed-type/form-fixed-type/form-fixed-type.component';
import { FixedTypeComponent } from './fixed-type/fixed-type.component';
import { FormFixedLocationCampusComponent } from './fixed-location-campus/form-fixed-location-campus/form-fixed-location-campus.component';
import { FixedLocationCampusComponent } from './fixed-location-campus/fixed-location-campus.component';
import { FixedAccessoriesComponent } from './fixed-accessories/fixed-accessories.component';
import { FormFixedAccessoriesComponent } from './fixed-accessories/form-fixed-accessories/form-fixed-accessories.component';
import { FormFixedInventaryComponent } from './fixed-inventary/form-fixed-inventary/form-fixed-inventary.component';
import { FixedInventaryComponent } from './fixed-inventary/fixed-inventary.component';
import { ActionsInFixComponent } from './fixed-inventary/actionsInFix.component';
import { MinimumSalaryComponent } from './minimum-salary/minimum-salary.component';
import { FormMinimumSalaryComponent } from './minimum-salary/form-minimum-salary/form-minimum-salary.component';
import { TaxValueUnitComponent } from './tax-value-unit/tax-value-unit.component';
import { FormTaxValueUnitComponent } from './tax-value-unit/form-tax-value-unit/form-tax-value-unit.component';
import { MunicipalityIcaComponent } from './municipality-ica/municipality-ica.component';
import { FormMunicipalityIcaComponent } from './municipality-ica/form-municipality-ica/form-municipality-ica.component';
import { FormFixedRequestComponent } from './fixed-request/form-fixed-request/form-fixed-request.component';
import { FixedRequestComponent } from './fixed-request/fixed-request.component';
import { FixedInventaryAccesoriesComponent } from './fixed-inventary-accesories/fixed-inventary-accesories.component';
import { ActionsInvAccesComponent } from './fixed-inventary-accesories/actionsInAcces.component';
import { FormFixedInventaryAccesoriesComponent } from './fixed-inventary-accesories/form-fixed-inventary-accesories/form-fixed-inventary-accesories.component';
import { FixedTabComponent } from './fixed-tab/fixed-tab.component';
import { FixedInventaryAddComponent } from './fixed-inventary-add/fixed-inventary-add.component';
import { FixedInventaryAddAccessComponent } from './fixed-inventary-add-access/fixed-inventary-add-access.component';
import { FormFixedInventaryAddAccessComponent } from './fixed-inventary-add-access/form-fixed-inventary_add-access/form-fixed-inventary-add-access.component';
import { FixedAccessRequestsComponent } from './fixed-access-requests/fixed-access-requests.component';
import { FormFixedAccessRequestsComponent } from './fixed-access-requests/form-fixed-access-requests/form-fixed-access-requests.component';
import { FormFixedInventaryAddComponent } from './fixed-inventary-add/form-fixed-inventary-add/form-fixed-inventary-add.component';
import { ActionsAccReqComponent } from './fixed-access-requests/actions.component';
import { AmountRequestsComponent } from './fixed-access-requests/requests-package/amountRequests.component';
import { RequestsPackageComponent } from './fixed-access-requests/requests-package/requests-package.component';
import { SelectRequestsComponent } from './fixed-access-requests/requests-package/select-requests.component';
import { FixedTabRequestsComponent } from './fixed-tab-requests/fixed-tab-requests.component';
import { AssetsRequestsPackageComponent } from './fixed-assets-requests/assets-requests-package/assets-requests-package.component';
import { AssetsSelectRequestsComponent } from './fixed-assets-requests/assets-requests-package/assets-select-requests.component';
import { FormFixedAssetsRequestsComponent } from './fixed-assets-requests/form-fixed-assets-requests/form-fixed-assets-requests.component';
import { ActionsAssReqComponent } from './fixed-assets-requests/actions.component';
import { FixedAssetsRequestsComponent } from './fixed-assets-requests/fixed-assets-requests.component';
import { ProductSuppliesComponent } from './product-supplies/product-supplies.component';
import { FormProductSuppliesComponent } from './product-supplies/form-product-supplies/form-product-supplies.component';
import { SuppliesCommComponent } from './supplies-comm/supplies-comm.component';
import { FormSuppliesCommComponent } from './supplies-comm/form-supplies-comm/form-supplies-comm.component';
import { AmountSuppliesComponent } from './billing/prod-supplies-package/amount-supplies.component';
import { AmountUnitSuppliesComponent } from './billing/prod-supplies-package/amount-unit-supplies.component';
import { ProdSuppliesPackageComponent } from './billing/prod-supplies-package/prod-supplies-package.component';
import { SelectProductSuppliesComponent } from './billing/prod-supplies-package/select-prod-supplies.component';
import { FormConfirmDisabledComponent } from './users/form-confirm-disabled/form-confirm-disabled.component';
import { IvaBillingComponent } from './billing/prod-billing-package/iva-billing.component';
import { IvaSuppliesComponent } from './billing/prod-supplies-package/iva-supplies.component';
import { BillingTabComponent } from './billing-tab/billing-tab.component';
import { BillingRequestPharmacyMostComponent } from './billing-request-pharmacy-most/billing-request-pharmacy-most.component';
import { tcRentabilityComponent } from './tc-rentability/tc-rentability.component';
import { BillingPadPrefixComponent } from './billing-pad-prefix/billing-pad-prefix.component';
import { FormBillingPadPrefixComponent } from './billing-pad-prefix/form-billing-pad-prefix/form-billing-pad-prefix.component';
import { BillingPadConsecutiveComponent } from './billing-pad-consecutive/billing-pad-consecutive.component';
import { FormBillingPadConsecutiveComponent } from './billing-pad-consecutive/form-billing-pad-consecutive/form-billing-pad-consecutive.component';
import { FixedFormNomProductComponent } from './fixed-nom-product/form-fixed-nom-product/form-fixed-nom-product.component';
import { FixedNomProductComponent } from './fixed-nom-product/fixed-nom-product.component';
import { AssistanceStockComponent } from './assistance-stock/assistance-stock.component';
import { FormAssistanceStockComponent } from './assistance-stock/form-assistance-stock/form-assistance-stock.component';
import { AssistanceStockReqComponent } from './assistance-stock/form-assistance-stock/assistance-stock-req.component';
import { ActionsStockComponent } from './assistance-stock/actions.component';
import { ActionsComponentInsume } from './manual/insume-massive/actions.component';
import { InsumeMassiveComponent } from './manual/insume-massive/insume-massive.component';
import { FormManualInsumeComponent } from './manual/form-manual-insume/form-manual-insume.component';
import { TcCollectionComponent } from './tc-collection/tc-collection.component';
import { FixedAssetsRequestsPatientComponent } from './fixed-assets-requests-patient/fixed-assets-requests-patient.component';
import { ActionsAssReqPatientComponent } from './fixed-assets-requests-patient/actions.component';
import { FormFixedAssetsRequestsPatientComponent } from './fixed-assets-requests-patient/form-fixed-assets-requests-patient/form-fixed-assets-requests-patient.component';
import { AssetsSelectRequestsPatientComponent } from './fixed-assets-requests-patient/assets-requests-patient-package/assets-select-requests-patient.component';
import { AssetsRequestsPatientPackageComponent } from './fixed-assets-requests-patient/assets-requests-patient-package/assets-requests-patient-package.component';
import { FormFixedStockComponent } from './fixed-stock/form-fixed-stock/form-fixed-stock.component';
import { FixedStockComponent } from './fixed-stock/fixed-stock.component';
import { UserComponent } from './pharmacy-stock/user-package/user.component';
import { UserPackageComponent } from './pharmacy-stock/user-package/user-package.component';
import { ActionPharmaComponent } from './pharmacy-stock/actions.component';
import { ServicesComponent } from './pharmacy-stock/services-package/services.component';
import { ServicesPackageComponent } from './pharmacy-stock/services-package/services-package.component';
import { UserFixedPackageComponent } from './fixed-stock/user-fixed-package/user-fixed-package.component';
import { UserFixedComponent } from './fixed-stock/user-fixed-package/user-fixed.component';
import { ActionFixedComponent } from './fixed-stock/actions.component';
import { FormDrugReturnedComponent } from './assistance-stock/form-drug-returned/form-drug-returned.component';
import { RoleCheckComponent } from './users/role-package/role-check.component';
import { RolePackageComponent } from './users/role-package/role-package.component';
import { ServicesFixedPackageComponent } from './fixed-stock/services-fixed-package/services-fixed-package.component';
import { ServicesFixedComponent } from './fixed-stock/services-fixed-package/services-fixed.component';
import { MedicalDiaryComponent } from './medical-diary/medical-diary.component';
import { FormMedicalDiaryComponent } from './medical-diary/form-medical-diary/form-medical-diary.component';
import { MedicalComponent } from './medical-diary/medical/medical.component';
import { ActionsMedicalDiaryComponent } from './medical-diary/actions.component';
import { ActionsMedicalComponent } from './medical-diary/medical/actions.component';
import { FixedPatientsComponent } from './fixed-patients/fixed-patients.component';
import { FixedMovementsComponent } from './fixed-movements/fixed-movements.component';
import { FixedInventaryAddPatientsComponent } from './fixed-inventary-add-patients/fixed-inventary-add-patients.component';
import { FormFixedInventaryAddPatientsComponent } from './fixed-inventary-add-patients/form-fixed-inventary-add-patients/form-fixed-inventary-add-patients.component';
import { FormFixedReturnComponent } from './fixed-return/form-fixed-return/form-fixed-return.component';
import { ActionsReturnSedComponent } from './fixed-return/actions-return.component';
import { FixedReturnComponent } from './fixed-return/fixed-return.component';
import { FormFixedReturnPatientsComponent } from './fixed-return-patients/form-fixed-return-patients/form-fixed-return-patients.component';
import { ActionsReturnPatiComponent } from './fixed-return-patients/actions-return.component';
import { FixedReturnPatientsComponent } from './fixed-return-patients/fixed-return-patients.component';
import { FormFixedDeniedComponent } from './fixed-assets-requests-patient/form-fixed-denied/form-fixed-denied.component';
import { FormTariffConfirmDisabledComponent } from './tariff/form-tariff-confirm-disabled/form-tariff-confirm-disabled.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbRadioModule,
    NbButtonModule,
    NbDialogModule.forRoot(),
    NbListModule,
    NbInputModule,
    NbToggleModule,
    NbSelectModule,
    NbPopoverModule,
    NbTooltipModule,
    NbUserModule,
    NbAlertModule,
    SettingRoutingModule,
    PagesModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbLayoutModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbAccordionModule,
  ],
  declarations: [
    RoleCheckComponent,
    RolePackageComponent,
    ActionsComponentInsume,
    InsumeMassiveComponent,
    FormManualInsumeComponent,
    ActionsStockComponent,
    AssistanceStockReqComponent,
    AuthStatusComponent,
    FormAuthStatusComponent,
    ActionsCDComponent,
    ActionsComponentEditDelete,
    RelationshipComponent,
    FormRelationshipComponent,
    ActionsCompanyComponent,
    ActionsComponentProcedure,
    ActionsComponentProduct,
    AmountProcedureComponent,
    DynamicProcedurePackageComponent,
    SelectProcedureComponent,
    ProductMassiveComponent,
    FormManualProcedureComponent,
    FormManualProductComponent,
    FormPolicyTypeComponent,
    PolicyTypeComponent,
    FormBedComponent,
    BedComponent,
    MedicalComponent,
    ActionsMedicalDiaryComponent,
    ActionsMedicalComponent,
    RolesPermissionsComponent,
    FormObservationNoveltyComponent,
    ObservationNoveltyComponent,
    FormSpecialFieldComponent,
    SpecialFieldComponent,
    ContractTypeComponent,
    FormContractTypeComponent,
    FormTypeProfessionalComponent,
    TypeProfessionalComponent,
    SpecialAttentionComponent,
    FormScopeOfAttentionComponent,
    FormSpecialAttentionComponent,
    ScopeOfAttentionComponent,
    CostCenterComponent,
    FormCostCenterComponent,
    ProgramComponent,
    FormProgramComponent,
    PavilionComponent,
    FormPavilionComponent,
    FlatComponent,
    FormFlatComponent,
    BedComponent,
    FormBedComponent,
    AffiliateTypeComponent,
    FormAffiliateTypeComponent,
    AdmissionRouteComponent,
    FormAdmissionRouteComponent,
    ContractStatusComponent,
    FormContractStatusComponent,
    CoverageComponent,
    FirmsComponent,
    InsuranceCarrierComponent,
    ModalityComponent,
    TypeBriefcaseComponent,
    TypeContractComponent,
    ActionsProcedureComponent,
    FormCoverageComponent,
    FormFirmsComponent,
    MedicalDiaryComponent,
    FormMedicalDiaryComponent,
    ProcedurePackageComponent,
    ProcedurePackage2Component,
    FormInsuranceCarrierComponent,
    FormModalityComponent,
    FormTypeBriefcaseComponent,
    FormTypeContractComponent,
    FixedAssetsComponent,
    FormFixedAssetsComponent,
    AdministrationRouteComponent,
    MeasurementUnitsComponent,
    ProductConcentrationComponent,
    ConsumptionUnitComponent,
    ProductPresentationComponent,
    ProductGroupComponent,
    ProductCategoryComponent,
    ProductSubcategoryComponent,
    ProductGenericComponent,
    ProductComponent,
    InvimaStatusComponent,
    StorageConditionsComponent,
    RiskComponent,
    FormProductComponent,
    FormInvimaStatusComponent,
    FormStorageConditionsComponent,
    FormRiskComponent,
    FormAdministrationRouteComponent,
    FormMeasurementUnitsComponent,
    FormProductConcentrationComponent,
    FormConsumptionUnitComponent,
    FormProductPresentationComponent,
    FormProductGroupComponent,
    FormProductCategoryComponent,
    FormProductSubcategoryComponent,
    FormProductGenericComponent,
    FactoryComponent,
    FormFactoryComponent,
    IvaComponent,
    FormIvaComponent,
    RetinerComponent,
    FormRetinerComponent,
    CompanyComponent,
    FormCompanyComponent,
    CompanyCiiuComponent,
    FormCompanyCiiuComponent,
    CompanyFiscalComponent,
    FormCompanyFiscalComponent,
    ActionsComponent2,
    ManualComponent,
    ProcedureMassiveComponent,
    ManualPriceComponent,
    FormManualComponent,
    CompanyTaxesComponent,
    FormCompanyTaxesComponent,
    SelectComponent,
    PaymentTermsComponent,
    FormPaymentTermsComponent,
    RipsTypeFileComponent,
    RipsTypeComponent,
    PbsTypeComponent,
    PurposeServiceComponent,
    ProcedureTypeComponent,
    FormRipsTypeFileComponent,
    ActionsManualComponent,
    FormRipsTypeComponent,
    FormPbsTypeComponent,
    FormPurposeServiceComponent,
    FormProcedureTypeComponent,
    SettingComponent,
    FormFiscalClasificationComponent,
    FiscalClasificationComponent,
    FormFiscalCharacteristicComponent,
    FiscalCharacteristicComponent,
    CompanyMailComponent,
    CompanyDocumentComponent,
    DocumentAccountComponent,
    DocumentComponent,
    FormCompanyDocumentComponent,
    FormCompanyMailComponent,
    FormDocumentAccountComponent,
    FormCiiuClassComponent,
    CiiuClassComponent,
    FormDocumentComponent,
    CompanyTypeComponent,
    FormCompanyTypeComponent,
    UsersComponent,
    FormConfirmDisabledComponent,
    RolesComponent,
    FormTaxesComponent,
    FormCiiuGroupComponent,
    CiiuGroupComponent,
    FormCiiuDivisionComponent,
    CiiuDivisionComponent,
    TaxesComponent,
    PermissionsComponent,
    RolesPermissionsComponent,
    ItemComponent,
    DynamicItemComponent,
    FormCampusComponent,
    CampusComponent,
    ProcedureAgeComponent,
    ProcedureCategoryComponent,
    ProcedurePurposeComponent,
    ProcedureComponent,
    SectionalCouncilComponent,
    FormCompanyCategoryComponent,
    CompanyCategoryComponent,
    StatusFieldComponent,
    FormSectionalCouncilComponent,
    ActionsComponent,
    DistrictComponent,
    FormDistrictComponent,
    CompanyKindpersonComponent,
    FormCompanyKindpersonComponent,
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
    FormRegionComponent,
    RegionComponent,
    MunicipalityComponent,
    FormMunicipalityComponent,
    FormProcedureCategoryComponent,
    FormProcedureAgeComponent,
    FormProcedureComponent,
    FormProcedurePurposeComponent,
    ThemesComponent,
    FormThemesComponent,
    ActionsUsersComponent,
    FormUserComponent,
    EditUserComponent,
    ActionsExtraordinaryComponent,
    ObjetionCodeComponent,
    FormObjetionCodeComponent,
    ObjetionTypeComponent,
    FormObjetionTypeComponent,
    ReceivedByComponent,
    FormReceivedByComponent,
    RepeatedInitialComponent,
    FormRepeatedInitialComponent,
    GlossModalityComponent,
    FormGlossModalityComponent,
    GlossAmbitComponent,
    FormDrugReturnedComponent,
    FormGlossAmbitComponent,
    GlossServiceComponent,
    FormGlossServiceComponent,
    ObjetionCodeResponseComponent,
    FormObjetionCodeResponseComponent,
    ObjetionResponseComponent,
    FormObjetionResponseComponent,
    FormDiagnosisComponent,
    DiagnosisComponent,
    InabilityComponent,
    FormInabilityComponent,
    DietComponentComponent,
    FormDietComponentComponent,
    DietConsistencyComponent,
    FormDietConsistencyComponent,
    DietDayComponent,
    FormDietDayComponent,
    DietDishComponent,
    FormDietDishComponent,
    DishStockPackageComponent,
    SelectDishStockComponent,
    AmountDishStockComponent,
    DietMenuTypeComponent,
    FormDietMenuTypeComponent,
    DietSuppliesComponent,
    FormDietSuppliesComponent,
    DietSupplyTypeComponent,
    FormDietSupplyTypeComponent,
    DietWeekComponent,
    FormDietWeekComponent,
    DietMenuComponent,
    Actions2Component,
    FormDietMenuComponent,
    DishPackageComponent,
    SelectDishComponent,
    FormHourlyFrequencyComponent,
    HourlyFrequencyComponent,
    LocalityComponent,
    FormLocalityComponent,
    NeighborhoodOrResidenceComponent,
    FormNeighborhoodOrResidenceComponent,
    PadRiskComponent,
    FormPadRiskComponent,
    TariffComponent,
    FormTariffComponent,
    FormTariffConfirmDisabledComponent,
    LocationCapacityComponent,
    FormEditLocationCapacityComponent,
    ActionsLocationCapacityComponent,
    SingleLocationCapacityComponent,
    ActionsSingleLocationCapacityComponent,
    FormLocationCapacityComponent,
    FormFinancialDataComponent,
    ActionsDishComponent,

    BillingComponent,
    FormBillingComponent,
    BillingTabComponent,
    ActionsComponent,
    ProdBillingPackageComponent,
    SelectProductBillingComponent,
    AmountBillingComponent,
    AmountUnitBillingComponent,
    IvaBillingComponent,
    IvaSuppliesComponent,
    PharmacyStockComponent,
    FormPharmacyStockComponent,

    PharmacyUpdateMaxMinComponent,
    FormPharmacyUpdateMaxMinComponent,

    TcBillingComponent,
    TcRadicationComponent,
    TcHumanTalentComponent,
    TcCollectionComponent,

    BaseLocationPackageComponent,

    NomProductComponent,
    FormNomProductComponent,
    BaseLocationPackageComponent,
    FormFixedAreaCampusComponent,
    FixedAreaCampusComponent,
    FormFixedCodeComponent,
    FixedCodeComponent,
    FormFixedConditionComponent,
    FixedConditionComponent,
    FormFixedPropertyComponent,
    FixedPropertyComponent,
    FixedClasificationComponent,
    FormFixedClasificationComponent,
    FormFixedTypeComponent,
    FixedTypeComponent,
    FormFixedLocationCampusComponent,
    FixedLocationCampusComponent,
    FixedAccessoriesComponent,
    FormFixedAccessoriesComponent,
    FixedInventaryComponent,
    FormFixedInventaryComponent,
    ActionsInFixComponent,
    FormNomProductComponent,

    MinimumSalaryComponent,
    FormMinimumSalaryComponent,
    TaxValueUnitComponent,
    FormTaxValueUnitComponent,
    MunicipalityIcaComponent,
    FormMunicipalityIcaComponent,
    FormFixedRequestComponent,
    FixedRequestComponent,
    FixedInventaryAccesoriesComponent,
    FormFixedInventaryAccesoriesComponent,
    ActionsInvAccesComponent,
    FixedTabComponent,
    FixedInventaryAddComponent,
    FormFixedInventaryAddComponent,
    FixedInventaryAddAccessComponent,
    FormFixedInventaryAddAccessComponent,
    FixedAccessRequestsComponent,
    FormFixedAccessRequestsComponent,
    ActionsAccReqComponent,

    AmountRequestsComponent,
    SelectRequestsComponent,
    RequestsPackageComponent,

    FixedTabRequestsComponent,
    AssetsRequestsPackageComponent,
    AssetsSelectRequestsComponent,
    FormFixedAssetsRequestsComponent,
    ActionsAssReqComponent,
    FixedAssetsRequestsComponent,

    ProductSuppliesComponent,
    FormProductSuppliesComponent,

    SuppliesCommComponent,
    FormSuppliesCommComponent,

    AmountSuppliesComponent,
    AmountUnitSuppliesComponent,
    ProdSuppliesPackageComponent,
    SelectProductSuppliesComponent,


    BillingRequestPharmacyMostComponent,
    tcRentabilityComponent,


    tcRentabilityComponent,

    BillingPadPrefixComponent,
    FormBillingPadPrefixComponent,
    BillingPadConsecutiveComponent,
    FormBillingPadConsecutiveComponent,
    FixedFormNomProductComponent,
    FixedNomProductComponent,


    AssetsRequestsPatientPackageComponent,
    AssetsSelectRequestsPatientComponent,
    FormFixedAssetsRequestsPatientComponent,
    ActionsAssReqPatientComponent,
    FixedAssetsRequestsPatientComponent,

    FormFixedStockComponent,
    FixedStockComponent,

    UserPackageComponent,
    UserComponent,
    ActionPharmaComponent,

    ServicesPackageComponent,
    ServicesComponent,

    UserFixedComponent,
    UserFixedPackageComponent,
    ActionFixedComponent,

    ServicesFixedPackageComponent,
    ServicesFixedComponent,

    FixedPatientsComponent,
    FixedMovementsComponent,
    FixedInventaryAddPatientsComponent,
    FormFixedInventaryAddPatientsComponent,

    FormFixedReturnComponent,
    ActionsReturnSedComponent,
    FixedReturnComponent,

    FormFixedReturnPatientsComponent,
    ActionsReturnPatiComponent,
    FixedReturnPatientsComponent,
    FormFixedDeniedComponent
  ],
  providers: [
    DateFormatPipe,
    CurrencyPipe
  ],
  exports: [
    ProcedurePackage2Component,
    FormUserComponent,
    FormLocationCapacityComponent,
  ],
  bootstrap: [],
})
export class SettingModule {
}
