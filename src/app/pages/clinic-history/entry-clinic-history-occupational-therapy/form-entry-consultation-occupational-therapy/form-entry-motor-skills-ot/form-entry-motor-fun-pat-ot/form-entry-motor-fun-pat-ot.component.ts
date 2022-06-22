import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../../../business-controller/ch-external-cause.service';
import { ActivatedRoute } from '@angular/router';
import { ChObjectivesTherapyService } from '../../../../../../business-controller/ch_objectives_therapy.service';




@Component({
  selector: 'ngx-form-entry-motor-fun-pat-ot',
  templateUrl: './form-entry-motor-fun-pat-ot.component.html',
  styleUrls: ['./form-entry-motor-fun-pat-ot.component.scss']
})
export class FormEntryFunPatOTComponent implements OnInit {

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


