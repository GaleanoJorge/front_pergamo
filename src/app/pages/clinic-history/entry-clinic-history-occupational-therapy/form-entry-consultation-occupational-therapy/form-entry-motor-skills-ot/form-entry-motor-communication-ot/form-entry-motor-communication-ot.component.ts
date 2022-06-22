import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChExternalCauseService } from '../../../../../../business-controller/ch-external-cause.service';





@Component({
  selector: 'ngx-form-entry-motor-communication-ot',
  templateUrl: './form-entry-motor-communication-ot.component.html',
  styleUrls: ['./form-entry-motor-communication-ot.component.scss']
})
export class FormEntryCommunicationOTComponent implements OnInit {

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

        community: '',
        relatives: '',
        friends: '',
        health: '',
        shopping: '',
        foods: '',
        bathe: '',
        dress: '',
        animals: '',

      };
    }

    this.form = this.formBuilder.group({

      community: [this.data[0] ? this.data[0].appearance : this.data.community, Validators.compose([Validators.required])],
      relatives: [this.data[0] ? this.data[0].relatives : this.data.relatives, Validators.compose([Validators.required])],
      friends: [this.data[0] ? this.data[0].friends : this.data.friends, Validators.compose([Validators.required])],
      health: [this.data[0] ? this.data[0].health : this.data.health, Validators.compose([Validators.required])],
      shopping: [this.data[0] ? this.data[0].shopping : this.data.shopping, Validators.compose([Validators.required])],
      foods: [this.data[0] ? this.data[0].foods : this.data.foods, Validators.compose([Validators.required])],
      bathe: [this.data[0] ? this.data[0].bathe : this.data.bathe, Validators.compose([Validators.required])],
      dress: [this.data[0] ? this.data[0].dress : this.data.dress, Validators.compose([Validators.required])],
      animals: [this.data[0] ? this.data[0].animals : this.data.animals, Validators.compose([Validators.required])],

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


