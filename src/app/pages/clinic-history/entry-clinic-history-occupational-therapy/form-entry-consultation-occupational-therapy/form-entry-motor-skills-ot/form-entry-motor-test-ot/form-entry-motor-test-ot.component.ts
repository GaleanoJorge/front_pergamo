import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChExternalCauseService } from '../../../../../../business-controller/ch-external-cause.service';





@Component({
  selector: 'ngx-form-entry-motor-test-ot',
  templateUrl: './form-entry-motor-test-ot.component.html',
  styleUrls: ['./form-entry-motor-test-ot.component.scss']
})
export class FormEntryMotorTestlOTComponent implements OnInit {

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

      };
    }

    this.form = this.formBuilder.group({

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


