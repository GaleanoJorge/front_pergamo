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
import { ClinicHistoryOccupationalTherapy } from './entry-clinic-history-occupational-therapy/ch-occupational-therapy.component';
import { ActionoOcupationalTherapyComponent } from './entry-clinic-history-occupational-therapy/actions.component';
import { FormEntryDailyActivitiesOTComponent } from './entry-clinic-history-occupational-therapy/form-entry-consultation-occupational-therapy/form-entry-daily-activities-ot/form-entry-daily-activities-ot.component';
import { FormEntryMotorSkillsOTComponent } from './entry-clinic-history-occupational-therapy/form-entry-consultation-occupational-therapy/form-entry-motor-skills-ot/form-entry-motor-skills-ot.component';
import { FormEntryOccupatHistoryValorationOTComponent } from './entry-clinic-history-occupational-therapy/form-entry-consultation-occupational-therapy/form-entry-occupat-history-ot/form-entry-occupat-history-valoration-ot.component';
import { FormEntryPastOTComponent } from './entry-clinic-history-occupational-therapy/form-entry-consultation-occupational-therapy/form-entry-past-ot/form-entry-past-ot.component';
import { FormEntryValorationOTComponent } from './entry-clinic-history-occupational-therapy/form-entry-consultation-occupational-therapy/form-entry-valoration-ot/form-entry-valoration-ot.component';
import { FormRegularNoteOTComponent } from './entry-clinic-history-occupational-therapy/form-regular-note-consultation-occupational-therapy copy/form-regular-note-ot.component';
import { FormRegularNoteValorationOTComponent } from './entry-clinic-history-occupational-therapy/form-regular-note-consultation-occupational-therapy copy/form-regular-note-ot/form-regular-note-valoration-ot.component';
import { FormEntryOTComponent } from './entry-clinic-history-occupational-therapy/form-entry-consultation-occupational-therapy/form-entry-ot.component';
import { FormRegularNoteTherapeuticGoalsOTComponent } from './entry-clinic-history-occupational-therapy/form-regular-note-consultation-occupational-therapy copy/form-regular-note-therapeutic-goals-ot/form-regular-note-therapeutic-goals-ot.component';


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

    ClinicHistoryNursingListComponent,
    FormClinicHistoryNursingComponent,
    
    EntryClinicHistoryNursingComponent,
    FormReasonConsultationNursingComponent,
    
    ActionsNursingComponent,
    ActionsNursing2Component,

    ClinicHistoryOccupationalTherapy,

    FormEntryDailyActivitiesOTComponent,
    FormEntryMotorSkillsOTComponent,
    FormEntryOccupatHistoryValorationOTComponent,
    FormEntryPastOTComponent,
    FormEntryValorationOTComponent,
    FormEntryOTComponent,


    FormRegularNoteOTComponent,
    FormRegularNoteValorationOTComponent,
    FormRegularNoteTherapeuticGoalsOTComponent,

    ActionoOcupationalTherapyComponent,

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
  ],


  providers: [DateFormatPipe],
  exports: [],
})
export class ClinicHistoryModule {}
