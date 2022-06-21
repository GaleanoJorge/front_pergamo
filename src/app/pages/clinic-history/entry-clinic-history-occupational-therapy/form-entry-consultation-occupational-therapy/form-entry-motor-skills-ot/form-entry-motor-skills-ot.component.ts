import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../../business-controller/ch-external-cause.service';




@Component({
  selector: 'ngx-form-entry-motor-skills-ot',
  templateUrl: './form-entry-motor-skills-ot.component.html',
  styleUrls: ['./form-entry-motor-skills-ot.component.scss']
})
export class FormEntryMotorSkillsOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;

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
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        head_right: '',
        head_left: '',
        mouth_right: '',
        mouth_left: '',
        shoulder_right: '',
        shoulder_left: '',
        back_right: '',
        back_left: '',
        waist_right: '',
        waist_left: '',
        knee_right: '',
        knee_left: '',
        foot_right: '',
        foot_left: '',

        up_right: '',
        up_left: '',
        side_right: '',
        side_left: '',
        backend_right: '',
        backend_left: '',
        frontend_right: '',
        frontend_left: '',
        down_right: '',
        down_left: '',
        full_hand_right: '',
        full_hand_left: '',
        cylindric_right: '',
        cylindric_left: '',
        hooking_right: '',
        hooking_left: '',
        fine_clamp_right: '',
        fine_clamp_left: '',
        tripod_right: '',
        tripod_left: '',
        opposition_right: '',
        opposition_left: '',
        coil_right: '',
        coil_left: '',

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

        heat: '',
        cold: '',

        sound_sources: '',
        auditory_hyposensitivity: '',
        auditory_hypersensitivity: '',
        auditory_stimuli: '',
        auditive_discrimination: '',

        right: '',
        leftt: '',

        follow_up: '',
        object_identify: '',
        figures: '',
        color_design: '',
        categorization: '',
        special_relation: '',

        dynamic_balance: '',
        static_balance: '',
        observation_component: '',

        appearance: '',
        consent: '',
        Attention: '',
        humor: '',
        language: '',
        sensory_perception: '',
        grade: '',
        contents: '',
        orientation: '',
        sleep: '',

        community: '',
        relatives: '',
        friends: '',
        health: '',
        shopping: '',
        foods: '',
        bathe: '',
        dress: '',
        animals: '',

        occupational_concept: '',
        therapeutic_objectives: '',
        monthly_sessions: '',
        weekly_intensity: '',
        recommendations: '',


      };
    }

    this.form = this.formBuilder.group({
      head_right: [this.data[0] ? this.data[0].head_right : this.data.head_right, Validators.compose([Validators.required])],
      head_left: [this.data[0] ? this.data[0].head_left : this.data.head_left, Validators.compose([Validators.required])],
      mouth_right: [this.data[0] ? this.data[0].mouth_right : this.data.mouth_right, Validators.compose([Validators.required])],
      mouth_left: [this.data[0] ? this.data[0].mouth_left : this.data.mouth_left, Validators.compose([Validators.required])],
      shoulder_right: [this.data[0] ? this.data[0].shoulder_right : this.data.shoulder_right, Validators.compose([Validators.required])],
      shoulder_left: [this.data[0] ? this.data[0].shoulder_left : this.data.shoulder_left, Validators.compose([Validators.required])],
      back_right: [this.data[0] ? this.data[0].back_right : this.data.back_right, Validators.compose([Validators.required])],
      back_left: [this.data[0] ? this.data[0].back_left : this.data.back_left, Validators.compose([Validators.required])],
      waist_right: [this.data[0] ? this.data[0].waist_right : this.data.waist_right, Validators.compose([Validators.required])],
      waist_left: [this.data[0] ? this.data[0].waist_left : this.data.waist_left, Validators.compose([Validators.required])],
      knee_right: [this.data[0] ? this.data[0].knee_right : this.data.knee_right, Validators.compose([Validators.required])],
      knee_left: [this.data[0] ? this.data[0].knee_left : this.data.knee_left, Validators.compose([Validators.required])],
      foot_right: [this.data[0] ? this.data[0].foot_right : this.data.foot_right, Validators.compose([Validators.required])],
      foot_left: [this.data[0] ? this.data[0].foot_left : this.data.foot_left, Validators.compose([Validators.required])],

      up_right: [this.data[0] ? this.data[0].up_right : this.data.up_right, Validators.compose([Validators.required])],
      up_left: [this.data[0] ? this.data[0].up_left : this.data.up_left, Validators.compose([Validators.required])],
      side_right: [this.data[0] ? this.data[0].side_right : this.data.side_right, Validators.compose([Validators.required])],
      side_left: [this.data[0] ? this.data[0].side_left : this.data.side_left, Validators.compose([Validators.required])],
      backend_right: [this.data[0] ? this.data[0].backend_right : this.data.backend_right, Validators.compose([Validators.required])],
      backend_left: [this.data[0] ? this.data[0].backend_left : this.data.backend_left, Validators.compose([Validators.required])],
      frontend_right: [this.data[0] ? this.data[0].frontend_right : this.data.frontend_right, Validators.compose([Validators.required])],
      frontend_left: [this.data[0] ? this.data[0].frontend_left : this.data.frontend_left, Validators.compose([Validators.required])],
      down_right: [this.data[0] ? this.data[0].down_right : this.data.down_right, Validators.compose([Validators.required])],
      down_left: [this.data[0] ? this.data[0].down_left : this.data.down_left, Validators.compose([Validators.required])],
      full_hand_right: [this.data[0] ? this.data[0].full_hand_right : this.data.full_hand_right, Validators.compose([Validators.required])],
      full_hand_left: [this.data[0] ? this.data[0].full_hand_left : this.data.full_hand_left, Validators.compose([Validators.required])],
      cylindric_right: [this.data[0] ? this.data[0].cylindric_right : this.data.cylindric_right, Validators.compose([Validators.required])],
      cylindric_left: [this.data[0] ? this.data[0].cylindric_left : this.data.cylindric_left, Validators.compose([Validators.required])],
      hooking_right: [this.data[0] ? this.data[0].hooking_right : this.data.hooking_right, Validators.compose([Validators.required])],
      hooking_left: [this.data[0] ? this.data[0].hooking_left : this.data.hooking_left, Validators.compose([Validators.required])],
      fine_clamp_right: [this.data[0] ? this.data[0].fine_clamp_right : this.data.fine_clamp_right, Validators.compose([Validators.required])],
      fine_clamp_left: [this.data[0] ? this.data[0].fine_clamp_left : this.data.fine_clamp_left, Validators.compose([Validators.required])],
      tripod_right: [this.data[0] ? this.data[0].tripod_right : this.data.tripod_right, Validators.compose([Validators.required])],
      tripod_left: [this.data[0] ? this.data[0].tripod_left : this.data.tripod_left, Validators.compose([Validators.required])],
      opposition_right: [this.data[0] ? this.data[0].opposition_right : this.data.opposition_right, Validators.compose([Validators.required])],
      opposition_left: [this.data[0] ? this.data[0].opposition_left : this.data.opposition_left, Validators.compose([Validators.required])],
      coil_right: [this.data[0] ? this.data[0].coil_right : this.data.coil_right, Validators.compose([Validators.required])],
      coil_left: [this.data[0] ? this.data[0].coil_left : this.data.coil_left, Validators.compose([Validators.required])],

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

      heat: [this.data[0] ? this.data[0].heat : this.data.heat, Validators.compose([Validators.required])],
      cold: [this.data[0] ? this.data[0].cold : this.data.cold, Validators.compose([Validators.required])],

      sound_sources: [this.data[0] ? this.data[0].sound_sources : this.data.sound_sources, Validators.compose([Validators.required])],
      auditory_hyposensitivity: [this.data[0] ? this.data[0].auditory_hyposensitivity : this.data.auditory_hyposensitivity, Validators.compose([Validators.required])],
      auditory_hypersensitivity: [this.data[0] ? this.data[0].auditory_hypersensitivity : this.data.auditory_hypersensitivity, Validators.compose([Validators.required])],
      auditory_stimuli: [this.data[0] ? this.data[0].auditory_stimuli : this.data.auditory_stimuli, Validators.compose([Validators.required])],
      auditive_discrimination: [this.data[0] ? this.data[0].auditive_discrimination : this.data.auditive_discrimination, Validators.compose([Validators.required])],

      right: [this.data[0] ? this.data[0].right : this.data.right, Validators.compose([Validators.required])],
      left: [this.data[0] ? this.data[0].left : this.data.left, Validators.compose([Validators.required])],

      follow_up: [this.data[0] ? this.data[0].follow_up : this.data.follow_up, Validators.compose([Validators.required])],
      object_identify: [this.data[0] ? this.data[0].object_identify : this.data.object_identify, Validators.compose([Validators.required])],
      figures: [this.data[0] ? this.data[0].figures : this.data.figures, Validators.compose([Validators.required])],
      color_design: [this.data[0] ? this.data[0].color_design : this.data.color_design, Validators.compose([Validators.required])],
      categorization: [this.data[0] ? this.data[0].categorization : this.data.categorization, Validators.compose([Validators.required])],
      special_relation: [this.data[0] ? this.data[0].special_relation : this.data.special_relation, Validators.compose([Validators.required])],

      dynamic_balance: [this.data[0] ? this.data[0].dynamic_balance : this.data.dynamic_balance, Validators.compose([Validators.required])],
      static_balance: [this.data[0] ? this.data[0].static_balance : this.data.static_balance, Validators.compose([Validators.required])],
      observation_component: [this.data[0] ? this.data[0].observation_component : this.data.observation_component, Validators.compose([Validators.required])],

      appearance: [this.data[0] ? this.data[0].appearance : this.data.appearance, Validators.compose([Validators.required])],
      consent: [this.data[0] ? this.data[0].consent : this.data.consent, Validators.compose([Validators.required])],
      Attention: [this.data[0] ? this.data[0].Attention : this.data.Attention, Validators.compose([Validators.required])],
      humor: [this.data[0] ? this.data[0].humor : this.data.humor, Validators.compose([Validators.required])],
      language: [this.data[0] ? this.data[0].language : this.data.language, Validators.compose([Validators.required])],
      sensory_perception: [this.data[0] ? this.data[0].sensory_perception : this.data.sensory_perception, Validators.compose([Validators.required])],
      grade: [this.data[0] ? this.data[0].grade : this.data.grade, Validators.compose([Validators.required])],
      contents: [this.data[0] ? this.data[0].contents : this.data.contents, Validators.compose([Validators.required])],
      orientation: [this.data[0] ? this.data[0].orientation : this.data.orientation, Validators.compose([Validators.required])],
      sleep: [this.data[0] ? this.data[0].sleep : this.data.sleep, Validators.compose([Validators.required])],

      community: [this.data[0] ? this.data[0].appearance : this.data.community, Validators.compose([Validators.required])],
      relatives: [this.data[0] ? this.data[0].relatives : this.data.relatives, Validators.compose([Validators.required])],
      friends: [this.data[0] ? this.data[0].friends : this.data.friends, Validators.compose([Validators.required])],
      health: [this.data[0] ? this.data[0].health : this.data.health, Validators.compose([Validators.required])],
      shopping: [this.data[0] ? this.data[0].shopping : this.data.shopping, Validators.compose([Validators.required])],
      foods: [this.data[0] ? this.data[0].foods : this.data.foods, Validators.compose([Validators.required])],
      bathe: [this.data[0] ? this.data[0].bathe : this.data.bathe, Validators.compose([Validators.required])],
      dress: [this.data[0] ? this.data[0].dress : this.data.dress, Validators.compose([Validators.required])],
      animals: [this.data[0] ? this.data[0].animals : this.data.animals, Validators.compose([Validators.required])],

      occupational_concept: [this.data[0] ? this.data[0].occupational_concept : this.data.occupational_concept, Validators.compose([Validators.required])],
      therapeutic_objectives: [this.data[0] ? this.data[0].therapeutic_objectives : this.data.therapeutic_objectives, Validators.compose([Validators.required])],
      monthly_sessions: [this.data[0] ? this.data[0].monthly_sessions : this.data.monthly_sessions, Validators.compose([Validators.required])],
      weekly_intensity: [this.data[0] ? this.data[0].weekly_intensity : this.data.weekly_intensity, Validators.compose([Validators.required])],
      recommendations: [this.data[0] ? this.data[0].recommendations : this.data.recommendations, Validators.compose([Validators.required])],





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


