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
  NbTabsetModule,
  NbUserModule,
  NbInputModule,
  NbSelectModule,
  NbRadioModule,
  NbIconModule,
  NbSpinnerModule,
  NbPopoverModule,
  NbToggleModule,
  NbTooltipModule,
  NbDialogModule,
  NbCheckboxModule,
  NbAutocompleteModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ClinicHistoryRoutingModule } from './clinic-history-routing.module';
import { PagesModule } from '../pages.module';

import { DateFormatPipe } from '../../pipe/date-format.pipe';

import { Actions5Component } from './ch-record-list/actions.component';
import { FormClinicHistoryComponent } from './clinic-history-list/form-clinic-history/form-clinic-history.component';
import { Actions6Component } from './clinic-history-list/entry-clinic-history/actions.component';
import { ClinicHistoryListComponent } from './clinic-history-list/clinic-history-list.component';
import { ClinicHistoryComponent } from './clinic-history.component';
import { ChRecordListComponent } from './ch-record-list/ch-record-list.component';
import { Actions4Component } from './clinic-history-list/actions.component';
import { FormsignsComponent } from './signs/form-signs/form-signs.component';
import { Actions1Component } from './signs/actions.component';
import { SignsListComponent } from './signs/signs.component';
import { PadModule } from '../pad/pad.module';
import { FormBackgroundComponent } from './background/back/form-background/form-background.component';

import { FormPhysicalExamComponent } from './physical-exam/form-physical-exam/form-physical-exam.component';
import { PhysicalExamComponent } from './physical-exam/physical-exam.component';
import { Actions3Component } from './physical-exam/actions.component';
import { Actions7Component } from './clinic-history-list/entry-clinic-history/system-exam/actions.component';
import { Actions2Component } from './clinic-history-list/entry-clinic-history/diagnostic/actions.component';

import { FormBackGynecoComponent } from './background/back-gyneco/form-back-gyneco/form-back-gyneco.component';
import { BackgGynecoComponent } from './background/back-gyneco/back-gyneco.component';
import { Actions9Component } from './background/back-gyneco/actions.component';
import { BackListComponent } from './background/back-list.component';
import { Actions10Component } from './clinic-history-list/evolution-list/evo-soap/actions.component';
import { FormPhysicalExamEvoComponent } from './physical-exam-evo/form-physical-exam-evo/form-physical-exam-evo.component';
import { PhysicalExamEvoComponent } from './physical-exam-evo/physical-exam-evo.component';
import { Actions11Component } from './physical-exam-evo/actions.component';
import { Actions13Component } from './clinic-history-list/evolution-list/diagnostic-evo/actions.component';
import { Actions14Component } from './clinic-history-list/evolution-list/diets-evo/actions.component';
import { FormRecommendationsEvoComponent } from './recommendations-evo/form-recommendations-evo/form-recommendations-evo.component';
import { Actions15Component } from './recommendations-evo/actions.component';
import { RecommendationsEvoComponent } from './recommendations-evo/recommendations-evo.component';
import { FormFormulationComponent } from './formulation/form-formulation/form-formulation.component';
import { FormulationComponent } from './formulation/formulation.component';

import { BackgroundComponent } from './background/back/background.component';
import { Actions8Component } from './background/back/actions.component';
import { FormChScalesComponent } from './scales/form-ch-scales/form-ch-scales.component';
import { ChHistoricScalesComponent } from './scales/ch-historic-scales/ch-historic-scales.component';
import { ChScaleBarthelComponent } from './scales/ch-scale-barthel/ch-scale-barthel.component';
import { ChScaleNortonComponent } from './scales/ch-scale-norton/ch-scale-norton.component';
import { ChScaleGlasgowComponent } from './scales/ch-scale-glasgow/ch-scale-glasgow.component';
import { ChScalePayetteComponent } from './scales/ch-scale-payette/ch-scale-payette.component';
import { ChScaleFragilidadComponent } from './scales/ch-scale-fragility/ch-scale-fragility.component';
import { ChScaleNewsComponent } from './scales/ch-scale-news/ch-scale-news.component';
import { ChScalPapComponent } from './scales/ch-scale-pap/ch-scale-pap.component';
import { ChScaleHamiltonComponent } from './scales/ch-scale-hamilton/ch-scale-hamilton.component';
import { ChScaleCamComponent } from './scales/ch-scale-cam/ch-scale-cam.component';
import { ChScaleFacComponent } from './scales/ch-scale-fac/ch-scale-fac.component';
import { ChScaleRedCrossComponent } from './scales/ch-scale-red-cross/ch-scale-red-cross.component';
import { ChScaleKarnofskyComponent } from './scales/ch-scale-karnofsky/ch-scale-karnofsky.component';
import { ChScaleEcogComponent } from './scales/ch-scales-ecog/ch-scale-ecog.component';
import { ChScalePediatricNutritionComponent } from './scales/ch-scale-pediatric-nutrition/ch-scale-pediatric-nutrition.component';
import { ChScaleFlaccComponent } from './scales/ch-scale-flacc/ch-scale-flacc.component';
import { ChScaleEsasComponent } from './scales/ch-scale-esas/ch-scale-esas.component';
import { ChScalePpiComponent } from './scales/ch-scale-ppi/ch-scale-ppi.component';
import { ChScaleZaritComponent } from './scales/ch-scale-zarit/ch-scale-zarit.component';
import { ChScalePainComponent } from './scales/ch-scale-pain/ch-scale-pain.component';
import { ChScaleWongBakerComponent } from './scales/ch-scale-wong-baker/ch-scale-wong.component';
import { ChScalePfeifferComponent } from './scales/ch-scale-pfeiffer/ch-scale-pfeiffer.component';
import { ChScaleJhDowntonComponent } from './scales/ch-scale-jh-downton/ch-scale-jh-downton.component';
import { ChScaleScreeningComponent } from './scales/ch-scale-screening/ch-scale-screening.component';
import { ChScalePpsComponent } from './scales/ch-scale-pps/ch-scale-pps.component';
import { ChScaleBradenComponent } from './scales/ch-scale-braden/ch-scale-braden.component';
import { ChScaleLawtonComponent } from './scales/ch-scale-lawton/ch-scale-lawton.component';
import { ClinicHistoryNursingListComponent } from './clinic-history-nursing-list/clinic-history-nursing-list.component';
import { FormClinicHistoryNursingComponent } from './clinic-history-nursing-list/form-clinic-history-nursing/form-clinic-history-nursing.component';
import { ActionsNursingComponent } from './clinic-history-nursing-list/actionsNursing.component';
import { ActionsNursing2Component } from './clinic-history-nursing-list/entry-clinic-history-nursing/actions.component';

import { ChNutritionListComponent } from './ch-nutrition-list/ch-nutrition-list.component';
import { ChNutritionInputComponent } from './ch-nutrition-list/ch-nutrition-input/ch-nutrition-input.component';
import { ChNutritionRegularNoneComponent } from './ch-nutrition-list/ch-nutrition-regular-note/ch-nutrition-regular-note.component';
import { FormAnalysisAndInterpretationComponent } from './ch-nutrition-list/ch-nutrition-input/form-analysis-and-interpretation/form-analysis-and-interpretation.component';
import { FormClinicHistoryLanguageComponent } from './clinic-history-language-list/form-clinic-history-language/form-clinic-history-language.component';
import { ClinicHistoryLanguageListComponent } from './clinic-history-language-list/clinic-history-language-list.component';
import { ActionsLanguageComponent } from './clinic-history-language-list/actionslanguage.component';

