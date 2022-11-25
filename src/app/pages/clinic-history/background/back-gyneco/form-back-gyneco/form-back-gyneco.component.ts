import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Input() title: string;
  @Input() data: any = null;
  @Input() type_record_id: any;
  @Input() record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_type_gynecologists: any[];
  public ch_flow_gynecologists: any[];
  public ch_rst_cytology_gyneco: any[];
  public ch_rst_biopsy_gyneco: any[];
  public ch_rst_mammography_gyneco: any[];
  public ch_rst_colposcipia_gyneco: any[];
  public ch_failure_method_gyneco: any[];
  public ch_planning_gynecologists: any[];
  public ch_method_planning_gyneco: any[];
  public ch_exam_gynecologists: any[];
  checked = false;

  constructor(
    private formBuilder: FormBuilder,
    private ChTypeGynecoS: ChTypeGynecologistsService,
    private ChPlanningGynecoS: ChPlanningGynecologistsService,
    private ChExamGynecoS: ChExamGynecologistsService,
    private ChFailureMethodGynecoS: ChFailureMethodGynecoService,
    private ChFlowGynecoS: ChFlowGynecologistsService,
    private ChMethodPlanningGynecoS: ChMethodPlanningGynecoService,
    private ChRstBiopsyGynecoS: ChRstBiopsyGynecoService,
    private ChRstColposcipiaGynecoS: ChRstColposcipiaGynecoService,
    private ChRstCytologyGynecoS: ChRstCytologyGynecoService,
    private ChRstMammographyGynecoS: ChRstMammographyGynecoService,
    private ChGynecologistsS: ChGynecologistsService,
    private toastService: NbToastrService,
  ) {
  }
  toggle(checked: boolean) {
    this.checked = checked;
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

    this.ChGynecologistsS.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: this.record_id,
    }).then(x => {
      if (x.length > 0) {
        this.messageEvent.emit(true);
      }
    });

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
      pregnancy_status: [this.data.pregnancy_status,],
      gestational_age: [this.data.gestational_age,],
      date_childbirth: [this.data.date_childbirth,],
      menarche_years: [this.data.menarche_years, Validators.compose([Validators.required]),
    ],
      last_menstruation: [this.data.last_menstruation,Validators.compose([Validators.required]),],
      time_menstruation: [this.data.time_menstruation,],
      duration_menstruation: [this.data.duration_menstruation,],
      date_last_cytology: [this.data.date_last_cytology,],
      date_biopsy: [this.data.date_biopsy,],
      date_mammography: [this.data.date_mammography,],
      date_colposcipia: [this.data.date_colposcipia,],
      childbirth_number: [this.data.childbirth_number,],
      caesarean_operation: [this.data.caesarean_operation,],
      misbirth: [this.data.misbirth,],
      molar_pregnancy: [this.data.molar_pregnancy,],
      last_planned_pregnancy: [this.data.last_planned_pregnancy,],
      ectopic: [this.data.ectopic,],
      dead_sons: [this.data.dead_sons,],
      living_sons: [this.data.living_sons,],
      sons_dead_first_week: [this.data.sons_dead_first_week,],
      children_died_after_the_first_week: [this.data.children_died_after_the_first_week,],
      total_feats: [this.data.total_feats,],
      misbirth_unstudied: [this.data.misbirth_unstudied,],
      background_twins: [this.data.background_twins,],
      date_of_last_childbirth: [this.data.date_of_last_childbirth,],
      last_weight: [this.data.last_weight,],
      since_planning: [this.data.since_planning,],
      sexual_partners: [this.data.sexual_partners,],
      time_exam_breast_self: [this.data.time_exam_breast_self,],
      observation_breast_self_exam: [this.data.observation_breast_self_exam,],
      observation_flow: [this.data.observation_flow,],
      ch_type_gynecologists_id: [this.data.ch_type_gynecologists_id,],
      ch_planning_gynecologists_id: [this.data.ch_planning_gynecologists_id,],
      ch_exam_gynecologists_id: [this.data.ch_exam_gynecologists_id,],
      ch_failure_method_gyneco_id: [this.data.ch_failure_method_gyneco_id,],
      ch_flow_gynecologists_id: [this.data.ch_flow_gynecologists_id,],
      ch_method_planning_gyneco_id: [this.data.ch_method_planning_gyneco_id,],
      ch_rst_biopsy_gyneco_id: [this.data.ch_rst_biopsy_gyneco_id,],
      ch_rst_colposcipia_gyneco_id: [this.data.ch_rst_colposcipia_gyneco_id,],
      ch_rst_cytology_gyneco_id: [this.data.ch_rst_cytology_gyneco_id,],
      ch_rst_mammography_gyneco_id: [this.data.ch_rst_mammography_gyneco_id,],
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChGynecologistsS.Update({
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
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,

        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChGynecologistsS.Save({
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
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ 
            pregnancy_status:'',
            gestational_age: '',
            date_childbirth: '',
            menarche_years: '',
            last_menstruation: '',
            time_menstruation: '',
            duration_menstruation: '',
            date_last_cytology: '',
            date_biopsy:'',
            date_mammography:'',
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
            misbirth_unstudied:'',
            background_twins:'',
            last_planned_pregnancy: '',
            date_of_last_childbirth: '',
            last_weight: '',
            since_planning: '',
            sexual_partners: '',
            time_exam_breast_self: '',
            observation_breast_self_exam: '',
            observation_flow:'',
            ch_type_gynecologists_id:'',
            ch_planning_gynecologists_id: '',
            ch_exam_gynecologists_id: '',
            ch_failure_method_gyneco_id: '',
            ch_flow_gynecologists_id: '',
            ch_method_planning_gyneco_id: '',
            ch_rst_biopsy_gyneco_id: '',
            ch_rst_colposcipia_gyneco_id: '',
            ch_rst_cytology_gyneco_id: '',
            ch_rst_mammography_gyneco_id: '',

           }); if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });


      }

    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }
}
