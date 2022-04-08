import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChTypeGynecologistsService } from '../../../../../business-controller/ch_type_gynecologists.service';
import { ChPlanningGynecologistsService } from '../../../../../business-controller/ch_planning_gynecologists.service';
import { ChExamGynecologistsService } from '../../../../../business-controller/ch_exam_gynecologists.service';
import { ChFailureMethodGynecoService } from '../../../../../business-controller/ch_failure_method_gyneco.service';
import { ChFlowGynecologistsService } from '../../../../../business-controller/ch_flow_gynecologists.service';
import { ChMethodPlanningGynecoService } from '../../../../../business-controller/ch_method_planning_gyneco.service';
import { ChRstBiopsyGynecoService } from '../../../../../business-controller/ch_rst_biopsy_gyneco.service';
import { ChRstColposcipiaGynecoService } from '../../../../../business-controller/ch_rst_colposcipia_gyneco.service';
import { ChRstCytologyGynecoService } from '../../../../../business-controller/ch_rst_cytology_gyneco.service';
import { ChRstMammographyGynecoService } from '../../../../../business-controller/ch_rst_mammography_gyneco.service';
import { ChGynecologistsService } from '../../../../../business-controller/ch_gynecologists.service';


@Component({
  selector: 'ngx-form-back-gyneco',
  templateUrl: './form-back-gyneco.component.html',
  styleUrls: ['./form-back-gyneco.component.scss']
})
export class FormBackGynecoComponent implements OnInit {
  [x: string]: any;

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_type_gynecologists: any[];


