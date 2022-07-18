import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEMSMovPatOTService } from '../../../../../../business-controller/ch_e_m_s_mov_pat_o_t.service';




@Component({
  selector: 'ngx-form-entry-motor-mov-pat-ot',
  templateUrl: './form-entry-motor-mov-pat-ot.component.html',
  styleUrls: ['./form-entry-motor-mov-pat-ot.component.scss']
})
export class FormEntryMotorMovPatOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEMSMovPatOTService: ChEMSMovPatOTService,
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

    if (this.data.scroll_right != '') {
      this.form.controls.scroll_right.disable();
      this.form.controls.scroll_left.disable();
      this.form.controls.get_up_right.disable();
      this.form.controls.get_up_left.disable();
      this.form.controls.push_right.disable();
      this.form.controls.push_left.disable();
      this.form.controls.pull_right.disable();
      this.form.controls.pull_left.disable();
      this.form.controls.transport_right.disable();
      this.form.controls.transport_left.disable();
      this.form.controls.attain_right.disable();
      this.form.controls.attain_left.disable();
      this.form.controls.bipedal_posture_right.disable();
      this.form.controls.bipedal_posture_left.disable();
      this.form.controls.sitting_posture_right.disable();
      this.form.controls.sitting_posture_left.disable();
      this.form.controls.squat_posture_right.disable();
      this.form.controls.squat_posture_left.disable();
      this.form.controls.use_both_hands_right.disable();
      this.form.controls.use_both_hands_left.disable();
      this.form.controls.alternating_movements_right.disable();
      this.form.controls.alternating_movements_left.disable();
      this.form.controls.dissociated_movements_right.disable();
      this.form.controls.dissociated_movements_left.disable();
      this.form.controls.Simultaneous_movements_right.disable();
      this.form.controls.Simultaneous_movements_left.disable();
      this.form.controls.bimanual_coordination_right.disable();
      this.form.controls.bimanual_coordination_left.disable();
      this.form.controls.hand_eye_coordination_right.disable();
      this.form.controls.hand_eye_coordination_left.disable();
      this.form.controls.hand_foot_coordination_right.disable();
      this.form.controls.hand_foot_coordination_left.disable();

      this.disabled = true;
    } else {
      this.form.controls.scroll_right.enable();
      this.form.controls.scroll_left.enable();
      this.form.controls.get_up_right.enable();
      this.form.controls.get_up_left.enable();
      this.form.controls.push_right.enable();
      this.form.controls.push_left.enable();
      this.form.controls.pull_right.enable();
      this.form.controls.pull_left.enable();
      this.form.controls.transport_right.enable();
      this.form.controls.transport_left.enable();
      this.form.controls.attain_right.enable();
      this.form.controls.attain_left.enable();
      this.form.controls.bipedal_posture_right.enable();
      this.form.controls.bipedal_posture_left.enable();
      this.form.controls.sitting_posture_right.enable();
      this.form.controls.sitting_posture_left.enable();
      this.form.controls.squat_posture_right.enable();
      this.form.controls.squat_posture_left.enable();
      this.form.controls.use_both_hands_right.enable();
      this.form.controls.use_both_hands_left.enable();
      this.form.controls.alternating_movements_right.enable();
      this.form.controls.alternating_movements_left.enable();
      this.form.controls.dissociated_movements_right.enable();
      this.form.controls.dissociated_movements_left.enable();
      this.form.controls.Simultaneous_movements_right.enable();
      this.form.controls.Simultaneous_movements_left.enable();
      this.form.controls.bimanual_coordination_right.enable();
      this.form.controls.bimanual_coordination_left.enable();
      this.form.controls.hand_eye_coordination_right.enable();
      this.form.controls.hand_eye_coordination_left.enable();
      this.form.controls.hand_foot_coordination_right.enable();
      this.form.controls.hand_foot_coordination_left.enable();

      this.disabled = false;
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
        await this.ChEMSMovPatOTService.Update({
          id: this.data.id,
          scroll_right: this.form.controls.scroll_right.value,
          scroll_left: this.form.controls.scroll_left.value,
          get_up_right: this.form.controls.get_up_right.value,
          get_up_left: this.form.controls.get_up_left.value,
          push_right: this.form.controls.push_right.value,
          push_left: this.form.controls.push_left.value,
          pull_right: this.form.controls.pull_right.value,
          pull_left: this.form.controls.pull_left.value,
          transport_right: this.form.controls.transport_right.value,
          transport_left: this.form.controls.transport_left.value,
          attain_right: this.form.controls.attain_right.value,
          attain_left: this.form.controls.attain_left.value,
          bipedal_posture_right: this.form.controls.bipedal_posture_right.value,
          bipedal_posture_left: this.form.controls.bipedal_posture_left.value,
          sitting_posture_right: this.form.controls.sitting_posture_right.value,
          sitting_posture_left: this.form.controls.sitting_posture_left.value,
          squat_posture_right: this.form.controls.squat_posture_right.value,
          squat_posture_left: this.form.controls.squat_posture_left.value,
          use_both_hands_right: this.form.controls.use_both_hands_right.value,
          use_both_hands_left: this.form.controls.use_both_hands_left.value,
          alternating_movements_right: this.form.controls.alternating_movements_right.value,
          alternating_movements_left: this.form.controls.alternating_movements_left.value,
          dissociated_movements_right: this.form.controls.dissociated_movements_right.value,
          dissociated_movements_left: this.form.controls.dissociated_movements_left.value,
          Simultaneous_movements_right: this.form.controls.Simultaneous_movements_right.value,
          Simultaneous_movements_left: this.form.controls.Simultaneous_movements_left.value,
          bimanual_coordination_right: this.form.controls.bimanual_coordination_right.value,
          bimanual_coordination_left: this.form.controls.bimanual_coordination_left.value,
          hand_eye_coordination_right: this.form.controls.hand_eye_coordination_right.value,
          hand_eye_coordination_left: this.form.controls.hand_eye_coordination_left.value,
          hand_foot_coordination_right: this.form.controls.hand_foot_coordination_right.value,
          hand_foot_coordination_left: this.form.controls.hand_foot_coordination_left.value,

          type_record_id: this.type_record_id,
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
        await this.ChEMSMovPatOTService.Save({
          scroll_right: this.form.controls.scroll_right.value,
          scroll_left: this.form.controls.scroll_left.value,
          get_up_right: this.form.controls.get_up_right.value,
          get_up_left: this.form.controls.get_up_left.value,
          push_right: this.form.controls.push_right.value,
          push_left: this.form.controls.push_left.value,
          pull_right: this.form.controls.pull_right.value,
          pull_left: this.form.controls.pull_left.value,
          transport_right: this.form.controls.transport_right.value,
          transport_left: this.form.controls.transport_left.value,
          attain_right: this.form.controls.attain_right.value,
          attain_left: this.form.controls.attain_left.value,
          bipedal_posture_right: this.form.controls.bipedal_posture_right.value,
          bipedal_posture_left: this.form.controls.bipedal_posture_left.value,
          sitting_posture_right: this.form.controls.sitting_posture_right.value,
          sitting_posture_left: this.form.controls.sitting_posture_left.value,
          squat_posture_right: this.form.controls.squat_posture_right.value,
          squat_posture_left: this.form.controls.squat_posture_left.value,
          use_both_hands_right: this.form.controls.use_both_hands_right.value,
          use_both_hands_left: this.form.controls.use_both_hands_left.value,
          alternating_movements_right: this.form.controls.alternating_movements_right.value,
          alternating_movements_left: this.form.controls.alternating_movements_left.value,
          dissociated_movements_right: this.form.controls.dissociated_movements_right.value,
          dissociated_movements_left: this.form.controls.dissociated_movements_left.value,
          Simultaneous_movements_right: this.form.controls.Simultaneous_movements_right.value,
          Simultaneous_movements_left: this.form.controls.Simultaneous_movements_left.value,
          bimanual_coordination_right: this.form.controls.bimanual_coordination_right.value,
          bimanual_coordination_left: this.form.controls.bimanual_coordination_left.value,
          hand_eye_coordination_right: this.form.controls.hand_eye_coordination_right.value,
          hand_eye_coordination_left: this.form.controls.hand_eye_coordination_left.value,
          hand_foot_coordination_right: this.form.controls.hand_foot_coordination_right.value,
          hand_foot_coordination_left: this.form.controls.hand_foot_coordination_left.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {


        });
      }

    }
  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

}


