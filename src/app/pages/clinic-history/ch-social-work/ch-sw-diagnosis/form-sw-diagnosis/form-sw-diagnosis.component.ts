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
import { ChSwDiagnosisService } from '../../../../../business-controller/ch-sw-diagnosis.service';


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
  @Input() type_record_id;
  @Input() has_input: boolean = false;


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
  public ch_diagnosis_id;


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    // private statusBS: StatusBusinessService,
    private toastService: NbToastrService,
    private ChDiagnosisS: ChDiagnosisService,
    private ChSwDiagnosisS: ChSwDiagnosisService,
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

    this.form = this.formBuilder.group({

      ch_diagnosis_id: [this.data[0] ? this.returnCode(this.data[0].ch_diagnosis_id) : this.data.ch_diagnosis_id],
      sw_diagnosis: [this.data[0] ? this.data[0].sw_diagnosis : this.data.sw_diagnosis,],


    });

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.ChSwDiagnosisS.Update({
          id: this.data.id,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
          sw_diagnosis: this.form.controls.sw_diagnosis.value,
          type_record_id: this.type_record_id,
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
        this.ChSwDiagnosisS.Save({
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
          sw_diagnosis: this.form.controls.sw_diagnosis.value,
          type_record_id: this.type_record_id,
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

    }
    //  else {
    //   this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    // }
  }


  returnCode(diagnosis_id) {
    var localName = this.diagnosis.find(item => item.id == diagnosis_id);
    var nombre_diagnosis
    if (localName) {
      nombre_diagnosis = localName.name;
    } else {
      nombre_diagnosis = ''
    }
    return nombre_diagnosis;
  }
  
  saveCode(e, valid): void {
    if ( this.diagnosis && this.ch_diagnosis) {
      var localidentify = this.diagnosis.find(item => item.name == e);
  
      if (localidentify) {
        if (valid == 1) {
          var localidentify = this.ch_diagnosis.find(item => item.diagnosis.name == e);
          this.ch_diagnosis_id = localidentify.id;
        }
      } else {
        if (valid == 1) {
          this.ch_diagnosis_id = null;
          // this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
          this.form.controls.ch_diagnosis_id.setErrors({ 'incorrect': true });
        }
      }
    } else {
      if (valid == 1) {
        this.ch_diagnosis_id = null;
        // this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
        this.form.controls.ch_diagnosis_id.setErrors({ 'incorrect': true });
      }
    }
  }

  }

