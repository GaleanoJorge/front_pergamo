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
import { CompanyKindpersonComponent } from './company-kindperson/company-kindperson.component';
import { ProcedureAgeComponent } from './procedure-age/procedure-age.component';
import { ProcedureCategoryComponent } from './procedure-category/procedure-category.component';
import { CompanyCategoryComponent } from './company-category/company-category.component';
import { CompanyTypeComponent } from './company-type/company-type.component';
import { FormCompanyCategoryComponent } from './company-category/form-company-category/form-company-category.component';
import { FormCompanyTypeComponent } from './company-type/form-company-type/form-company-type.component';
import { ProcedurePurposeComponent } from './procedure-purpose/procedure-purpose.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { CategoryComponent } from './category/category.component';
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
import { CircuitComponent } from './circuit/circuit.component';
import { FormCircuitComponent } from './circuit/form-circuit/form-circuit.component';
import { FormRegionComponent } from './region/form-region/form-region.component';
import { FormCampusComponent } from './campus/form-campus/form-campus.component';
import { FormProcedureAgeComponent } from './procedure-age/form-procedure-age/form-procedure-age.component';
import { FormProcedureCategoryComponent } from './procedure-category/form-procedure-category/form-procedure-category.component';
import { FormProcedureComponent } from './procedure/form-procedure/form-procedure.component';
import { FormProcedurePurposeComponent } from './procedure-purpose/form-procedure-purpose/form-procedure-purpose.component';
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
    CategoryComponent,
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
    CircuitComponent,
    FormCircuitComponent,
    FormRegionComponent,
    RegionComponent,
    MunicipalityComponent,
    FormMunicipalityComponent,
    FormProcedureCategoryComponent,
    FormProcedureAgeComponent,
    FormProcedureComponent,
    FormProcedurePurposeComponent,
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
