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
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ClinicHistoryRoutingModule } from './clinic-history-routing.module';
import { PagesModule } from '../pages.module';

import { DateFormatPipe } from '../../pipe/date-format.pipe';

import { Actions5Component } from './ch-record-list/actions.component';
import { FormClinicHistoryComponent } from './clinic-history-list/form-clinic-history/form-clinic-history.component';
import { FormReasonConsultationComponent } from './entry-clinic-history/form-reason-consultation/form-reason-consultation.component';
import { Actions6Component } from './entry-clinic-history/actions.component';
import { ClinicHistoryListComponent } from './clinic-history-list/clinic-history-list.component';
import { ClinicHistoryComponent } from './clinic-history.component';
import { ChRecordListComponent } from './ch-record-list/ch-record-list.component';
import { Actions4Component } from './clinic-history-list/actions.component';
import { FormsignsComponent } from './signs/form-signs/form-signs.component';
import { Actions1Component } from './signs/actions.component';
import { SignsListComponent } from './signs/signs.component';
import { EntryClinicHistoryComponent } from './entry-clinic-history/entry-clinic-history.component';
import { SystemExamComponent } from './system-exam/system-exam.component';
import { OrdersMedicalComponent } from './medical-orders/orders-medical.component';
import { FormOrdersMedicalComponent } from './medical-orders/form-orders-medical/form-orders-medical.component';
import { FormSystemExamComponent } from './system-exam/form-system-exam/form-system-exam.component';
import { PadModule } from '../pad/pad.module';
import { FormBackgroundComponent } from './background/back/form-background/form-background.component';

import { FormPhysicalExamComponent } from './physical-exam/form-physical-exam/form-physical-exam.component';
import { PhysicalExamComponent } from './physical-exam/physical-exam.component';
import { Actions3Component } from './physical-exam/actions.component';
import { Actions7Component } from './system-exam/actions.component';
import { DiagnosticListComponent } from './diagnostic/diagnostic.component';
import { Actions2Component } from './diagnostic/actions.component';
import { FormDiagnosticComponent } from './diagnostic/form-diagnostic/form-diagnostic.component';

import { FormBackGynecoComponent } from './background/back-gyneco/form-back-gyneco/form-back-gyneco.component';
import { BackgGynecoComponent } from './background/back-gyneco/back-gyneco.component';
import { Actions9Component } from './background/back-gyneco/actions.component';
import { BackListComponent } from './background/back-list.component';
import { EvoSoapComponent } from './evo-soap/evo-soap.component';
import { FormEvoSoapComponent } from './evo-soap/form-evo-soap/form-evo-soap.component';
import { Actions10Component } from './evo-soap/actions.component';
import { FormPhysicalExamEvoComponent } from './physical-exam-evo/form-physical-exam-evo/form-physical-exam-evo.component';
import { PhysicalExamEvoComponent } from './physical-exam-evo/physical-exam-evo.component';
import { Actions11Component } from './physical-exam-evo/actions.component';
import { EvolutionListComponent } from './evolution-list/evolution-list.component';
import { FormsignsEvoComponent } from './signs-evo/form-signs-evo/form-signs-evo.component';
import { Actions12Component } from './signs-evo/actions.component';
import { SignsEvoComponent } from './signs-evo/signs-evo.component';
import { FormDiagnosticEvoComponent } from './diagnostic-evo/form-diagnostic-evo/form-diagnostic-evo.component';
import { Actions13Component } from './diagnostic-evo/actions.component';
import { DiagnosticEvoComponent } from './diagnostic-evo/diagnostic-evo.component';
import { FormDietsEvoComponent } from './diets-evo/form-diets-evo/form-diets-evo.component';
import { Actions14Component } from './diets-evo/actions.component';
import { DietsEvoComponent } from './diets-evo/diets-evo.component';
import { FormRecommendationsEvoComponent } from './recommendations-evo/form-recommendations-evo/form-recommendations-evo.component';
import { Actions15Component } from './recommendations-evo/actions.component';
import { RecommendationsEvoComponent } from './recommendations-evo/recommendations-evo.component';
import { FormFormulationComponent } from './formulation/form-formulation/form-formulation.component';
import { FormulationComponent } from './formulation/formulation.component';

