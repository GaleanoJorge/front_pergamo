import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEPastOTService } from '../../../../../../business-controller/ch_e_past_o_t.service';

@Component({
  selector: 'ngx-form-past-ot',
  templateUrl: './form-past-ot.component.html',
  styleUrls: ['./form-past-ot.component.scss']
})
export class FormPastOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() type_record_id;
  @Input() record_id: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

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


    if (this.has_input) {
      this.ChEPastOTServiceS.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          family_base: [this.data[0] ? this.data[0].family_base : this.data.family_base,],
          number_childrens: [this.data[0] ? this.data[0].number_childrens : this.data.number_childrens,],
          observation_family_struct: [this.data[0] ? this.data[0].observation_family_struct : this.data.observation_family_struct,],
          academy: [this.data[0] ? this.data[0].academy : this.data.academy,],
          level_academy: [this.data[0] ? this.data[0].level_academy : this.data.level_academy,],
          observation_schooling_training: [this.data[0] ? this.data[0].observation_schooling_training : this.data.observation_schooling_training,],
          terapy: [this.data[0] ? this.data[0].terapy : this.data.terapy,],
          observation_terapy: [this.data[0] ? this.data[0].observation_terapy : this.data.observation_terapy,],
          smoke: [this.data[0] ? this.data[0].smoke : this.data.smoke,],
          f_smoke: [this.data[0] ? this.data[0].f_smoke : this.data.f_smoke,],
          alcohol: [this.data[0] ? this.data[0].alcohol : this.data.alcohol,],
          f_alcohol: [this.data[0] ? this.data[0].f_alcohol : this.data.f_alcohol,],
          sport: [this.data[0] ? this.data[0].sport : this.data.sport,],
          f_sport: [this.data[0] ? this.data[0].f_sport : this.data.f_sport,],
          sport_practice_observation: [this.data[0] ? this.data[0].sport_practice_observation : this.data.sport_practice_observation,],
          observation: [this.data[0] ? this.data[0].observation : this.data.observation,],
        });
      });
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
      sport_practice_observation: [this.data[0] ? this.data[0].sport_practice_observation : this.data.sport_practice_observation],
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

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
          this.ChEPastOTServiceS.Update({
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
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({family_base:'',  number_childrens:'', observation_family_struct:'', academy:'', level_academy:'',
          observation_schooling_training:'',  terapy:'',  observation_terapy:'',  smoke:'',  f_smoke:'', 
           alcohol:'', f_alcohol:'',  sport:'', f_sport:'',  sport_practice_observation:'', observation:'' });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEPastOTServiceS.Save({
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
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({family_base:'',  number_childrens:'', observation_family_struct:'', academy:'', level_academy:'',
          observation_schooling_training:'',  terapy:'',  observation_terapy:'',  smoke:'',  f_smoke:'', 
           alcohol:'', f_alcohol:'',  sport:'', f_sport:'',  sport_practice_observation:'', observation:'' });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
        });
      }

    }else{
      this.toastService.danger('ingrese todos los campos solicitados');
    }
  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

}
