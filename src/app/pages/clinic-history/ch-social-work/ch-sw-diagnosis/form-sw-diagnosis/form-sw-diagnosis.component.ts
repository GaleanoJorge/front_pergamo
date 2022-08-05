import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';
import { PatientDataService } from '../../../../../business-controller/patient-data.service';
import { MunicipalityService } from '../../../../../business-controller/municipality.service';
import { PopulationGroupService } from '../../../../../business-controller/population-groups.service';
import { EthnicityService } from '../../../../../business-controller/ethnicity.service';
import { ChSwArmedConflictService } from '../../../../../business-controller/ch-sw-armed-conflict.service';
import { ChDiagnosisService } from '../../../../../business-controller/ch-diagnosis.service';


@Component({
  selector: 'ngx-form-sw-diagnosis',
  templateUrl: './form-sw-diagnosis.component.html',
  styleUrls: ['./form-sw-diagnosis.component.scss']
})
export class FormSwDiagnosisComponent implements OnInit {

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
  public ch_diagnosis: any[];
  public diagnosis: any[] = [];
  public disabled: boolean = false;
  public municipality: any[] = [];
  public population: any[] = [];
  public ethnicity: any[] = [];
  checked = false;


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    // private statusBS: StatusBusinessService,
    private PatientDataS: PatientDataService,
    private toastService: NbToastrService,
    private ChDiagnosisS: ChDiagnosisService,
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
        ch_diagnosis_id: '',

      };
    }
    this.ChDiagnosisS.GetCollection().then(x => {
      this.ch_diagnosis = x;
    });

    this.municipalityS.GetCollection().then(x => {
      this.municipality = x;
    });

    this.populationS.GetCollection().then(x => {
      this.population = x;
    });

    this.ethnicityS.GetCollection().then(x => {
      this.ethnicity = x;
    });



    this.form = this.formBuilder.group({

      ch_diagnosis_id: [this.data[0] ? this.data[0].ch_diagnosis_id : this.data.ch_diagnosis_id,],


    });

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.armedS.Update({
          id: this.data.id,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
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
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
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
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

  }