import { BackgroundComponent } from './background/back/background.component';
import { Actions8Component } from './background/back/actions.component';
import { FormFailedComponent } from './failed/form-failed/form-failed.component';
import { FailedComponent } from './failed/failed.component';
import { FormPatientExitComponent } from './patient-exit/form-patient-exit/form-patient-exit.component';
import { PatientExitComponent } from './patient-exit/patient-exit.component';
import { FormChMedicalOrdersComponent } from './ch-medical-orders/form-ch-medical-orders/form-ch-medical-orders.component';
import { ChMedicalOrdersComponent } from './ch-medical-orders/ch-medical-orders.component';
import { FormChInterconsultationComponent } from './ch-interconsultation/form-ch-interconsultation/form-ch-interconsultation.component';
import { ChInterconsultationComponent } from './ch-interconsultation/ch-interconsultation.component';
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
import { ActionsNursing2Component } from './entry-clinic-history-nursing/actions.component';
import { FormReasonConsultationNursingComponent } from './entry-clinic-history-nursing/form-reason-consultation-nursing/form-reason-consultation-nursing.component';
import { EntryClinicHistoryNursingComponent } from './entry-clinic-history-nursing/entry-clinic-history-nursing.component';
import { SkinValorationComponent } from './skin-valoration/skin-valoration.component';
import { FormSkinValorationComponent } from './skin-valoration/form-skin-valoration/form-skin-valoration.component';

import { ChNutritionListComponent } from './ch-nutrition-list/ch-nutrition-list.component';
import { ChNutritionInputComponent } from './ch-nutrition-list/ch-nutrition-input/ch-nutrition-input.component';
import { ChNutritionRegularNoneComponent } from './ch-nutrition-list/ch-nutrition-regular-note/ch-nutrition-regular-note.component';
import { FormAnthropometryComponent } from './ch-nutrition-list/ch-nutrition-input/form-anthropometry/form-anthropometry.component';
import { FormGastrointestinalComponent } from './ch-nutrition-list/ch-nutrition-input/form-gastrointestinal/form-gastrointestinal.component';
import { FormFoodHistoryComponent } from './ch-nutrition-list/ch-nutrition-input/form-food-history/form-food-history.component';
import { FormAnalysisAndInterpretationComponent } from './ch-nutrition-list/ch-nutrition-input/form-analysis-and-interpretation/form-analysis-and-interpretation.component';
import { FormParenteralNutritionComponent } from './ch-nutrition-list/ch-nutrition-input/form-parenteral-nutrition/form-parenteral-nutrition.component';
import { FormClinicHistoryLanguageComponent } from './clinic-history-language-list/form-clinic-history-language/form-clinic-history-language.component';
import { ClinicHistoryLanguageListComponent } from './clinic-history-language-list/clinic-history-language-list.component';
import { ActionsLanguageComponent } from './clinic-history-language-list/actionslanguage.component';
import { FormLanguageAssessmentComponent } from './language-assessment/form-language-assessment/form-language-assessment.component';