  constructor(
    private formBuilder: FormBuilder,

    private ChTypeGynecoS: ChTypeGynecologistsService,
    private ChPlanningGynecoS: ChPlanningGynecologistsService,
    private ChExamGynecoS: ChExamGynecologistsService,
    private ChFailureMethodGynecoS : ChFailureMethodGynecoService,
    private ChFlowGynecoS : ChFlowGynecologistsService,
    private ChMethodPlanningGynecoS : ChMethodPlanningGynecoService,
    private ChRstBiopsyGynecoS : ChRstBiopsyGynecoService,
    private ChRstColposcipiaGynecoS : ChRstColposcipiaGynecoService,
    private ChRstCytologyGynecoS : ChRstCytologyGynecoService,
    private ChRstMammographyGynecoS : ChRstMammographyGynecoService,
    private ChGynecologistsService: ChGynecologistsService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        pregnancy_status: '',
        gestational_age: '',
        date_childbirth: '',
        menarche_years: '',
        last_menstruation: '',
        time_menstruation: '',
        duration_menstruation: '',
        date_last_cytology: '',
        date_biopsy: '',
        date_mammography: '',
        date_colposcipia: '',
        childbirth_number: '',
        caesarean_operation: '',
        misbirth: '',
        molar_pregnancy: '',
        ectopic: '',
        dead_sons: '',
        living_sons: '',
        sons_dead_first_week: '',
        children_died_after_the_first_week: '',
        total_feats: '',
        misbirth_unstudied: '',
        background_twins: '',
        last_planned_pregnancy: '',
        date_of_last_childbirth: '',
        last_weight: '',
        since_planning: '',
        sexual_partners: '',
        time_exam_breast_self: '',
        observation_breast_self_exam: '',
        observation_flow: '',
        ch_type_gynecologists_id: '',
        ch_planning_gynecologists_id: '',
        ch_flow_gynecologists_id: '',
        ch_exam_gynecologists_id: '',
        ch_rst_cytology_gyneco_id: '',
        ch_rst_biopsy_gyneco_id: '',
        ch_rst_mammography_gyneco_id: '',
        ch_rst_colposcipia_gyneco_id: '',
        ch_failure_method_gyneco_id: '',
        ch_method_planning_gyneco_id: '',
      };
    }

    this.ChTypeGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_type_gynecologists = x;
    });

    this.ChPlanningGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_planning_gynecologists = x;
    });

    this.ChFlowGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_flow_gynecologists = x;
    });

    this.ChExamGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_exam_gynecologists = x;
    });

    this.ChRstCytologyGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_rst_cytology_gyneco = x;
    });

    this.ChRstBiopsyGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_rst_biopsy_gyneco = x;
    });

    this.ChRstMammographyGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_rst_mammography_gyneco = x;
    });

    this.ChRstColposcipiaGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_rst_colposcipia_gyneco = x;
    });

    this.ChFailureMethodGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_failure_method_gyneco = x;
    });

    this.ChMethodPlanningGynecoS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_method_planning_gyneco = x;
    });

      this.form = this.formBuilder.group({
      pregnancy_status: [this.data[0] ? this.data[0].pregnancy_status : this.data.pregnancy_status,],
      gestational_age: [this.data[0] ? this.data[0].gestational_age : this.data.gestational_age,],
      date_childbirth: [this.data[0] ? this.data[0].date_childbirth : this.data.date_childbirth,],
      menarche_years: [this.data[0] ? this.data[0].menarche_years : this.data.menarche_years,],
      last_menstruation: [this.data[0] ? this.data[0].last_menstruation : this.data.last_menstruation,],
      time_menstruation: [this.data[0] ? this.data[0].time_menstruation : this.data.time_menstruation,],
      duration_menstruation: [this.data[0] ? this.data[0].duration_menstruation : this.data.duration_menstruation,],
      date_last_cytology: [this.data[0] ? this.data[0].date_last_cytology : this.data.date_last_cytology,],
      date_biopsy: [this.data[0] ? this.data[0].date_biopsy : this.data.date_biopsy,],
      date_mammography: [this.data[0] ? this.data[0].date_mammography : this.data.date_mammography,],
      date_colposcipia: [this.data[0] ? this.data[0].date_colposcipia : this.data.date_colposcipia,],
      childbirth_number: [this.data[0] ? this.data[0].childbirth_number : this.data.childbirth_number,],
      caesarean_operation: [this.data[0] ? this.data[0].caesarean_operation : this.data.caesarean_operation,],
      misbirth: [this.data[0] ? this.data[0].misbirth : this.data.misbirth,],
      molar_pregnancy: [this.data[0] ? this.data[0].molar_pregnancy : this.data.molar_pregnancy,],
      ectopic: [this.data[0] ? this.data[0].ectopic : this.data.ectopic,],
      dead_sons: [this.data[0] ? this.data[0].dead_sons : this.data.dead_sons,],
      living_sons: [this.data[0] ? this.data[0].living_sons : this.data.living_sons,],
      sons_dead_first_week: [this.data[0] ? this.data[0].sons_dead_first_week : this.data.sons_dead_first_week,],
      children_died_after_the_first_week: [this.data[0] ? this.data[0].children_died_after_the_first_week : this.data.children_died_after_the_first_week,],
      total_feats: [this.data[0] ? this.data[0].total_feats : this.data.total_feats,],
      misbirth_unstudied: [this.data[0] ? this.data[0].misbirth_unstudied : this.data.misbirth_unstudied,],
      background_twins: [this.data[0] ? this.data[0].background_twins : this.data.background_twins,],
      date_of_last_childbirth: [this.data[0] ? this.data[0].date_of_last_childbirth : this.data.date_of_last_childbirth,],
      last_weight: [this.data[0] ? this.data[0].last_weight : this.data.last_weight,],
      since_planning: [this.data[0] ? this.data[0].since_planning : this.data.since_planning,],
      sexual_partners: [this.data[0] ? this.data[0].sexual_partners : this.data.sexual_partners,],
      time_exam_breast_self: [this.data[0] ? this.data[0].time_exam_breast_self : this.data.time_exam_breast_self,],
      observation_breast_self_exam: [this.data[0] ? this.data[0].observation_breast_self_exam : this.data.observation_breast_self_exam,],
      observation_flow: [this.data[0] ? this.data[0].observation_flow : this.data.observation_flow,],
      ch_type_gynecologists_id: [this.data[0] ? this.data[0].ch_type_gynecologists_id : this.data.ch_type_gynecologists_id,],
      ch_planning_gynecologists_id: [this.data[0] ? this.data[0].ch_planning_gynecologists_id : this.data.ch_planning_gynecologists_id,],
      ch_exam_gynecologists_id: [this.data[0] ? this.data[0].ch_exam_gynecologists_id : this.data.ch_exam_gynecologists_id,],
      ch_failure_method_gyneco_id: [this.data[0] ? this.data[0].ch_failure_method_gyneco_id : this.data.ch_failure_method_gyneco_id,],
      ch_flow_gynecologists_id: [this.data[0] ? this.data[0].ch_flow_gynecologists_id : this.data.ch_flow_gynecologists_id,],
      ch_method_planning_gyneco_id: [this.data[0] ? this.data[0].ch_method_planning_gyneco_id : this.data.ch_method_planning_gyneco_id,],
      ch_rst_biopsy_gyneco_id: [this.data[0] ? this.data[0].ch_rst_biopsy_gyneco_id : this.data.ch_rst_biopsy_gyneco_id,],
      ch_rst_colposcipia_gyneco_id: [this.data[0] ? this.data[0].ch_rst_colposcipia_gyneco_id : this.data.ch_rst_colposcipia_gyneco_id,],
      ch_rst_cytology_gyneco_id: [this.data[0] ? this.data[0].ch_rst_cytology_gyneco_id : this.data.ch_rst_cytology_gyneco_id,],
      ch_rst_mammography_gyneco_id: [this.data[0] ? this.data[0].ch_rst_mammography_gyneco_id : this.data.ch_rst_mammography_gyneco_id,],
    });

  
    if (this.data.pregnancy_status != '') {
      this.form.controls.pregnancy_status.disable();
      this.form.controls.gestational_age.disable();
      this.form.controls.date_childbirth.disable();
      this.form.controls.menarche_years.disable();
      this.form.controls.last_menstruation.disable();
      this.form.controls.time_menstruation.disable();
      this.form.controls.duration_menstruation.disable();
      this.form.controls.date_last_cytology.disable();
      this.form.controls.date_biopsy.disable();
      this.form.controls.date_mammography.disable();
      this.form.controls.date_colposcipia.disable();
      this.form.controls.childbirth_number.disable();
      this.form.controls.caesarean_operation.disable();
      this.form.controls.misbirth.disable();
      this.form.controls.molar_pregnancy.disable();
      this.form.controls.ectopic.disable();
      this.form.controls.dead_sons.disable();
      this.form.controls.living_sons.disable();
      this.form.controls.sons_dead_first_week.disable();
      this.form.controls.children_died_after_the_first_week.disable();
      this.form.controls.total_feats.disable();
      this.form.controls.misbirth_unstudied.disable();
      this.form.controls.background_twins.disable();
      this.form.controls.last_planned_pregnancy.disable();
      this.form.controls.date_of_last_childbirth.disable();
      this.form.controls.last_weight.disable();
      this.form.controls.since_planning.disable();
      this.form.controls.sexual_partners.disable();
      this.form.controls.time_exam_breast_self.disable();
      this.form.controls.observation_breast_self_exam.disable();
      this.form.controls.observation_flow.disable();
      this.form.controls.ch_type_gynecologists_id.disable();
      this.form.controls.ch_planning_gynecologists_id.disable();
      this.form.controls.ch_exam_gynecologists_id.disable();
      this.form.controls.ch_failure_method_gyneco_id.disable();
      this.form.controls.ch_flow_gynecologists_id.disable();
      this.form.controls.ch_method_planning_gyneco_id.disable();
      this.form.controls.ch_rst_biopsy_gyneco_id.disable();
      this.form.controls.ch_rst_colposcipia_gyneco_id.disable();
      this.form.controls.ch_rst_cytology_gyneco_id.disable();
      this.form.controls.ch_rst_mammography_gyneco_id.disable();
      this.disabled = true;
    } else {
      this.form.controls.pregnancy_status.enable();
      this.form.controls.gestational_age.enable();
      this.form.controls.date_childbirth.enable();
      this.form.controls.menarche_years.enable();
      this.form.controls.last_menstruation.enable();
      this.form.controls.time_menstruation.enable();
      this.form.controls.duration_menstruation.enable();
      this.form.controls.date_last_cytology.enable();
      this.form.controls.date_biopsy.enable();
      this.form.controls.date_mammography.enable();
      this.form.controls.date_colposcipia.enable();
      this.form.controls.childbirth_number.enable();
      this.form.controls.caesarean_operation.enable();
      this.form.controls.misbirth.enable();
      this.form.controls.molar_pregnancy.enable();
      this.form.controls.ectopic.enable();
      this.form.controls.dead_sons.enable();
      this.form.controls.living_sons.enable();
      this.form.controls.sons_dead_first_week.enable();
      this.form.controls.children_died_after_the_first_week.enable();
      this.form.controls.total_feats.enable();
      this.form.controls.misbirth_unstudied.enable();
      this.form.controls.background_twins.enable();
      this.form.controls.last_planned_pregnancy.enable();
      this.form.controls.date_of_last_childbirth.enable();
      this.form.controls.last_weight.enable();
      this.form.controls.since_planning.enable();
      this.form.controls.sexual_partners.enable();
      this.form.controls.time_exam_breast_self.enable();
      this.form.controls.observation_breast_self_exam.enable();
      this.form.controls.observation_flow.enable();
      this.form.controls.ch_type_gynecologists_id.enable();
      this.form.controls.ch_planning_gynecologists_id.enable();
      this.form.controls.ch_exam_gynecologists_id.enable();
      this.form.controls.ch_failure_method_gyneco_id.enable();
      this.form.controls.ch_flow_gynecologists_id.enable();
      this.form.controls.ch_method_planning_gyneco_id.enable();
      this.form.controls.ch_rst_biopsy_gyneco_id.enable();
      this.form.controls.ch_rst_colposcipia_gyneco_id.enable();
      this.form.controls.ch_rst_cytology_gyneco_id.enable();
      this.form.controls.ch_rst_mammography_gyneco_id.enable();
      this.disabled = false;
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.reasonConsultationS.Update({
          id: this.data.id,
          pregnancy_status: this.form.controls.pregnancy_status.value,
          gestational_age: this.form.controls.gestational_age.value,
          date_childbirth: this.form.controls.date_childbirth.value,
          menarche_years: this.form.controls.menarche_years.value,
          last_menstruation: this.form.controls.last_menstruation.value,
          time_menstruation: this.form.controls.time_menstruation.value,
          duration_menstruation: this.form.controls.duration_menstruation.value,
          date_last_cytology: this.form.controls.date_last_cytology.value,
          date_biopsy: this.form.controls.date_biopsy.value,
          date_mammography: this.form.controls.date_mammography.value,
          date_colposcipia: this.form.controls.date_colposcipia.value,
          childbirth_number: this.form.controls.childbirth_number.value,
          caesarean_operation: this.form.controls.caesarean_operation.value,
          misbirth: this.form.controls.misbirth.value,
          molar_pregnancy: this.form.controls.molar_pregnancy.value,
          ectopic: this.form.controls.ectopic.value,
          dead_sons: this.form.controls.dead_sons.value,
          living_sons: this.form.controls.living_sons.value,
          sons_dead_first_week: this.form.controls.sons_dead_first_week.value,
          children_died_after_the_first_week: this.form.controls.children_died_after_the_first_week.value,
          total_feats: this.form.controls.total_feats.value,
          misbirth_unstudied: this.form.controls.misbirth_unstudied.value,
          background_twins: this.form.controls.background_twins.value,
          last_planned_pregnancy: this.form.controls.last_planned_pregnancy.value,
          date_of_last_childbirth: this.form.controls.date_of_last_childbirth.value,
          last_weight: this.form.controls.last_weight.value,
          since_planning: this.form.controls.since_planning.value,
          sexual_partners: this.form.controls.sexual_partners.value,
          time_exam_breast_self: this.form.controls.time_exam_breast_self.value,
          observation_breast_self_exam: this.form.controls.observation_breast_self_exam.value,
          observation_flow: this.form.controls.observation_flow.value,
          ch_type_gynecologists_id: this.form.controls.ch_type_gynecologists_id.value,
          ch_planning_gynecologists_id: this.form.controls.ch_planning_gynecologists_id.value,
          ch_exam_gynecologists_id: this.form.controls.ch_exam_gynecologists_id.value,
          ch_failure_method_gyneco_id: this.form.controls.ch_failure_method_gyneco_id.value,
          ch_flow_gynecologists_id: this.form.controls.ch_flow_gynecologists_id.value,
          ch_method_planning_gyneco_id: this.form.controls.ch_method_planning_gyneco_id.value,
          ch_rst_biopsy_gyneco_id: this.form.controls.ch_rst_biopsy_gyneco_id.value,
          ch_rst_colposcipia_gyneco_id: this.form.controls.ch_rst_colposcipia_gyneco_id.value,
          ch_rst_cytology_gyneco_id: this.form.controls.ch_rst_cytology_gyneco_id.value,
          ch_rst_mammography_gyneco_id: this.form.controls.ch_rst_mammography_gyneco_id.value,
          type_record_id: 1,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChGynecologistsService.Save({
          id: this.data.id,
          pregnancy_status: this.form.controls.pregnancy_status.value,
          gestational_age: this.form.controls.gestational_age.value,
          date_childbirth: this.form.controls.date_childbirth.value,
          menarche_years: this.form.controls.menarche_years.value,
          last_menstruation: this.form.controls.last_menstruation.value,
          time_menstruation: this.form.controls.time_menstruation.value,
          duration_menstruation: this.form.controls.duration_menstruation.value,
          date_last_cytology: this.form.controls.date_last_cytology.value,
          date_biopsy: this.form.controls.date_biopsy.value,
          date_mammography: this.form.controls.date_mammography.value,
          date_colposcipia: this.form.controls.date_colposcipia.value,
          childbirth_number: this.form.controls.childbirth_number.value,
          caesarean_operation: this.form.controls.caesarean_operation.value,
          misbirth: this.form.controls.misbirth.value,
          molar_pregnancy: this.form.controls.molar_pregnancy.value,
          ectopic: this.form.controls.ectopic.value,
          dead_sons: this.form.controls.dead_sons.value,
          living_sons: this.form.controls.living_sons.value,
          sons_dead_first_week: this.form.controls.sons_dead_first_week.value,
          children_died_after_the_first_week: this.form.controls.children_died_after_the_first_week.value,
          total_feats: this.form.controls.total_feats.value,
          misbirth_unstudied: this.form.controls.misbirth_unstudied.value,
          background_twins: this.form.controls.background_twins.value,
          last_planned_pregnancy: this.form.controls.last_planned_pregnancy.value,
          date_of_last_childbirth: this.form.controls.date_of_last_childbirth.value,
          last_weight: this.form.controls.last_weight.value,
          since_planning: this.form.controls.since_planning.value,
          sexual_partners: this.form.controls.sexual_partners.value,
          time_exam_breast_self: this.form.controls.time_exam_breast_self.value,
          observation_breast_self_exam: this.form.controls.observation_breast_self_exam.value,
          observation_flow: this.form.controls.observation_flow.value,
          ch_type_gynecologists_id: this.form.controls.ch_type_gynecologists_id.value,
          ch_planning_gynecologists_id: this.form.controls.ch_planning_gynecologists_id.value,
          ch_exam_gynecologists_id: this.form.controls.ch_exam_gynecologists_id.value,
          ch_failure_method_gyneco_id: this.form.controls.ch_failure_method_gyneco_id.value,
          ch_flow_gynecologists_id: this.form.controls.ch_flow_gynecologists_id.value,
          ch_method_planning_gyneco_id: this.form.controls.ch_method_planning_gyneco_id.value,
          ch_rst_biopsy_gyneco_id: this.form.controls.ch_rst_biopsy_gyneco_id.value,
          ch_rst_colposcipia_gyneco_id: this.form.controls.ch_rst_colposcipia_gyneco_id.value,
          ch_rst_cytology_gyneco_id: this.form.controls.ch_rst_cytology_gyneco_id.value,
          ch_rst_mammography_gyneco_id: this.form.controls.ch_rst_mammography_gyneco_id.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          if (this.form.controls.has_caregiver.value == true) {
            this.isSubmitted = true;
            this.loading = true;
          } else {
            this.isSubmitted = false;
            this.loading = false;
          }

        });
      }

    }
  }

}
