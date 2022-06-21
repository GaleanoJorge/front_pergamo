import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../../business-controller/ch-external-cause.service';




@Component({
  selector: 'ngx-form-entry-past-ot',
  templateUrl: './form-entry-past-ot.component.html',
  styleUrls: ['./form-entry-past-ot.component.scss']
})
export class FormEntryPastOTComponent implements OnInit {

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
  public showTerapy = false;
  public showSmoke = false;
  public showAlcohol = false;
  public showSport = false;


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
        family_base: '',
        number_childrens: '',
        observation_family_struct: '',
        academy: '',
        level_academy: '',        
        observation_schooling_training: '',
        terapy: '',
        observation_terapy: '',
        smoke: '',
        f_smoke: '',
        alcohol: '',
        f_alcohol: '',
        sport: '',
        f_sport: '',
        sport_practice_observation: '',
        observation: '',
      };
    }





    this.form = this.formBuilder.group({
      family_base: [this.data[0] ? this.data[0].family_base : this.data.family_base, Validators.compose([Validators.required])],
      number_childrens: [this.data[0] ? this.data[0].number_childrens : this.data.number_childrens, Validators.compose([Validators.required])],
      observation_family_struct: [this.data[0] ? this.data[0].observation_family_struct : this.data.observation_family_struct, ],
      academy: [this.data[0] ? this.data[0].academy : this.data.academy, Validators.compose([Validators.required])],
      level_academy: [this.data[0] ? this.data[0].level_academy : this.data.level_academy, Validators.compose([Validators.required])],
      observation_schooling_training: [this.data[0] ? this.data[0].observation_schooling_training : this.data.observation_schooling_training,],
      terapy: [this.data[0] ? this.data[0].terapy : this.data.terapy, Validators.compose([Validators.required])],
      observation_terapy: [this.data[0] ? this.data[0].observation_terapy : this.data.observation_terapy, Validators.compose([Validators.required])],
      smoke: [this.data[0] ? this.data[0].smoke : this.data.smoke, Validators.compose([Validators.required])],
      f_smoke: [this.data[0] ? this.data[0].f_smoke : this.data.f_smoke, Validators.compose([Validators.required])],
      alcohol: [this.data[0] ? this.data[0].alcohol : this.data.alcohol, Validators.compose([Validators.required])],
      f_alcohol: [this.data[0] ? this.data[0].f_alcohol : this.data.f_alcohol, Validators.compose([Validators.required])],
      sport: [this.data[0] ? this.data[0].sport : this.data.sport, Validators.compose([Validators.required])],
      f_sport: [this.data[0] ? this.data[0].f_sport : this.data.f_sport, Validators.compose([Validators.required])],
      sport_practice_observation: [this.data[0] ? this.data[0].sport_practice_observation : this.data.sport_practice_observation, Validators.compose([Validators.required])],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation,],
    });

    this.form.get("terapy").valueChanges.subscribe(value => {
      if (value == "SI") {
        this.showTerapy = true;
      }
      else {
        this.showTerapy = false;
      }
    
    })


    this.form.get("smoke").valueChanges.subscribe(value => {
      if (value == "SI") {
        this.showSmoke = true;
      }
      else {
        this.showSmoke = false;
      }


    })

    this.form.get("alcohol").valueChanges.subscribe(value => {
      if (value == "SI") {
        this.showAlcohol = true;
      }
      else {
        this.showAlcohol = false;
      }

      
    })

    this.form.get("sport").valueChanges.subscribe(value => {
      if (value == "SI") {
        this.showSport = true;
      }
      else {
        this.showSport = false;
      }

      
    })

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


