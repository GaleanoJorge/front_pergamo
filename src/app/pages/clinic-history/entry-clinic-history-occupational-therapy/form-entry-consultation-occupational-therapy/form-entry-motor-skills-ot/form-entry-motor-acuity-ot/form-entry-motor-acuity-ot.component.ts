import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChExternalCauseService } from '../../../../../../business-controller/ch-external-cause.service';





@Component({
  selector: 'ngx-form-entry-motor-acuity-ot',
  templateUrl: './form-entry-motor-acuity-ot.component.html',
  styleUrls: ['./form-entry-motor-acuity-ot.component.scss']
})
export class FormEntryAcuityOTComponent implements OnInit {

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

        follow_up: '',
        object_identify: '',
        figures: '',
        color_design: '',
        categorization: '',
        special_relation: '',

      };
    }

    this.form = this.formBuilder.group({

      follow_up: [this.data[0] ? this.data[0].follow_up : this.data.follow_up, Validators.compose([Validators.required])],
      object_identify: [this.data[0] ? this.data[0].object_identify : this.data.object_identify, Validators.compose([Validators.required])],
      figures: [this.data[0] ? this.data[0].figures : this.data.figures, Validators.compose([Validators.required])],
      color_design: [this.data[0] ? this.data[0].color_design : this.data.color_design, Validators.compose([Validators.required])],
      categorization: [this.data[0] ? this.data[0].categorization : this.data.categorization, Validators.compose([Validators.required])],
      special_relation: [this.data[0] ? this.data[0].special_relation : this.data.special_relation, Validators.compose([Validators.required])],

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