import { DrugApplicationComponent } from './drug-application/drug-application.component';
import { FormDrugApplicationComponent } from './drug-application/form-drug-application/form-drug-application.component';
import { MedicationOrderComponent } from './medication-order/medication-order.component';
import { FormMedicationOrderComponent } from './medication-order/form-medication-order/form-medication-order.component';
import { FormRespiratoryTherapyComponent } from './respiratory-therapy-list/form-respiratory-therapy/form-respiratory-therapy.component';
import { ActionsRespiratoryTherapyComponent } from './respiratory-therapy-list/actionsRespiratoryTherapy.component';
import { ActionsRespiratoryTherapy2Component } from './respiratory-therapy-list/entry-respiratory-therapy/actions.component';
import { RespiratoryTherapyListComponent } from './respiratory-therapy-list/respiratory-therapy-list.component';
import { OxygenTherapyComponent } from './respiratory-therapy-list/entry-respiratory-therapy/oxygen-therapy/oxygen-therapy.component';
import { FormDiagnosisCifTherapyComponent } from './diagnosis-cif-therapy/form-diagnosis-cif-therapy.component';
import { FormNutritionBackgroundComponent } from './ch-nutrition-list/ch-nutrition-input/form-nutrition-background/form-nutrition-background.component';
import { NursingPhysicalExamComponent } from './nursing-physical-exam/nursing-physical-exam.component';
import { FormNursingPhysicalExamComponent } from './nursing-physical-exam/form-nursing-physical-exam/form-nursing-physical-exam.component';

import { FormRNValorationOtComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-valoration-ot/form-r-n-valoration-ot/form-r-n-valoration-ot.component';
import { RNValorationOtComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-valoration-ot/r-n-valoration-ot.component';
import { Actions31Component } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-valoration-ot/actions.component';
import { RNTheraputicObjOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-therapeutic-obj-ot/r-n-therapeutic_obj-ot.component';
import { FormRNTherapeuticObjOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-therapeutic-obj-ot/form-r-n-therapeutic-obj-ot/form-r-n-therapeutic-obj-ot.component';
import { FormRNMaterialsOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-metarials-ot/form-r-n-materials-ot/form-r-n-materials-ot.component';
import { RNMaterialsOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-metarials-ot/r-n-materials-ot.component';
import { ForRNmWeeklyOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-weekly-ot/form-r-n-weekly-ot/form-r-n-weekly-ot.component';
import { RNWeeklyOtComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-weekly-ot/r-n-weekly-ot.component';
import { FormSwFamilyComponent } from './ch-social-work/sw-family/form-sw-family/form-sw-family.component';
import { SwFamilyComponent } from './ch-social-work/sw-family/sw-family.component';
import { FormSwNursingComponent } from './ch-social-work/sw-nursing/form-sw-nursing/form-sw-nursing.component';
import { SwNursingComponent } from './ch-social-work/sw-nursing/sw-nursing.component';
import { OccupationalHistoryComponent } from './ch-social-work/occupational-history/occupational-history.component';
import { FormOccupationalHistoryComponent } from './ch-social-work/occupational-history/form-occupational history/form-occupational-history.component';
import { SwFamilyDynamicsComponent } from './ch-social-work/family-dynamic/sw-family-dynamics.component';
import { FormSwRiskFactorsComponent, } from './ch-social-work/sw-risk-factors/form-sw-risk-factors/form-sw-risk-factors.component';
import { SwRiskFactorsComponent } from './ch-social-work/sw-risk-factors/sw-risk-factors.component';
import { FormChSwConditionHousingComponent } from './ch-social-work/sw-services-housing/form-sw-condition-housing/form-sw-condition-housing.component';
import { ChSwConditionHousingComponent } from './ch-social-work/sw-services-housing/sw-condition-housing.component';
import { FormChSwHygieneHousingComponent } from './ch-social-work/sw-hygiene-housing/form-sw-hygiene-housing/form-sw-hygiene-housing.component';
import { ChSwHygieneHousingComponent } from './ch-social-work/sw-hygiene-housing/sw-hygiene-housing.component';
import { FormChSwIncomeComponent } from './ch-social-work/ch-sw-income/form-sw-income/form-sw-income.component';
import { ChSwIncomeComponent } from './ch-social-work/ch-sw-income/sw-income.component';
import { FormChSwExpensesComponent } from './ch-social-work/ch-sw-expenses/form-sw-expenses/form-sw-expenses.component';
import { ChSwExpensesComponent } from './ch-social-work/ch-sw-expenses/sw-expenses.component';
import { FormChSwEconomicAspectsComponent } from './ch-social-work/ch-sw-economic-aspects/form-sw-economic-aspects/form-sw-economic-aspects.component';
import { ChSwEconomicAspectsComponent } from './ch-social-work/ch-sw-economic-aspects/sw-economic-aspects.component';
import { SwArmedConflictComponent } from './ch-social-work/ch-sw-armed-conflict/sw-armed-conflict.component';
import { FormSwArmedConflictComponent } from './ch-social-work/ch-sw-armed-conflict/form-ch-sw-armed-conflict/form-sw-armed-conflict.component';
import { FormSwSupportNetworkComponent } from './ch-social-work/ch-sw-support-network/form-sw-support-network/form-sw-support-network.component';
import { FormChSwEducationComponent } from './ch-social-work/ch-sw-education/form-ch-sw-education/form-ch-sw-education.component';
import { SwSupportNetworkComponent } from './ch-social-work/ch-sw-support-network/sw-support-network.component';
import { RegularSocialWorkComponent } from './ch-social-work/regular-social-work/regular-social-work.component';
import { ChSwHousingAspectsComponent } from './ch-social-work/ch-sw-housing/ch-sw-housing-aspects.component';
import { FormChSwHousingAspectsComponent } from './ch-social-work/ch-sw-housing/form-ch-sw-housing-aspects/form-ch-sw-housing-aspects.component';
import { SwHousingComponent } from './ch-social-work/sw-housing/sw-housing.component';
import { FormSwFamilyDynamicsComponent } from './ch-social-work/family-dynamic/form-sw-family-dynamics/form-sw-family-dynamics.component';
import { FormSwDiagnosisComponent } from './ch-social-work/ch-sw-diagnosis/form-sw-diagnosis/form-sw-diagnosis.component';

import { ActionsAplicationsComponent } from './drug-application/actions.component';
import { ClinicHistoryOccupationalTherapy } from './entry-clinic-history-occupational-therapy/ch-occupational-therapy.component';
import { Actions25Component } from './clinic-history-list/failed/actions25.component';
import { InsumeApplicationComponent } from './insume-application/insume-application.component';
import { FormInsumeApplicationComponent } from './insume-application/form-insume-application/form-insume-application.component';
import { ActionsInsumeComponent } from './insume-application/actions.component';
import { ClinicHistoryPhysicTherapy } from './entry-clinic-history-physical-therapy/ch-physic-therapy.component';
import { ConfirmDialogCHComponent } from './clinic-history-list/confirm-dialog/confirm-dialog.component';
import { FormValorationFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/valoration-ft/form-valoration-ft/form-valoration-ft.component';
import { TableValorationFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/valoration-ft/table-valoration-ft.component';
import { FormValorationTherFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/valoration-ther-ft/form-valoration-ther-ft/form-valoration-ther-ft.component';
import { TableValorationTherFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/valoration-ther-ft/table-valoration-ther-ft.component';
import { FormPainFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/pain-ft/form-pain-ft/form-pain-ft.component';
import { TablePainFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/pain-ft/table-pain-ft.component';
import { FormSysIntegumentaryComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/sys-integumentary-ft/form-sys-integumentary-ft/form-sys-integumentary-ft.component';
import { TableSysIntegumentaryComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/sys-integumentary-ft/table-sys-integumentary-ft.component';
import { FormSysMusculoskeletalFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/sys-musculoskeletal-ft/form-sys-musculoskeletal-ft/form-sys-musculoskeletal-ft.component';
import { TableSysMusculoskeletalFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/sys-musculoskeletal-ft/table-sys-musculoskeletal-ft.component';
import { FormMuscularStrengthFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/muscular-strength-ft/form-muscular-strength-ft/form-muscular-strength-ft.component';
import { TableMuscularStrengthFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/muscular-strength-ft/table-muscular-strength-ft.component';
import { FormSensibilityFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/sensibility-ft/form-sensibility-ft/form-sensibility-ft.component';
import { TableSensibilityFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/sensibility-ft/table-sensibility-ft.component';
import { FormMuscularToneFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/muscular-tone-ft/form-muscular-tone-ft/form-muscular-tone-ft.component';
import { TableMuscularToneFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/muscular-tone-ft/table-muscular-tone-ft.component';
import { FormReflectionFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/reflection_f_t/form-reflection_f_t/form-reflection_f_t.component';
import { TableReflectionComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/reflection_f_t/table-reflection_f_t.component';
import { FormFlexibilityFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/flexibility-ft/form-flexibility-ft/form-flexibility-ft.component';
import { TableFlexibilityFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/flexibility-ft/table-flexibility-ft.component';
import { FormBalanceFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/balance-ft/form-balance-ft/form-balance-ft.component';
import { TableBalanceFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/balance-ft/table-flexibility-ft.component';
import { FormPositionFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/position-ft/form-position-ft/form-position-ft.component';
import { TablePositionFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/position-ft/table-position-ft.component';
import { FormMarchFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/march-ft/form-march-ft/form-march-ft.component';
import { TableMarchFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/march-ft/table-march-ft.component';
import { FormDiagnosisFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/diagnosis-ft/form-diagnosis-ft/form-diagnosis-ft.component';
import { TableDiagnosisFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/diagnosis-ft/table-diagnosis-ft.component';
import { TableTherGoalsFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/ther-goals-ft/table-ther-goals-ft.component';
import { FormTherGoalsFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/ther-goals-ft/form-ther-goals-ft/form-ther-goals-ft.component';
import { FormWeeklyFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/weekly-ft/form-weekly-ft/form-weekly-ft.component';
import { TableWeeklyFTComponent } from './entry-clinic-history-physical-therapy/entry-physical-therapy/weekly-ft/table-weekly-ft.component';


import { FormSocialWorkComponent } from './ch-social-work/social-work-list/form-social-work/form-social-work.component';
import { SocialWorkListComponent } from './ch-social-work/social-work-list/social-work-list.component';
import { EntrySocialWorkComponent } from './ch-social-work/entry-social-work/entry-social-work.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { FormRNTherGoalsFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-ther-goals-ft/form-nr-ther-goals-ft/form-nr-ther-goals-ft.component';
import { TableRNTherGoalsFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-ther-goals-ft/table-nr-ther-goals-ft.component';
import { FormNRValorationFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-valoration-ft/form-nr-valoration-ft/form-nr-valoration-ft.component';
import { TableNRValorationFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-valoration-ft/table-nr-valoration-ft.component';
import { FormNRWeeklyFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-weekly-ft/form-nr-weekly-ft/form-nr-weekly-ft.component';
import { TableNRWeeklyFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-weekly-ft/table-nr-weekly-ft.component';
import { FormNRDiagnosisFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-diagnosis-ft/form-nr-diagnosis-ft/form-nr-diagnosis-ft.component';
import { TableNRDiagnosisFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-diagnosis-ft/table-nr-diagnosis-ft.component';
import { TableValorationOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/valoration-ot/table-valoration-ot.component';
import { SwDiagnosisComponent } from './ch-social-work/ch-sw-diagnosis/sw-diagnosis.component';
import { ActionsSWComponent } from './ch-social-work/ch-sw-support-network/actions.component';
import { TableDisTactilelMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/dis-tactile-m-ot/table-dis-tactile-m-ot.component';
import { FormComponentMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/component-m-ot/form-component-m-ot/form-component-m-ot.component';
import { FormWeeklyInMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/weekly-int-m-ot/form-weekly-int-m-ot/form-weekly-int-m-ot.component';
import { FormAnthropometryComponent } from './ch-nutrition-list/ch-nutrition-input/anthropometry/form-anthropometry/form-anthropometry.component';
import { TableAnthropometryComponent } from './ch-nutrition-list/ch-nutrition-input/anthropometry/table-anthropometry.component';
import { FormGastrointestinalComponent } from './ch-nutrition-list/ch-nutrition-input/gastrointestinal/form-gastrointestinal/form-gastrointestinal.component';
import { FormFoodHistoryComponent } from './ch-nutrition-list/ch-nutrition-input/food-history/form-food-history/form-food-history.component';
import { FormValorationOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/valoration-ot/form-valoration-ot/form-valoration-ot.component';
import { FormOccupatHistoryOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/occupat-history-ot/form-occupat-history-ot/form-occupat-history-ot.component';
import { TableOccupatHistoryOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/occupat-history-ot/table-occupat-history-ot.component';
import { FormPastOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/past-ot/form-past-ot/form-past-ot.component';
import { TablePastOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/past-ot/table-past-ot.component';
import { FormDailyActivitiesOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/daily-activities-ot/form-daily-activities-ot/form-daily-activities-ot.component';
import { TableDailyActivitiesOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/daily-activities-ot/table-daily-activities-ot.component';
import { EntryFormMotorSkillsOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/entry-form-motor-skills-ot.component';
import { FormFunPatMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/fun-pat-m-ot/form-fun-pat-m-ot/form-fun-pat-m-ot.component';
import { TableFunPatMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/fun-pat-m-ot/table-fun-pat-m-ot.component';
import { FormIntPatMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/int-pat-m-ot/form-int-pat-m-ot/form-int-pat-m-ot.component';
import { TableIntPatMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/int-pat-m-ot/table-int-pat-m-ot.component';
import { TableMovPatMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/mov-pat-m-ot/table-mov-pat-m-ot.component';
import { FormMovPatMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/mov-pat-m-ot/form-mov-pat-m-ot/form-mov-pat-m-ot.component';
import { FormThermalMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/thermal-m-ot/form-thermal-m-ot/form-thermal-m-ot.component';
import { TableThermalMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/thermal-m-ot/table-thermal-m-ot.component';
import { FormDisAuditoryMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/dis-auditory-m-ot/form-dis-auditory-m-ot/form-dis-auditory-m-ot.component';
import { TableDisAuditoryMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/dis-auditory-m-ot/table-dis-auditory-m-ot.component';
import { FormDisTactilelMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/dis-tactile-m-ot/form-dis-tactile-m-ot/form-dis-tactile-m-ot.component';
import { FormAcuityMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/acuity-m-ot/form-acuity-m-ot/form-acuity-m-ot.component';
import { TableAcuityMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/acuity-m-ot/table-acuity-m-ot.component';
import { TableComponentMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/component-m-ot/table-component-m-ot.component';
import { FormTestMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/test-m-ot/form-test-m-ot/form-test-m-ot.component';
import { TableTestMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/test-m-ot/table-test-m-ot.component';
import { FormCommunicationMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/communication-m-ot/form-communication-m-ot/form-communication-m-ot.component';
import { TableCommunicationMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/communication-m-ot/table-communication-m-ot.component';
import { FormAssessmentMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/assessment-m-ot/form-assessment-m-ot/form-assessment-m-ot.component';
import { TableAssessmentMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/assessment-m-ot/table-assessment-m-ot.component';
import { TableWeeklyInMOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/motor-skills/weekly-int-m-ot/table-weekly-int-m-ot.component';
import { TableGastrointestinalComponent } from './ch-nutrition-list/ch-nutrition-input/gastrointestinal/table-gastrointestinal.component';
import { TableFoodHistoryComponent } from './ch-nutrition-list/ch-nutrition-input/food-history/table-food-history.component';
import { FormParenteralNutritionComponent } from './ch-nutrition-list/ch-nutrition-input/parenteral-nutrition/form-parenteral-nutrition/form-parenteral-nutrition.component';
import { TableParenteralNutritionComponent } from './ch-nutrition-list/ch-nutrition-input/parenteral-nutrition/table-parenteral-nutrition.component';
import { FormRNinterventionTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-intervention-ot/formr-n-intervention-ot/form-r-n-intervention-ot.component';
import { TableRNInterventionOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-intervention-ot/table-r-n-intervention-ot.component';
import { FormNRinterventionFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-intervention-ft/form-nr-intervention-ft/form-nr-intervention-ft.component';
import { TableNRinterventionFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-intervention-ft/table-nr-intervention-ft.component';
import { FormNRMaterialsFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-metarials-ft/form-nr-metarials-ft/nr-metarials-ft.component';
import { TableNRMaterialsFTComponent } from './entry-clinic-history-physical-therapy/regular-physical-therapy/nr-metarials-ft/table-nr-metarials-ft.component';
import { FormPsychologyComponent } from './ch-psychology/psychology-list/form-psychology/form-psychology.component';
import { EntryPsychologyComponent } from './ch-psychology/entry-psychology/entry-psychology.component';
import { PsychologyListComponent } from './ch-psychology/psychology-list/psychology-list.component';
import { FormPsAssessmentComponent } from './ch-psychology/ps-assessment/form-ps-assessment/form-ps-assessment.component';
import { PsAssessmentComponent } from './ch-psychology/ps-assessment/ps-assessment.component';
import { PsRelationshipComponent } from './ch-psychology/ps_relationship/ps-relationship.component';
import { FormPsRelationshipComponent } from './ch-psychology/ps_relationship/form-ps-relationship/form-ps-relationship.component';
import { FormPsIntellectiveComponent } from './ch-psychology/ps_intellective/form-ps-intellective/form-ps-intellective.component';
import { PsIntellectiveComponent } from './ch-psychology/ps_intellective/ps-intellective.component';
import { FormPsThoughtComponent } from './ch-psychology/ps-thought/form-ps-thought/form-ps-thought.component';
import { PsThoughtComponent } from './ch-psychology/ps-thought/ps-thought.component';
import { PsMentalExamComponent } from './ch-psychology/ps-mental-exam/ps-mental-exam.component';
import { FormPsLanguageComponent } from './ch-psychology/ps-language/form-ps-language/form-ps-language.component';
import { PsLanguageComponent } from './ch-psychology/ps-language/ps-language.component';
import { FormPsSphereComponent } from './ch-psychology/ps-sphere/form-ps-sphere/form-ps-sphere.component';
import { FormPsSynthesisComponent } from './ch-psychology/ps-synthesis/form-ps-synthesis/form-ps-synthesis.component';
import { FormPsMultiaxialComponent } from './ch-psychology/ps-multiaxial/from-ps-multiaxial/form-ps-multiaxial.component';
import { FormPsInterventionComponent } from './ch-psychology/ps-intervention/form-ps-intervention/form-ps-intervention.component';
import { FormPsOperationalizationComponent } from './ch-psychology/ps-operationalization/form-ps-operationalization/form-ps-operationalization.component';
import { RegularPsychologyComponent } from './ch-psychology/regular-psychology/regular-psychology.component';
import { FormPsAwarenessComponent } from './ch-psychology/ps-awareness/form-ps-awareness/form-ps-awareness.component';
import { FormPsObjectivesComponent } from './ch-psychology/ps-objectives/form-ps-objectives/form-ps-objectives.component';
import { PsSphereComponent } from './ch-psychology/ps-sphere/ps-sphere.component';
import { PsSynthesisComponent } from './ch-psychology/ps-synthesis/ps-synthesis.component';
import { PsMultiaxialComponent } from './ch-psychology/ps-multiaxial/ps-multiaxial.component';
import { PsInterventionComponent } from './ch-psychology/ps-intervention/ps-intervention.component';
import { PsOperationalizationComponent } from './ch-psychology/ps-operationalization/ps-operationalization.component';
import { PsAwarenessComponent } from './ch-psychology/ps-awareness/ps-awareness.component';
import { PsObjectivesComponent } from './ch-psychology/ps-objectives/ps-objectives.component';
import { ActionsFormulationComponent } from './formulation/actions.component';
import { ActionsMedicalOrderComponent } from './clinic-history-list/medical-orders/ch-medical-orders/actions.component';
import { ActionsInabilityComponent } from './clinic-history-list/ch-inability/actions.component';
import { ActionsCertificateComponent } from './clinic-history-list/ch-medical-certificate/actions.component';
import { ActionsInterconsultationComponent } from './clinic-history-list/medical-orders/ch-interconsultation/actions.component';
import { ChSwEducationComponent } from './ch-social-work/ch-sw-education/ch-sw-education.component';
import { FormTracingComponent } from './tracing/form-tracing/form-tracing.component';
import { TracingComponent } from './tracing/tracing.component';
import { TracingListComponent } from './tracing-list/tracing-list.component';
import { FormTracingListComponent } from './tracing-list/form-tracing-list/form-tracing-list.component';
import { ActionsPExamComponent } from './nursing-physical-exam/actions.component';
import { InformedConsentsComponent } from './informed-consents/informed-consents.component';
import { ActionsInformedComponent } from './informed-consents/actions.component';
import { FormInformedConsentsComponent } from './informed-consents/form-informed-consents/form-informed-consents.component';
import { Actions23Component } from './informed-consents/actions2.component';
import { EntryRespiratoryTherapyComponent } from './respiratory-therapy-list/entry-respiratory-therapy/entry-respiratory-therapy.component';
import { AssessmentTherapyComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/assessment-therapy.component';
import { FomrAssessmentComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/assessment/form-assessment/form-assessment.component';
import { IspectionComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/ispection/ispection.component';
import { FormIspectionComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/ispection/form-ispection/form-ispection.component';
import { FormAuscultacionComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/auscultacion/form-auscultacion/form-auscultacion.component';
import { AuscultacionComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/auscultacion/auscultacion.component';
import { DiagnosticAidsComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/diagnostic-aids/diagnostic-aids.component';
import { FormaDiagnosticAidsComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/diagnostic-aids/form-diagnostic-aids/form-diagnostic-aids.component';
import { FormObjectivesTherapyComponent } from './respiratory-therapy-list/entry-respiratory-therapy/objectives/form-objectives-therapy/form-objectives-therapy.component';
import { ObjectivesTherapyComponent } from './respiratory-therapy-list/entry-respiratory-therapy/objectives/objectives-therapy.component';
import { FormOxygenTherapyComponent } from './respiratory-therapy-list/entry-respiratory-therapy/oxygen-therapy/form-oxygen-therapy/form-oxygen-therapy.component';
import { RegularRespiratoryTherapyComponent } from './respiratory-therapy-list/regular-respiratory-therapy/regular-respiratory-therapy.component';
import { SessionsTherapyComponent } from './respiratory-therapy-list/entry-respiratory-therapy/sessions/sessions-therapy.component';
import { FormSessionsTherapyComponent } from './respiratory-therapy-list/entry-respiratory-therapy/sessions/form-sessions-therapy/form-sessions-therapy.component';
import { SignsRespiratoryComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/assessment/signs-respiratory/signs-respiratory.component';
import { AssessmentComponent } from './respiratory-therapy-list/entry-respiratory-therapy/assessment-therapy/assessment/assessment.component';
import { ReasonConsultationRTComponent } from './respiratory-therapy-list/entry-respiratory-therapy/reason-consultation-respiratory-therapy/reason-consultation-rt.component';
import { FormReasonConsultationRTComponent } from './respiratory-therapy-list/entry-respiratory-therapy/reason-consultation-respiratory-therapy/form-reason-consultation/form-reason-consultation-rt.component';
import { FormReasonConsultationComponent } from './clinic-history-list/entry-clinic-history/form-reason-consultation/form-reason-consultation.component';
import { EntryClinicHistoryComponent } from './clinic-history-list/entry-clinic-history/entry-clinic-history.component';
import { SystemExamComponent } from './clinic-history-list/entry-clinic-history/system-exam/system-exam.component';
import { FormSystemExamComponent } from './clinic-history-list/entry-clinic-history/system-exam/form-system-exam/form-system-exam.component';
import { FormDiagnosticComponent } from './clinic-history-list/entry-clinic-history/diagnostic/form-diagnostic/form-diagnostic.component';
import { DiagnosticListComponent } from './clinic-history-list/entry-clinic-history/diagnostic/diagnostic.component';
import { ChApComponent } from './clinic-history-list/entry-clinic-history/ch-ap/ch-ap.component';
import { FormChApComponent } from './clinic-history-list/entry-clinic-history/ch-ap/form-ch-ap/form-ch-ap.component';
import { EvolutionListComponent } from './clinic-history-list/evolution-list/evolution-list.component';
import { EvoSoapComponent } from './clinic-history-list/evolution-list/evo-soap/evo-soap.component';
import { FormEvoSoapComponent } from './clinic-history-list/evolution-list/evo-soap/form-evo-soap/form-evo-soap.component';
import { DiagnosticEvoComponent } from './clinic-history-list/evolution-list/diagnostic-evo/diagnostic-evo.component';
import { FormDiagnosticEvoComponent } from './clinic-history-list/evolution-list/diagnostic-evo/form-diagnostic-evo/form-diagnostic-evo.component';
import { FormDietsEvoComponent } from './clinic-history-list/evolution-list/diets-evo/form-diets-evo/form-diets-evo.component';
import { DietsEvoComponent } from './clinic-history-list/evolution-list/diets-evo/diets-evo.component';
import { OrdersMedicalComponent } from './clinic-history-list/medical-orders/orders-medical.component';
import { FormChMedicalOrdersComponent } from './clinic-history-list/medical-orders/ch-medical-orders/form-ch-medical-orders/form-ch-medical-orders.component';
import { ChMedicalOrdersComponent } from './clinic-history-list/medical-orders/ch-medical-orders/ch-medical-orders.component';
import { ChInterconsultationComponent } from './clinic-history-list/medical-orders/ch-interconsultation/ch-interconsultation.component';
import { FormChInterconsultationComponent } from './clinic-history-list/medical-orders/ch-interconsultation/form-ch-interconsultation/form-ch-interconsultation.component';
import { ChInabilityComponent } from './clinic-history-list/ch-inability/ch-inability.component';
import { FormChInabilityComponent } from './clinic-history-list/ch-inability/form-ch-inability/form-ch-inability.component';
import { ChMedicalCertificateComponent } from './clinic-history-list/ch-medical-certificate/ch-medical-certificate.component';
import { FormChMedicalCertificateComponent } from './clinic-history-list/ch-medical-certificate/form-ch-medical-certificate/form-ch-medical-certificate.component';
import { FailedComponent } from './clinic-history-list/failed/failed.component';
import { FormFailedComponent } from './clinic-history-list/failed/form-failed/form-failed.component';
import { FormPatientExitComponent } from './clinic-history-list/patient-exit/form-patient-exit/form-patient-exit.component';
import { EntryClinicHistoryNursingComponent } from './clinic-history-nursing-list/entry-clinic-history-nursing/entry-clinic-history-nursing.component';
import { FormReasonConsultationNursingComponent } from './clinic-history-nursing-list/entry-clinic-history-nursing/form-reason-consultation-nursing/form-reason-consultation-nursing.component';
import { FormChNursingNoteComponent } from './clinic-history-nursing-list/ch-nursing-note/form-ch-nursing-note/form-ch-nursing-note.component';
import { ChNursingNoteComponent } from './clinic-history-nursing-list/ch-nursing-note/ch-nursing-note.component';
import { SkinValorationComponent } from './clinic-history-nursing-list/skin-valoration/skin-valoration.component';
import { FormSkinValorationComponent } from './clinic-history-nursing-list/skin-valoration/form-skin-valoration/form-skin-valoration.component';
import { NurseringNotesComponent } from './clinic-history-nursing-list/nursering-notes/nursering-notes.component';
import { FormNurseringNotesComponent } from './clinic-history-nursing-list/nursering-notes/form-nursering-notes/form-nursering-notes.component';
import { NotesDescriptionComponent } from './clinic-history-nursing-list/nursering-notes/notes-description/notes-description.component';
import { FormNotesDescriptionComponent } from './clinic-history-nursing-list/nursering-notes/notes-description/form-notes-description/form-notes-description.component';
import { NursingProcedureComponent } from './clinic-history-nursing-list/nursering-notes/nursing-procedure/nursing-procedure.component';
import { FormNursingProcedureComponent } from './clinic-history-nursing-list/nursering-notes/nursing-procedure/form-nursing-procedure/form-nursing-procedure.component';
import { LiquidControlComponent } from './clinic-history-nursing-list/nursering-notes/liquid-control/liquid-control.component';
import { FormLiquidControlAdmComponent } from './clinic-history-nursing-list/nursering-notes/liquid-control/form-liquid-control-adm/form-liquid-control-adm.component';
import { FormLiquidControlDelComponent } from './clinic-history-nursing-list/nursering-notes/liquid-control/form-liquid-control-del/form-liquid-control-del.component';
import { CarePlanComponent } from './clinic-history-nursing-list/nursering-notes/care-plan/care-plan.component';
import { FormCarePlanComponent } from './clinic-history-nursing-list/nursering-notes/care-plan/form-care-plan/form-care-plan.component';
import { NurseringMedicationComponent } from './clinic-history-nursing-list/nursering-medication/nursering-medication.component';
import { FormNurseringMedicationComponent } from './clinic-history-nursing-list/nursering-medication/form-nursering-medication/form-nursering-medication.component';
import { ChPositionComponent } from './clinic-history-nursing-list/entry-clinic-history-nursing/form-reason-consultation-nursing/ch-position/ch-position.component';
import { FormChPositionComponent } from './clinic-history-nursing-list/entry-clinic-history-nursing/form-reason-consultation-nursing/ch-position/form-ch-position/form-ch-position.component';
import { ChHairValorationComponent } from './clinic-history-nursing-list/entry-clinic-history-nursing/form-reason-consultation-nursing/ch-hair-valoration/ch-hair-valoration.component';
import { FormChHairValorationComponent } from './clinic-history-nursing-list/entry-clinic-history-nursing/form-reason-consultation-nursing/ch-hair-valoration/form-ch-hair-valoration/form-ch-hair-valoration.component';
import { FormChOstomiesComponent } from './clinic-history-nursing-list/entry-clinic-history-nursing/form-reason-consultation-nursing/ch-ostomies/form-ch-ostomies/form-ch-ostomies.component';
import { ChOstomiesComponent } from './clinic-history-nursing-list/entry-clinic-history-nursing/form-reason-consultation-nursing/ch-ostomies/ch-ostomies.component';
import { ChOxigenComponent } from './clinic-history-nursing-list/nursering-notes/ch-oxigen/ch-oxigen.component';
import { FormChOxigenComponent } from './clinic-history-nursing-list/nursering-notes/ch-oxigen/form-ch-oxigen/form-ch-oxigen.component';
import { LanguageListComponent } from './clinic-history-language-list/language-list/language-list.component';
import { FormLanguageAssessmentComponent } from './clinic-history-language-list/language-list/language-assessment/form-language-assessment/form-language-assessment.component';
import { LanguageAssessmentComponent } from './clinic-history-language-list/language-list/language-assessment/language-assessment.component';
import { FormLanguageEvolutionComponent } from './clinic-history-language-list/language-list/form-language-evolution/form-language-evolution.component';
import { FormLanguageOstomiesComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-ostomies/form-language-ostomies/form-language-ostomies.component';
import { LanguageOstomiesComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-ostomies/language-ostomies.component';
import { FormLanguageSwallowingComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-swallowing/form-language-swallowing/form-language-swallowing.component';
import { LanguageSwallowingComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-swallowing/language-swallowing.component';
import { FormLanguageAlterationsComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-alterations/form-language-alterations/form-language-alterations.component';
import { LanguageAlterationsComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-alterations/language-alterations.component';
import { FormLanguageHearingComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-hearing/form-language-hearing/form-language-hearing.component';
import { LanguageHearingComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-hearing/language-hearing.component';
import { FormLanguageLinguisticComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-linguistic/form-language-linguistic/form-language-linguistic.component';
import { LanguageLinguisticComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-linguistic/language-linguistic.component';
import { FormLanguageCommunicationComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-communication/form-language-communication/form-language-communication.component';
import { LanguageCommunicationComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-communication/language-communication.component';
import { FormLanguageCognitiveComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-cognitive/form-language-cognitive/form-language-cognitive.component';
import { LanguageCognitiveComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-cognitive/language-cognitive.component';
import { FormLanguageOrofacialComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-orofacial/form-language-orofacial/form-language-orofacial.component';
import { LanguageOrofacialComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-orofacial/language-orofacial.component';
import { FormLanguageSpeechComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-speech/form-language-speech/form-language-speech.component';
import { LanguageSpeechComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-speech/language-speech.component';
import { FormLanguageTestsComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-tests/form-language-tests/form-language-tests.component';
import { LanguageTestsComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-tests/language-tests.component';
import { FormLanguageTherapeuticGoalsComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-therapeutic-goals/form-language-therapeutic-goals/form-language-therapeutic-goals.component';
import { LanguageTherapeuticGoalsComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-therapeutic-goals/language-therapeutic-goals.component';
import { FormLanguageEvoDiagnosisComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-evo-diagnosis/form-language-evo-diagnosis/form-language-evo-diagnosis.component';
import { FormLanguageRegSessionsComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-reg-sessions/form-language-reg-sessions/form-language-reg-sessions.component';
import { LanguageRegSessionsComponent } from './clinic-history-language-list/language-list/form-language-evolution/language-reg-sessions/language-reg-sessions.component';
import { RegularLanguageListComponent } from './clinic-history-language-list/regularlanguage-list/regularlanguage-list.component';
import { FormLanguageAssessmentRegularComponent } from './clinic-history-language-list/regularlanguage-list/language-assessment-regular/form-language-assessment-regular/form-language-assessment-regular.component';
import { FormLanguageMaterialusedComponent } from './clinic-history-language-list/regularlanguage-list/language-materialused/form-language-materialused/form-language-materialused.component';
import { LanguageMaterialusedComponent } from './clinic-history-language-list/regularlanguage-list/language-materialused/language-materialused.component';
import { FormLanguageInterventionComponent } from './clinic-history-language-list/regularlanguage-list/language-intervention/form-language-intervention/form-language-intervention.component';
import { LanguageAssessmentRegularComponent } from './clinic-history-language-list/regularlanguage-list/language-assessment-regular/language-assessment-regular.component';
import { LanguageInterventionComponent } from './clinic-history-language-list/regularlanguage-list/language-intervention/language-intervention.component';
import { FormLanguageConceptComponent } from './clinic-history-language-list/regularlanguage-list/language-concept/form-language-concept/form-language-concept.component';
import { LanguageConceptComponent } from './clinic-history-language-list/regularlanguage-list/language-concept/language-concept.component';
import { FormOxigenControlComponent } from './respiratory-therapy-list/entry-respiratory-therapy/oxigen-control/form-oxigen-control/form-oxigen-control.component';
import { ActionsOxigenControlComponent } from './respiratory-therapy-list/entry-respiratory-therapy/oxigen-control/actions.component';
import { TableOxigenControlComponent } from './respiratory-therapy-list/entry-respiratory-therapy/oxigen-control/table-oxigen-control.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    PadModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    SignaturePadModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbTooltipModule,
    NbAccordionModule,
    NbUserModule,
    ClinicHistoryRoutingModule,
    NbInputModule,
    PagesModule,
    NbDialogModule.forRoot(),
    Ng2SmartTableModule,
    NbPopoverModule,
    NbSelectModule,
    NbRadioModule,
    NbIconModule,
    NbSpinnerModule,
    NbToggleModule,
    NbCheckboxModule,
    NbAutocompleteModule,
  ],
  declarations: [


    InsumeApplicationComponent,
    FormInsumeApplicationComponent,
    ActionsInsumeComponent,

    ChOxigenComponent,
    FormChOxigenComponent,

    ChHairValorationComponent,
    FormChHairValorationComponent,

    ChPositionComponent,
    FormChPositionComponent,

    ActionsAplicationsComponent,

    NursingPhysicalExamComponent,
    FormNursingPhysicalExamComponent,

    NursingProcedureComponent,
    FormNursingProcedureComponent,

    LiquidControlComponent,
    FormLiquidControlAdmComponent,
    FormLiquidControlDelComponent,

    CarePlanComponent,
    FormCarePlanComponent,

    NotesDescriptionComponent,
    FormNotesDescriptionComponent,

    NurseringNotesComponent,
    FormNurseringNotesComponent,

    MedicationOrderComponent,
    FormMedicationOrderComponent,

    DrugApplicationComponent,
    FormDrugApplicationComponent,

    NurseringMedicationComponent,
    FormNurseringMedicationComponent,

    DrugApplicationComponent,
    FormDrugApplicationComponent,

    ClinicHistoryNursingListComponent,
    FormClinicHistoryNursingComponent,

    EntryClinicHistoryNursingComponent,
    FormReasonConsultationNursingComponent,

    ActionsNursingComponent,
    ActionsNursing2Component,

    //ht ocupacional

    ClinicHistoryOccupationalTherapy,

    FormValorationOTComponent,
    TableValorationOTComponent,
    FormOccupatHistoryOTComponent,
    TableOccupatHistoryOTComponent,
    FormPastOTComponent,
    TablePastOTComponent,
    FormDailyActivitiesOTComponent,
    TableDailyActivitiesOTComponent,
    

    EntryFormMotorSkillsOTComponent,

    FormFunPatMOTComponent,
    TableFunPatMOTComponent,
    FormIntPatMOTComponent,
    TableIntPatMOTComponent,
    FormMovPatMOTComponent,
    TableMovPatMOTComponent,
    FormThermalMOTComponent,
    TableThermalMOTComponent,
    FormDisAuditoryMOTComponent,
    TableDisAuditoryMOTComponent,
    FormDisTactilelMOTComponent,
    TableDisTactilelMOTComponent,
    FormAcuityMOTComponent,
    TableAcuityMOTComponent,
    FormComponentMOTComponent,
    TableComponentMOTComponent,
    FormTestMOTComponent,
    TableTestMOTComponent,
    FormCommunicationMOTComponent,
    TableCommunicationMOTComponent,
    FormAssessmentMOTComponent,
    TableAssessmentMOTComponent,
    FormWeeklyInMOTComponent,
    TableWeeklyInMOTComponent,


    FormRNValorationOtComponent,
    RNValorationOtComponent,
    FormRNTherapeuticObjOTComponent,
    RNTheraputicObjOTComponent,
    FormRNMaterialsOTComponent,
    RNMaterialsOTComponent,
    ForRNmWeeklyOTComponent,
    RNWeeklyOtComponent,
    FormRNinterventionTComponent,
    TableRNInterventionOTComponent,
    ConfirmDialogCHComponent,

    //ht fisica

    ClinicHistoryPhysicTherapy,
    
    FormValorationFTComponent,
    TableValorationFTComponent,
    FormValorationTherFTComponent,
    TableValorationTherFTComponent,
    FormPainFTComponent,
    TablePainFTComponent,
    FormSysIntegumentaryComponent,
    TableSysIntegumentaryComponent,
    FormSysMusculoskeletalFTComponent,
    TableSysMusculoskeletalFTComponent,
    FormMuscularStrengthFTComponent,
    TableMuscularStrengthFTComponent,
    FormSensibilityFTComponent,
    TableSensibilityFTComponent,
    FormMuscularToneFTComponent,
    TableMuscularToneFTComponent,
    FormReflectionFTComponent,
    TableReflectionComponent,
    FormFlexibilityFTComponent,
    TableFlexibilityFTComponent,
    FormBalanceFTComponent,
    TableBalanceFTComponent,
    FormPositionFTComponent,
    TablePositionFTComponent,
    FormMarchFTComponent,
    TableMarchFTComponent,
    FormDiagnosisFTComponent,
    TableDiagnosisFTComponent,
    FormTherGoalsFTComponent,
    TableTherGoalsFTComponent,
    FormWeeklyFTComponent,
    TableWeeklyFTComponent,

    //ht fisica nota

    FormRNTherGoalsFTComponent,
    TableRNTherGoalsFTComponent,
    FormNRValorationFTComponent,
    TableNRValorationFTComponent,
    FormNRWeeklyFTComponent,
    TableNRWeeklyFTComponent,
    FormNRDiagnosisFTComponent,
    TableNRDiagnosisFTComponent,
    FormNRinterventionFTComponent,
    TableNRinterventionFTComponent,
    FormNRMaterialsFTComponent,
    TableNRMaterialsFTComponent,
    

    ConfirmDialogCHComponent,

    ClinicHistoryOccupationalTherapy,
    ClinicHistoryPhysicTherapy,

    FormSwDiagnosisComponent,    
    FormSocialWorkComponent,
    SocialWorkListComponent,
    EntrySocialWorkComponent,
    FormSwFamilyComponent,
    SwFamilyComponent,
    FormSwNursingComponent,
    SwNursingComponent,
    FormOccupationalHistoryComponent,
    OccupationalHistoryComponent,
    FormSwFamilyDynamicsComponent,
    SwFamilyDynamicsComponent,
    FormSwRiskFactorsComponent,
    SwRiskFactorsComponent,
    FormChSwHousingAspectsComponent,
    ChSwHousingAspectsComponent,
    FormChSwConditionHousingComponent,
    ChSwConditionHousingComponent,
    FormChSwHygieneHousingComponent,
    ChSwHygieneHousingComponent,
    FormChSwIncomeComponent,
    ChSwIncomeComponent,
    FormChSwExpensesComponent,
    ChSwExpensesComponent,
    FormChSwEconomicAspectsComponent,
    ChSwEconomicAspectsComponent,
    FormSwArmedConflictComponent,
    SwArmedConflictComponent,
    FormSwSupportNetworkComponent,
    FormChSwEducationComponent,
    ChSwEducationComponent,
    SwSupportNetworkComponent,
    RegularSocialWorkComponent,
    SwHousingComponent,
    SwDiagnosisComponent,
    ActionsSWComponent,

      
    RespiratoryTherapyListComponent,
    FormRespiratoryTherapyComponent,
    AssessmentTherapyComponent,
    FomrAssessmentComponent,
    AssessmentComponent,
    SignsRespiratoryComponent,
    EntryRespiratoryTherapyComponent,
    FormReasonConsultationRTComponent,
    ReasonConsultationRTComponent,
    ActionsRespiratoryTherapyComponent,
    ActionsRespiratoryTherapy2Component,

    FormIspectionComponent,
    IspectionComponent,
    FormAuscultacionComponent,
    AuscultacionComponent,
    FormaDiagnosticAidsComponent,
    DiagnosticAidsComponent, 
    FormObjectivesTherapyComponent,
    ObjectivesTherapyComponent,
    FormOxygenTherapyComponent,
    OxygenTherapyComponent,

    RegularRespiratoryTherapyComponent,
    FormDiagnosisCifTherapyComponent,
    SessionsTherapyComponent,

    FormSessionsTherapyComponent,

    SkinValorationComponent,
    FormSkinValorationComponent,


    ClinicHistoryComponent,
    FormClinicHistoryComponent,
    ClinicHistoryListComponent,
    FormReasonConsultationComponent,
    EntryClinicHistoryComponent,
    ChRecordListComponent,
    InformedConsentsComponent,
    ActionsInformedComponent,
    FormInformedConsentsComponent,
    Actions23Component,
    FormsignsComponent,
    SignsListComponent,
    Actions1Component,
    Actions4Component,
    Actions5Component,
    Actions6Component,
    OrdersMedicalComponent,
    FormDiagnosticComponent,
    DiagnosticListComponent,
    Actions2Component,
    FormPhysicalExamComponent,
    PhysicalExamComponent,
    Actions3Component,
    FormSystemExamComponent,
    SystemExamComponent,
    Actions7Component,
    ActionsFormulationComponent,
    ActionsMedicalOrderComponent,
    ActionsInabilityComponent,
    ActionsCertificateComponent,
    ActionsInterconsultationComponent,


    FormBackgroundComponent,
    BackgroundComponent,
    Actions8Component,

    FormBackGynecoComponent,
    BackgGynecoComponent,
    Actions9Component,

    BackListComponent,
    EvoSoapComponent,
    FormEvoSoapComponent,
    Actions10Component,

    EvolutionListComponent,
    FormPhysicalExamEvoComponent,
    PhysicalExamEvoComponent,
    Actions11Component,

    FormChScalesComponent,
    ChScaleNortonComponent,
    ChScaleGlasgowComponent,
    ChScaleBarthelComponent,
    ChScalePayetteComponent,
    ChScaleFragilidadComponent,
    ChScaleNewsComponent,
    ChScalPapComponent,
    ChScaleHamiltonComponent,
    ChScaleCamComponent,
    ChScaleFacComponent,
    ChScaleRedCrossComponent,
    ChScaleKarnofskyComponent,
    ChScaleEcogComponent,
    ChScalePediatricNutritionComponent,
    ChScaleEsasComponent,
    ChScaleFlaccComponent,
    ChScalePpiComponent,
    ChScaleZaritComponent,
    ChScalePainComponent,
    ChScaleWongBakerComponent,
    ChScalePfeifferComponent,
    ChScaleJhDowntonComponent,
    ChScaleScreeningComponent,

    ChScalePpsComponent,
    ChScaleBradenComponent,
    ChScaleLawtonComponent,

    FormDiagnosticEvoComponent,
    Actions13Component,
    DiagnosticEvoComponent,

    FormDietsEvoComponent,
    Actions14Component,
    DietsEvoComponent,

    FormRecommendationsEvoComponent,
    Actions15Component,
    RecommendationsEvoComponent,

    FormFormulationComponent,
    FormulationComponent,

    FormFailedComponent,
    FailedComponent,
    Actions25Component,

    FormPatientExitComponent,

    FormChInterconsultationComponent,
    ChInterconsultationComponent,

    FormChMedicalOrdersComponent,
    ChMedicalOrdersComponent,
    OrdersMedicalComponent,

    // historia nutricion
    ChHistoricScalesComponent,

    ChNutritionListComponent,
    ChNutritionInputComponent,
    ChNutritionRegularNoneComponent,

    FormAnthropometryComponent,
    TableAnthropometryComponent,
    FormGastrointestinalComponent,
    TableGastrointestinalComponent,
    FormFoodHistoryComponent,
    TableFoodHistoryComponent,
    FormAnalysisAndInterpretationComponent,
    FormParenteralNutritionComponent,
    TableParenteralNutritionComponent,
    FormClinicHistoryLanguageComponent,
    ClinicHistoryLanguageListComponent,
    ActionsLanguageComponent,
    FormNutritionBackgroundComponent,

    FormLanguageAssessmentComponent,
    LanguageAssessmentComponent,
    LanguageListComponent,
    FormLanguageEvolutionComponent,
    RegularLanguageListComponent,
    FormLanguageAssessmentRegularComponent,
    FormLanguageConceptComponent,
    FormLanguageMaterialusedComponent,
    LanguageMaterialusedComponent,
    FormLanguageInterventionComponent,
    FormLanguageEvoDiagnosisComponent,
    FormLanguageRegSessionsComponent,
    LanguageRegSessionsComponent,
    FormLanguageTherapeuticGoalsComponent,
    LanguageTherapeuticGoalsComponent,
    FormLanguageOstomiesComponent,
    LanguageOstomiesComponent,
    FormLanguageSwallowingComponent,
    LanguageSwallowingComponent,
    FormLanguageAlterationsComponent,
    LanguageAlterationsComponent,
    FormLanguageHearingComponent,
    LanguageHearingComponent,
    FormLanguageLinguisticComponent,
    LanguageLinguisticComponent,
    FormLanguageCommunicationComponent,
    LanguageCommunicationComponent,
    FormLanguageOrofacialComponent,
    LanguageOrofacialComponent,
    FormLanguageSpeechComponent,
    LanguageSpeechComponent,
    FormLanguageTestsComponent,
    LanguageTestsComponent,
    FormLanguageCognitiveComponent,
    LanguageCognitiveComponent,
    LanguageAssessmentRegularComponent,
    FormChInabilityComponent,
    ChInabilityComponent,
    LanguageInterventionComponent,
    ChMedicalCertificateComponent,
    FormChMedicalCertificateComponent,
    LanguageConceptComponent,
    FormChOstomiesComponent,
    ChOstomiesComponent,
    ChApComponent,
    FormChApComponent,

    Actions31Component,
    FormChNursingNoteComponent,
    ChNursingNoteComponent,


    FormPsychologyComponent,
    PsychologyListComponent,
    EntryPsychologyComponent,
    FormPsAssessmentComponent,
    PsAssessmentComponent,
    PhysicalExamComponent,
    PsMentalExamComponent,
    FormPsRelationshipComponent,
    PsRelationshipComponent,
    FormPsIntellectiveComponent,
    PsIntellectiveComponent,
    FormPsThoughtComponent,
    PsThoughtComponent,
    FormPsLanguageComponent,
    PsLanguageComponent,
    FormPsSphereComponent,
    PsSphereComponent,
    FormPsSynthesisComponent,
    PsSynthesisComponent,
    FormPsMultiaxialComponent,
    PsMultiaxialComponent,
    FormPsInterventionComponent,
    PsInterventionComponent,
    FormPsOperationalizationComponent,
    PsOperationalizationComponent,

    RegularPsychologyComponent,
    FormPsAwarenessComponent,
    PsAwarenessComponent,
    FormPsObjectivesComponent,
    PsObjectivesComponent,

    FormTracingComponent,
    TracingComponent,
    TracingListComponent,
    FormTracingListComponent,

    ActionsPExamComponent,
   

    FormOxigenControlComponent,
    ActionsOxigenControlComponent,
    TableOxigenControlComponent,

  ],


  providers: [DateFormatPipe],
  exports: [
    // ClinicHistoryNursingListComponent,
    // ChHairValorationComponent
    // InsumeRequestComponent,
    // FormInsumeRequestComponent,
  ],
})
export class ClinicHistoryModule { }
