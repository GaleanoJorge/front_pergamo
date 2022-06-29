import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChExternalCauseService } from '../../../../../../business-controller/ch-external-cause.service';





@Component({
  selector: 'ngx-form-entry-motor-dis-auditory-ot',
  templateUrl: './form-entry-motor-dis-auditory-ot.component.html',
  styleUrls: ['./form-entry-motor-dis-auditory-ot.component.scss']
})
export class FormEntryMotorDisAuditorylOTComponent implements OnInit {

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
    private chexternalcauseS: ChExternalCauseService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        sound_sources: '',
        auditory_hyposensitivity: '',
        auditory_hypersensitivity: '',
        auditory_stimuli: '',
        auditive_discrimination: '',

      };
    }

    this.form = this.formBuilder.group({

      sound_sources: [this.data[0] ? this.data[0].sound_sources : this.data.sound_sources, Validators.compose([Validators.required])],
      auditory_hyposensitivity: [this.data[0] ? this.data[0].auditory_hyposensitivity : this.data.auditory_hyposensitivity, Validators.compose([Validators.required])],
      auditory_hypersensitivity: [this.data[0] ? this.data[0].auditory_hypersensitivity : this.data.auditory_hypersensitivity, Validators.compose([Validators.required])],
      auditory_stimuli: [this.data[0] ? this.data[0].auditory_stimuli : this.data.auditory_stimuli, Validators.compose([Validators.required])],
      auditive_discrimination: [this.data[0] ? this.data[0].auditive_discrimination : this.data.auditive_discrimination, Validators.compose([Validators.required])],

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


