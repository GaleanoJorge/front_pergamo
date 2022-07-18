import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEPastOTService } from '../../../../../business-controller/ch_e_past_o_t.service';




@Component({
  selector: 'ngx-entry-form-past-ot',
  templateUrl: './entry-form-past-ot.component.html',
  styleUrls: ['./entry-form-past-ot.component.scss']
})
export class EntryFormPastOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() type_record_id;
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public showTerapy = false;
  public showSmoke = false;
  public showAlcohol = false;
  public showSport = false;

  


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEPastOTServiceS: ChEPastOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        family_base: [],
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
      observation_terapy: [this.data[0] ? this.data[0].observation_terapy : this.data.observation_terapy],
      smoke: [this.data[0] ? this.data[0].smoke : this.data.smoke, Validators.compose([Validators.required])],
      f_smoke: [this.data[0] ? this.data[0].f_smoke : this.data.f_smoke],
      alcohol: [this.data[0] ? this.data[0].alcohol : this.data.alcohol, Validators.compose([Validators.required])],
      f_alcohol: [this.data[0] ? this.data[0].f_alcohol : this.data.f_alcohol],
      sport: [this.data[0] ? this.data[0].sport : this.data.sport, Validators.compose([Validators.required])],
      f_sport: [this.data[0] ? this.data[0].f_sport : this.data.f_sport],
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

    if (this.data.family_base != '') {
      this.form.controls.family_base.disable();
      this.form.controls.number_childrens.disable();
      this.form.controls.observation_family_struct.disable();
      this.form.controls.academy.disable();
      this.form.controls.level_academy.disable();
      this.form.controls.observation_schooling_training.disable();
      this.form.controls.terapy.disable();
      this.form.controls.observation_terapy.disable();
      this.form.controls.smoke.disable();
      this.form.controls.f_smoke.disable();
      this.form.controls.alcohol.disable();
      this.form.controls.f_alcohol.disable();
      this.form.controls.sport.disable();
      this.form.controls.f_sport.disable();
      this.form.controls.sport_practice_observation.disable();
      this.form.controls.observation.disable();
      this.disabled = true;
    } else {
      this.form.controls.family_base.enable();
      this.form.controls.number_childrens.enable();
      this.form.controls.observation_family_struct.enable();
      this.form.controls.academy.enable();
      this.form.controls.level_academy.enable();
      this.form.controls.observation_schooling_training.enable();
      this.form.controls.terapy.enable();
      this.form.controls.observation_terapy.enable();
      this.form.controls.smoke.enable();
      this.form.controls.f_smoke.enable();
      this.form.controls.alcohol.enable();
      this.form.controls.f_alcohol.enable();
      this.form.controls.sport.enable();
      this.form.controls.f_sport.enable();
      this.form.controls.sport_practice_observation.enable();
      this.form.controls.observation.enable();
      this.disabled = false;
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChEPastOTServiceS.Update({
          id: this.data.id,
          family_base: this.form.controls.family_base.value,
          number_childrens: this.form.controls.number_childrens.value,
          observation_family_struct: this.form.controls.observation_family_struct.value,
          academy: this.form.controls.academy.value,
          level_academy: this.form.controls.level_academy.value,
          observation_schooling_training: this.form.controls.observation_schooling_training.value,
          terapy: this.form.controls.terapy.value,
          observation_terapy: this.form.controls.observation_terapy.value,
          smoke: this.form.controls.smoke.value,
          f_smoke: this.form.controls.f_smoke.value,
          alcohol: this.form.controls.alcohol.value,
          f_alcohol: this.form.controls.f_alcohol.value,
          sport: this.form.controls.sport.value,
          f_sport: this.form.controls.f_sport.value,
          sport_practice_observation: this.form.controls.sport_practice_observation.value,
          observation: this.form.controls.observation.value,
          
          type_record_id: 1,
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
        await this.ChEPastOTServiceS.Save({
          family_base: this.form.controls.family_base.value,
          number_childrens: this.form.controls.number_childrens.value,
          observation_family_struct: this.form.controls.observation_family_struct.value,
          academy: this.form.controls.academy.value,
          level_academy: this.form.controls.level_academy.value,
          observation_schooling_training: this.form.controls.observation_schooling_training.value,
          terapy: this.form.controls.terapy.value,
          observation_terapy: this.form.controls.observation_terapy.value,
          smoke: this.form.controls.smoke.value,
          f_smoke: this.form.controls.f_smoke.value,
          alcohol: this.form.controls.alcohol.value,
          f_alcohol: this.form.controls.f_alcohol.value,
          sport: this.form.controls.sport.value,
          f_sport: this.form.controls.f_sport.value,
          sport_practice_observation: this.form.controls.sport_practice_observation.value,
          observation: this.form.controls.observation.value,

          type_record_id: 1,
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


