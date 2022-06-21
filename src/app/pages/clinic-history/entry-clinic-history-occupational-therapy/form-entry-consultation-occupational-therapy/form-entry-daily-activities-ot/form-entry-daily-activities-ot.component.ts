import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../../business-controller/ch-external-cause.service';




@Component({
  selector: 'ngx-form-entry-daily-activities-ot',
  templateUrl: './form-entry-daily-activities-ot.component.html',
  styleUrls: ['./form-entry-daily-activities-ot.component.scss']
})
export class FormEntryDailyActivitiesOTComponent implements OnInit {

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
        activity: '',
        cook: '',
        kids: '',
        wash: '',
        game: '',
        ironing: '',
        walk: '',
        clean: '',
        sport: '',
        decorate: '',
        social: '',
        act_floristry: '',
        friends: '',
        read: '',
        politic: '',
        view_tv: '',
        religion: '',
        write: '',
        look: '',
        arrange: '',
        travel: '',
        observation_activity: '',
        test: '',
        observation_test: '',
      };
    }





    this.form = this.formBuilder.group({
      activity: [this.data[0] ? this.data[0].activity : this.data.activity, Validators.compose([Validators.required])],
      cook: [this.data[0] ? this.data[0].cook : this.data.cook, Validators.compose([Validators.required])],
      kids: [this.data[0] ? this.data[0].kids : this.data.kids, Validators.compose([Validators.required])],
      wash: [this.data[0] ? this.data[0].wash : this.data.wash, Validators.compose([Validators.required])],
      game: [this.data[0] ? this.data[0].game : this.data.game, Validators.compose([Validators.required])],
      ironing: [this.data[0] ? this.data[0].ironing : this.data.ironing, Validators.compose([Validators.required])],
      walk: [this.data[0] ? this.data[0].walk : this.data.walk, Validators.compose([Validators.required])],
      clean: [this.data[0] ? this.data[0].clean : this.data.clean, Validators.compose([Validators.required])],
      sport: [this.data[0] ? this.data[0].sport : this.data.sport, Validators.compose([Validators.required])],
      decorate: [this.data[0] ? this.data[0].decorate : this.data.decorate, Validators.compose([Validators.required])],
      social: [this.data[0] ? this.data[0].social : this.data.social, Validators.compose([Validators.required])],
      act_floristry: [this.data[0] ? this.data[0].act_floristry : this.data.act_floristry, Validators.compose([Validators.required])],
      friends: [this.data[0] ? this.data[0].friends : this.data.friends, Validators.compose([Validators.required])],
      read: [this.data[0] ? this.data[0].read : this.data.read, Validators.compose([Validators.required])],
      politic: [this.data[0] ? this.data[0].politic : this.data.politic, Validators.compose([Validators.required])],
      view_tv: [this.data[0] ? this.data[0].view_tv : this.data.view_tv, Validators.compose([Validators.required])],
      religion: [this.data[0] ? this.data[0].religion : this.data.religion, Validators.compose([Validators.required])],
      write: [this.data[0] ? this.data[0].write : this.data.write, Validators.compose([Validators.required])],
      look: [this.data[0] ? this.data[0].look : this.data.look, Validators.compose([Validators.required])],
      arrange: [this.data[0] ? this.data[0].arrange : this.data.arrange, Validators.compose([Validators.required])],
      travel: [this.data[0] ? this.data[0].travel : this.data.travel, Validators.compose([Validators.required])],
      observation_activity: [this.data[0] ? this.data[0].observation_activity : this.data.observation_activity,],
      test: [this.data[0] ? this.data[0].test : this.data.test, Validators.compose([Validators.required])],
      observation_test: [this.data[0] ? this.data[0].observation_test : this.data.observation_test,],
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