import { LanguageListComponent } from './language-list/language-list.component';
import { FormLanguageEvolutionComponent } from './language-evolution/form-language-evolution/form-language-evolution.component';
import { RegularLanguageListComponent } from './regularlanguage-list/regularlanguage-list.component';
import { FormLanguageAssessmentRegularComponent } from './language-assessment-regular/form-language-assessment-regular/form-language-assessment-regular.component';
import { FormLanguageConceptComponent } from './language-concept/form-language-concept/form-language-concept.component';
import { FormLanguageMaterialusedComponent } from './language-materialused/form-language-materialused/form-language-materialused.component';
import { LanguageMaterialusedComponent } from './language-materialused/language-materialused.component';
import { FormLanguageInterventionComponent } from './language-intervention/form-language-intervention/form-language-intervention.component';
import { FormLanguageEvoDiagnosisComponent } from './language-evo-diagnosis/form-language-evo-diagnosis/form-language-evo-diagnosis.component';
import { FormLanguageRegSessionsComponent } from './language-reg-sessions/form-language-reg-sessions/form-language-reg-sessions.component';
import { FormLanguageTherapeuticGoalsComponent } from './language-therapeutic-goals/form-language-therapeutic-goals/form-language-therapeutic-goals.component';
import { DrugApplicationComponent } from './drug-application/drug-application.component';
import { FormDrugApplicationComponent } from './drug-application/form-drug-application/form-drug-application.component';
import { NurseringMedicationComponent } from './nursering-medication/nursering-medication.component';
import { FormNurseringMedicationComponent } from './nursering-medication/form-nursering-medication/form-nursering-medication.component';
import { MedicationOrderComponent } from './medication-order/medication-order.component';
import { FormMedicationOrderComponent } from './medication-order/form-medication-order/form-medication-order.component';
import { NurseringNotesComponent } from './nursering-notes/nursering-notes.component';
import { FormNurseringNotesComponent } from './nursering-notes/form-nursering-notes/form-nursering-notes.component';
import { NotesDescriptionComponent } from './notes-description/notes-description.component';
import { FormNotesDescriptionComponent } from './notes-description/form-notes-description/form-notes-description.component';
import { CarePlanComponent } from './care-plan/care-plan.component';
import { FormCarePlanComponent } from './care-plan/form-care-plan/form-care-plan.component';
import { LiquidControlComponent } from './liquid-control/liquid-control.component';
import { FormLiquidControlComponent } from './liquid-control/form-liquid-control/form-liquid-control.component';
import { FormLiquidEliminationComponent } from './liquid-control/form-liquid-elimination/form-liquid-elimination.component';
import { NursingProcedureComponent } from './nursing-procedure/nursing-procedure.component';
import { FormNursingProcedureComponent } from './nursing-procedure/form-nursing-procedure/form-nursing-procedure.component';
import { FormRespiratoryTherapyComponent } from './respiratory-therapy-list/form-respiratory-therapy/form-respiratory-therapy.component';
import { EntryRespiratoryTherapyComponent } from './entry-respiratory-therapy/entry-respiratory-therapy.component';
import { FormReasonConsultationRespiratoryTherapyComponent } from './entry-respiratory-therapy/form-reason-consultation-respiratory-therapy/form-reason-consultation-respiratory-therapy.component';
import { ActionsRespiratoryTherapyComponent } from './respiratory-therapy-list/actionsRespiratoryTherapy.component';
import { ActionsRespiratoryTherapy2Component } from './entry-respiratory-therapy/actions.component';
import { RespiratoryTherapyListComponent } from './respiratory-therapy-list/respiratory-therapy-list.component';
import { FormAssessmentTherapyComponent } from './assessment-therapy/form-assessment-therapy.component';
import { FormIspectionTherapyComponent } from './ispection-therapy/form-ispection-therapy.component';
import { FormaAuscultacionTherapyComponent } from './auscultacion-therapy/form-auscultacion-therapy.component';
import { FormaObjectivesTherapyComponent } from './objectives-therapy/form-objectives-therapy/form-objectives-therapy.component';
import { FormaDiagnosticTherapyComponent } from './diagnostic-therapy/form-diagnostic-therapy.component';
import { FormChOxygenTherapyComponent } from './oxygen-therapy/form-oxygen-therapy.component';
import { RegularRespiratoryTherapyComponent } from './regular-respiratory-therapy/regular-respiratory-therapy.component';
import { FormSessionsTherapyComponent } from './sessions-therapy/form-sessions-therapy.component';
import { FormSuppliesTherapyComponent } from './supplies-therapy/form-supplies-therapy.component';
import { OxygenTherapyComponent } from './oxygen-therapy/oxygen-therapy.component';
import { FormDiagnosisCifTherapyComponent } from './diagnosis-cif-therapy/form-diagnosis-cif-therapy.component';
import { SessionsTherapyComponent } from './sessions-therapy/sessions-therapy.component';
import { FormNutritionBackgroundComponent } from './ch-nutrition-list/ch-nutrition-input/form-nutrition-background/form-nutrition-background.component';
import { NursingPhysicalExamComponent } from './nursing-physical-exam/nursing-physical-exam.component';
import { FormNursingPhysicalExamComponent } from './nursing-physical-exam/form-nursing-physical-exam/form-nursing-physical-exam.component';
import { SuppliesTherapyComponent } from './supplies-therapy/supplies-therapy.component';
import { ReasonConsultationRespiratoryTherapyComponent } from './entry-respiratory-therapy/form-reason-consultation-respiratory-therapy/reason-consultation-respiratory-therapy.component';
import { FormLanguageOstomiesComponent } from './language-ostomies/form-language-ostomies/form-language-ostomies.component';
import { LanguageOstomiesComponent } from './language-ostomies/language-ostomies.component';
import { FormLanguageSwallowingComponent } from './language-swallowing/form-language-swallowing/form-language-swallowing.component';
import { LanguageSwallowingComponent } from './language-swallowing/language-swallowing.component';
import { FormLanguageAlterationsComponent } from './language-alterations/form-language-alterations/form-language-alterations.component';
import { LanguageAlterationsComponent } from './language-alterations/language-alterations.component';
import { FormLanguageHearingComponent } from './language-hearing/form-language-hearing/form-language-hearing.component';
import { LanguageHearingComponent } from './language-hearing/language-hearing.component';
import { FormLanguageLinguisticComponent } from './language-linguistic/form-language-linguistic/form-language-linguistic.component';
import { LanguageLinguisticComponent } from './language-linguistic/language-linguistic.component';
import { LanguageCommunicationComponent } from './language-communication/language-communication.component';
import { FormLanguageOrofacialComponent } from './language-orofacial/form-language-orofacial/form-language-orofacial.component';
import { LanguageOrofacialComponent } from './language-orofacial/language-orofacial.component';
import { FormLanguageSpeechComponent } from './language-speech/form-language-speech/form-language-speech.component';
import { LanguageSpeechComponent } from './language-speech/language-speech.component';
import { FormLanguageTestsComponent } from './language-tests/form-language-tests/form-language-tests.component';
import { LanguageTestsComponent } from './language-tests/language-tests.component';
import { FormLanguageCognitiveComponent } from './language-cognitive/form-language-cognitive/form-language-cognitive.component';
import { LanguageCognitiveComponent } from './language-cognitive/language-cognitive.component';
import { LanguageAssessmentComponent } from './language-assessment/language-assessment.component';
import { LanguageAssessmentRegularComponent } from './language-assessment-regular/language-assessment-regular.component';
import { LanguageRegSessionsComponent } from './language-reg-sessions/language-reg-sessions.component';
import { FormChInabilityComponent } from './ch-inability/form-ch-inability/form-ch-inability.component';
import { ChInabilityComponent } from './ch-inability/ch-inability.component';
import { FormLanguageCommunicationComponent } from './language-communication/form-language-communication/form-language-communication.component';
import { LanguageInterventionComponent } from './language-intervention/language-intervention.component';
import { ChMedicalCertificateComponent } from './ch-medical-certificate/ch-medical-certificate.component';
import { FormChMedicalCertificateComponent } from './ch-medical-certificate/form-ch-medical-certificate/form-ch-medical-certificate.component';
import { LanguageConceptComponent } from './language-concept/language-concept.component';
import { FormChOstomiesComponent } from './ch-ostomies/form-ch-ostomies/form-ch-ostomies.component';
import { ChOstomiesComponent } from './ch-ostomies/ch-ostomies.component';
import { ChApComponent } from './ch-ap/ch-ap.component';
import { FormChApComponent } from './ch-ap/form-ch-ap/form-ch-ap.component';
import { FormEntryMotorIntPatOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-int-pat-ot/form-entry-motor-int-pat-ot.component';
import { FormEntryMotorMovPatOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-mov-pat-ot/form-entry-motor-mov-pat-ot.component';
import { FormEntryMotorThermalOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-thermal-ot/form-entry-motor-thermal-ot.component';
import { FormEntryMotorDisAuditorylOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-dis-auditory-ot/form-entry-motor-dis-auditory-ot.component';
import { FormEntryMotorAcuityOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-acuity-ot/form-entry-motor-acuity-ot.component';
import { FormEntryMotorAssessmentOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-assessment-ot/form-entry-motor-assessment-ot.component';
import { FormEntryMotorCommunicationOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-communication-ot/form-entry-motor-communication-ot.component';
import { FormEntryMotorComponentOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-component-ot/form-entry-motor-component-ot.component';
import { FormEntryMotorDisTactilelOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-dis-tactile-ot/form-entry-motor-dis-tactile-ot.component';
import { FormEntryMotorTestOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-test-ot/form-entry-motor-test-ot.component';
import { FormEntryMotorWeeklyIntOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-weekly-int-ot/form-entry-motor-weekly-int-ot.component';
import { EntryFormDailyActivitiesOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-daily-activities/entry-form-daily-activities-ot.component';
import { EntryFormMotorSkillsOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/entry-form-motor-skills-ot.component';
import { EntryFormOccupatHistoryValorationOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-occupat-history/entry-form-occupat-history-valoration-ot.component';
import { EntryFormPastOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-past/entry-form-past-ot.component';
import { EntryFormValorationOtComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-valoration-ot/entry-form-valoration-ot.component';
import { FormRNValorationOtComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-valoration-ot/form-r-n-valoration-ot/form-r-n-valoration-ot.component';
import { RNValorationOtComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-valoration-ot/r-n-valoration-ot.component';
import { Actions31Component } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-valoration-ot/actions.component';
import { RNTheraputicObjOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-therapeutic-obj-ot/r-n-therapeutic_obj-ot.component';
import { FormRNTherapeuticObjOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-therapeutic-obj-ot/form-r-n-therapeutic-obj-ot/form-r-n-therapeutic-obj-ot.component';
import { FormRNMaterialsOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-metarials-ot/form-r-n-materials-ot/form-r-n-materials-ot.component';
import { RNMaterialsOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-metarials-ot/r-n-materials-ot.component';
import { ForRNmWeeklyOTComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-weekly-ot/form-r-n-weekly-ot/form-r-n-weekly-ot.component';
import { RNWeeklyOtComponent } from './entry-clinic-history-occupational-therapy/regular-note-therapy-occupational/r-n-weekly-ot/r-n-weekly-ot.component';

import { ActionsAplicationsComponent } from './drug-application/actions.component';
import { FormEntryMotorFunPatOTComponent } from './entry-clinic-history-occupational-therapy/entry-therapy-occupational/entry-form-motor-skills/form-entry-motor-fun-pat-ot/form-entry-motor-fun-pat-ot.component';
import { ClinicHistoryOccupationalTherapy } from './entry-clinic-history-occupational-therapy/ch-occupational-therapy.component';
import { ObjectivesTherapyComponent } from './objectives-therapy/objectives-therapy.component';
import { FormChPositionComponent } from './ch-position/form-ch-position/form-ch-position.component';
import { ChPositionComponent } from './ch-position/ch-position.component';
import { ChOxigenComponent } from './ch-oxigen/ch-oxigen.component';
import { FormChOxigenComponent } from './ch-oxigen/form-ch-oxigen/form-ch-oxigen.component';
import { ChHairValorationComponent } from './ch-hair-valoration/ch-hair-valoration.component';
import { FormChHairValorationComponent } from './ch-hair-valoration/form-ch-hair-valoration/form-ch-hair-valoration.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    PadModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
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
  ],
  declarations: [
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
    FormLiquidControlComponent,
    FormLiquidEliminationComponent,

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

    ClinicHistoryOccupationalTherapy,

    EntryFormDailyActivitiesOTComponent,
    EntryFormMotorSkillsOTComponent,

    FormEntryMotorFunPatOTComponent,
    FormEntryMotorIntPatOTComponent,
    FormEntryMotorMovPatOTComponent,
    FormEntryMotorThermalOTComponent,
    FormEntryMotorDisAuditorylOTComponent,
    FormEntryMotorDisTactilelOTComponent,
    FormEntryMotorAcuityOTComponent,
    FormEntryMotorComponentOTComponent,
    FormEntryMotorTestOTComponent,
    FormEntryMotorCommunicationOTComponent,
    FormEntryMotorAssessmentOTComponent,
    FormEntryMotorWeeklyIntOTComponent,

    EntryFormOccupatHistoryValorationOTComponent,
    EntryFormPastOTComponent,
    FormRNValorationOtComponent,
    EntryFormValorationOtComponent,
    RNValorationOtComponent,
    FormRNTherapeuticObjOTComponent,
    RNTheraputicObjOTComponent,
    FormRNMaterialsOTComponent,
    RNMaterialsOTComponent,
    ForRNmWeeklyOTComponent,
    RNWeeklyOtComponent,


    RespiratoryTherapyListComponent,
    FormRespiratoryTherapyComponent,
    FormAssessmentTherapyComponent,
    EntryRespiratoryTherapyComponent,
    FormReasonConsultationRespiratoryTherapyComponent,
    ReasonConsultationRespiratoryTherapyComponent,
    ActionsRespiratoryTherapyComponent,
    ActionsRespiratoryTherapy2Component,

    FormIspectionTherapyComponent,
    FormaAuscultacionTherapyComponent,
    FormaDiagnosticTherapyComponent,
    FormaObjectivesTherapyComponent,
    ObjectivesTherapyComponent,
    FormChOxygenTherapyComponent,
    OxygenTherapyComponent,

    RegularRespiratoryTherapyComponent,
    FormDiagnosisCifTherapyComponent,
    SessionsTherapyComponent,

    FormSessionsTherapyComponent,
    FormSuppliesTherapyComponent,
    SuppliesTherapyComponent,

    SkinValorationComponent,
    FormSkinValorationComponent,


    ClinicHistoryComponent,
    FormClinicHistoryComponent,
    ClinicHistoryListComponent,
    FormReasonConsultationComponent,
    EntryClinicHistoryComponent,
    ChRecordListComponent,
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
    FormOrdersMedicalComponent,
    FormSystemExamComponent,
    SystemExamComponent,
    Actions7Component,



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

    FormsignsEvoComponent,
    Actions12Component,
    SignsEvoComponent,

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

    FormPatientExitComponent,
    PatientExitComponent,

    FormChInterconsultationComponent,
    ChInterconsultationComponent,

    FormChMedicalOrdersComponent,
    ChMedicalOrdersComponent,
    FormOrdersMedicalComponent,
    OrdersMedicalComponent,

    ChHistoricScalesComponent,

    ChNutritionListComponent,
    ChNutritionInputComponent,
    ChNutritionRegularNoneComponent,
    FormAnthropometryComponent,
    FormGastrointestinalComponent,
    FormFoodHistoryComponent,
    FormAnalysisAndInterpretationComponent,
    FormParenteralNutritionComponent,
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
    ChMedicalCertificateComponent,
    FormChMedicalCertificateComponent,
    LanguageConceptComponent,
    FormChOstomiesComponent,
    ChOstomiesComponent,
    ChApComponent,
    FormChApComponent,

    Actions31Component,


  ],


  providers: [DateFormatPipe],
  exports: [
    // InsumeRequestComponent,
    // FormInsumeRequestComponent,
  ],
})
export class ClinicHistoryModule { }
