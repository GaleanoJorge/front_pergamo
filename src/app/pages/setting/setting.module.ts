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
  NbRadioModule,
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
import { TypeAssetsComponent } from './type-assets/type-assets.component';
import { FixedAssetsComponent } from './fixed-assets/fixed-assets.component';
import { FormTypeAssetsComponent } from './type-assets/form-type-assets/form-type-assets.component';
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
    ProcedurePackageComponent,
    FormInsuranceCarrierComponent,
    FormModalityComponent,
    FormTypeBriefcaseComponent,
    FormTypeContractComponent,
    TypeAssetsComponent,
    FixedAssetsComponent,
    FormTypeAssetsComponent,
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
  ],
  providers: [
    DateFormatPipe
  ],
})
export class SettingModule {
}
