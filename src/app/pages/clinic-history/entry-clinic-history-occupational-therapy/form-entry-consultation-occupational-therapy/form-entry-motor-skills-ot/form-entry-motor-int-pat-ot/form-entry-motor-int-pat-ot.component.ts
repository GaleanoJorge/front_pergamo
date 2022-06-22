import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../../../business-controller/ch-external-cause.service';
import { ActivatedRoute } from '@angular/router';
import { ChObjectivesTherapyService } from '../../../../../../business-controller/ch_objectives_therapy.service';




@Component({
  selector: 'ngx-form-entry-motor-int-pat-ot',
  templateUrl: './form-entry-motor-int-pat-ot.component.html',
  styleUrls: ['./form-entry-motor-int-pat-ot.component.scss']
})
export class FormEntryIntPatOTComponent implements OnInit {

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

      };
    }

    this.form = this.formBuilder.group({


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


