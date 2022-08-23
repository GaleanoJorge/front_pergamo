import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';
import { PatientDataService } from '../../../../../business-controller/patient-data.service';
import { ChSwArmedConflictService } from '../../../../../business-controller/ch-sw-armed-conflict.service';
import { MunicipalityService } from '../../../../../business-controller/municipality.service';
import { PopulationGroupService } from '../../../../../business-controller/population-groups.service';
import { EthnicityService } from '../../../../../business-controller/ethnicity.service';


@Component({
  selector: 'ngx-form-sw-armed-conflict',
  templateUrl: './form-sw-armed-conflict.component.html',
  styleUrls: ['./form-sw-armed-conflict.component.scss']
})
export class FormSwArmedConflictComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public diagnosis: any[] = [];
  public disabled: boolean = false;
  public municipality: any[] = [];
  public population: any[] = [];
  public ethnicitys: any[] = [];
  checked = false;


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    // private statusBS: StatusBusinessService,
    private PatientDataS: PatientDataService,
    private toastService: NbToastrService,
    private municipalityS: MunicipalityService,
    private populationS: PopulationGroupService,
    private ethnicityS: EthnicityService,  
    private armedS: ChSwArmedConflictService,
  ) {
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        victim: '',
        victim_time: '',
        subsidies: '',
        detail_subsidies: '',
        municipality_id: '',
        population_group_id: '',
        ethnicity_id: ''

      };
    }

    this.municipalityS.GetCollection().then(x => {
      this.municipality = x;
    });

    this.populationS.GetCollection().then(x => {
      this.population = x;
    });

    this.ethnicityS.GetCollection().then(x => {
      this.ethnicitys = x;
    });



    this.form = this.formBuilder.group({

      victim: [this.data[0] ? this.data[0].victim : this.data.victim, Validators.compose([Validators.required])],
      victim_time: [this.data[0] ? this.data[0].victim_time : this.data.victim_time,],
      subsidies: [this.data[0] ? this.data[0].subsidies : this.data.subsidies, Validators.compose([Validators.required])],
      detail_subsidies: [this.data[0] ? this.data[0].detail_subsidies : this.data.detail_subsidies,],
      municipality_id: [this.data[0] ? this.data[0].municipality_id : this.data.municipality_id, ],
      population_group_id: [this.data[0] ? this.data[0].population_group_id : this.data.population_group_id,],
      ethnicity_id: [this.data[0] ? this.data[0].ethnicity_id : this.data.ethnicity_id,],
     
    });

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.armedS.Update({
          id: this.data.id,
          victim: this.form.controls.victim.value,
          victim_time: this.form.controls.victim_time.value,
          subsidies: this.form.controls.subsidies.value,
          detail_subsidies: this.form.controls.detail_subsidies.value,
          municipality_id: this.form.controls.municipality_id.value,
          population_group_id: this.form.controls.population_group_id.value,
          ethnicity_id: this.form.controls.ethnicity_id.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.armedS.Save({
          victim: this.form.controls.victim.value,
          victim_time: this.form.controls.victim_time.value,
          subsidies: this.form.controls.subsidies.value,
          detail_subsidies: this.form.controls.detail_subsidies.value,
          municipality_id: this.form.controls.municipality_id.value,
          population_group_id: this.form.controls.population_group_id.value,
          ethnicity_id: this.form.controls.ethnicity_id.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ victim:'', victim_time:'', subsidies:'',detail_subsidies:'',municipality_id:'',
          population_group_id:'',ethnicity_id:'' });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

}
