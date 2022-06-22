import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../../../business-controller/ch-external-cause.service';
import { ActivatedRoute } from '@angular/router';
import { ChObjectivesTherapyService } from '../../../../../../business-controller/ch_objectives_therapy.service';




@Component({
  selector: 'ngx-form-entry-motor-mov-pat-ot',
  templateUrl: './form-entry-motor-mov-pat-ot.component.html',
  styleUrls: ['./form-entry-motor-mov-pat-ot.component.scss']
})
export class FormEntryMovPatOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_external_cause: any[];



  constructor(
    private formBuilder: FormBuilder,
    private reasonConsultationS: ChReasonConsultationService,
    private chexternalcauseS: ChExternalCauseService,
    private toastService: NbToastrService,
    private ObjectivesS: ChObjectivesTherapyService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        scroll_right: '',
        scroll_left: '',
        get_up_right: '',
        get_up_left: '',
        push_right: '',
        push_left: '',
        pull_right: '',
        pull_left: '',
        transport_right: '',
        transport_left: '',
        attain_right: '',
        attain_left: '',
        bipedal_posture_right: '',
        bipedal_posture_left: '',
        sitting_posture_right: '',
        sitting_posture_left: '',
        squat_posture_right: '',
        squat_posture_left: '',
        use_both_hands_right: '',
        use_both_hands_left: '',
        alternating_movements_right: '',
        alternating_movements_left: '',
        dissociated_movements_right: '',
        dissociated_movements_left: '',
        Simultaneous_movements_right: '',
        Simultaneous_movements_left: '',
        bimanual_coordination_right: '',
        bimanual_coordination_left: '',
        hand_eye_coordination_right: '',
        hand_eye_coordination_left: '',
        hand_foot_coordination_right: '',
        hand_foot_coordination_left: '',

      };
    }

    this.form = this.formBuilder.group({


      scroll_right: [this.data[0] ? this.data[0].scroll_right : this.data.scroll_right, Validators.compose([Validators.required])],
      scroll_left: [this.data[0] ? this.data[0].scroll_left : this.data.scroll_left, Validators.compose([Validators.required])],
      get_up_right: [this.data[0] ? this.data[0].get_up_right : this.data.get_up_right, Validators.compose([Validators.required])],
      get_up_left: [this.data[0] ? this.data[0].get_up_left : this.data.get_up_left, Validators.compose([Validators.required])],
      push_right: [this.data[0] ? this.data[0].push_right : this.data.push_right, Validators.compose([Validators.required])],
      push_left: [this.data[0] ? this.data[0].push_left : this.data.push_left, Validators.compose([Validators.required])],
      pull_right: [this.data[0] ? this.data[0].pull_right : this.data.pull_right, Validators.compose([Validators.required])],
      pull_left: [this.data[0] ? this.data[0].pull_left : this.data.pull_left, Validators.compose([Validators.required])],
      transport_right: [this.data[0] ? this.data[0].transport_right : this.data.transport_right, Validators.compose([Validators.required])],
      transport_left: [this.data[0] ? this.data[0].transport_left : this.data.transport_left, Validators.compose([Validators.required])],
      attain_right: [this.data[0] ? this.data[0].attain_right : this.data.attain_right, Validators.compose([Validators.required])],
      attain_left: [this.data[0] ? this.data[0].attain_left : this.data.attain_left, Validators.compose([Validators.required])],
      bipedal_posture_right: [this.data[0] ? this.data[0].bipedal_posture_right : this.data.bipedal_posture_right, Validators.compose([Validators.required])],
      bipedal_posture_left: [this.data[0] ? this.data[0].bipedal_posture_left : this.data.bipedal_posture_left, Validators.compose([Validators.required])],
      sitting_posture_right: [this.data[0] ? this.data[0].sitting_posture_right : this.data.sitting_posture_right, Validators.compose([Validators.required])],
      sitting_posture_left: [this.data[0] ? this.data[0].sitting_posture_left : this.data.sitting_posture_left, Validators.compose([Validators.required])],
      squat_posture_right: [this.data[0] ? this.data[0].squat_posture_right : this.data.squat_posture_right, Validators.compose([Validators.required])],
      squat_posture_left: [this.data[0] ? this.data[0].squat_posture_left : this.data.squat_posture_left, Validators.compose([Validators.required])],
      use_both_hands_right: [this.data[0] ? this.data[0].use_both_hands_right : this.data.use_both_hands_right, Validators.compose([Validators.required])],
      use_both_hands_left: [this.data[0] ? this.data[0].use_both_hands_left : this.data.use_both_hands_left, Validators.compose([Validators.required])],
      alternating_movements_right: [this.data[0] ? this.data[0].alternating_movements_right : this.data.alternating_movements_right, Validators.compose([Validators.required])],
      alternating_movements_left: [this.data[0] ? this.data[0].alternating_movements_left : this.data.alternating_movements_left, Validators.compose([Validators.required])],
      dissociated_movements_right: [this.data[0] ? this.data[0].dissociated_movements_right : this.data.dissociated_movements_right, Validators.compose([Validators.required])],
      dissociated_movements_left: [this.data[0] ? this.data[0].dissociated_movements_left : this.data.dissociated_movements_left, Validators.compose([Validators.required])],
      Simultaneous_movements_right: [this.data[0] ? this.data[0].Simultaneous_movements_right : this.data.Simultaneous_movements_right, Validators.compose([Validators.required])],
      Simultaneous_movements_left: [this.data[0] ? this.data[0].Simultaneous_movements_left : this.data.Simultaneous_movements_left, Validators.compose([Validators.required])],
      bimanual_coordination_right: [this.data[0] ? this.data[0].bimanual_coordination_right : this.data.bimanual_coordination_right, Validators.compose([Validators.required])],
      bimanual_coordination_left: [this.data[0] ? this.data[0].bimanual_coordination_left : this.data.bimanual_coordination_left, Validators.compose([Validators.required])],
      hand_eye_coordination_right: [this.data[0] ? this.data[0].hand_eye_coordination_right : this.data.hand_eye_coordination_right, Validators.compose([Validators.required])],
      hand_eye_coordination_left: [this.data[0] ? this.data[0].hand_eye_coordination_left : this.data.hand_eye_coordination_left, Validators.compose([Validators.required])],
      hand_foot_coordination_right: [this.data[0] ? this.data[0].hand_foot_coordination_right : this.data.hand_foot_coordination_right, Validators.compose([Validators.required])],
      hand_foot_coordination_left: [this.data[0] ? this.data[0].hand_foot_coordination_left : this.data.hand_foot_coordination_left, Validators.compose([Validators.required])],

    });

    this.chexternalcauseS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_external_cause = x;
    });
    // if (this.data.reason_consultation != '') {
    //   this.form.controls.reason_consultation.disable();
    //   this.form.controls.current_illness.disable();
    //   this.form.controls.ch_external_cause_id.disable();
    //   this.disabled = true;
    // } else {
    //   this.form.controls.reason_consultation.enable();
    //   this.form.controls.current_illness.enable();
    //   this.form.controls.ch_external_cause_id.enable();
    //   this.disabled = false;
    // }
  }

  async save() {

  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

}


