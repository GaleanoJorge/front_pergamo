import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ChRespiratoryTherapyService } from '../../../../business-controller/ch_respiratory_therapy.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'ngx-form-reason-consultation-respiratory-therapy',
  templateUrl: './form-reason-consultation-respiratory-therapy.component.html',
  styleUrls: ['./form-reason-consultation-respiratory-therapy.component.scss']
})
export class FormReasonConsultationRespiratoryTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;  
  @Input() type_record: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = true;
  public disabled: boolean = false;
  public showTable;
  public ch_external_cause: any[];
  public diagnosis: any[] = [];
  public diagnosis_medical;
  public medical_diagnosis_id;
  public therapeutic_diagnosis;
  public reason_consultation;
  public loadAuxData = true;
  public changes = false;
  public changes1 = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,    
    private DiagnosisS: DiagnosisService,
    private respiratoryS: ChRespiratoryTherapyService,
  ) {
  }

  async ngOnInit() {
    if (!this.data || this.data.length == 0) {
      this.data = {
        medical_diagnosis_id: '',
        therapeutic_diagnosis: '',
        reason_consultation: '',
      };

    }
    this.loadForm(false).then();
    // await Promise.all([
    //   this.GetAux(),
    // ]);
    this.loadAuxData = false;
    this.loadForm();


  }

  public diagnosticConut = 0;

  searchDiagnostic($event) {
    this.diagnosticConut++;
    if (this.diagnosticConut == 3) {
      this.diagnosticConut = 0;
      if ($event.length >= 3) {
        this.DiagnosisS.GetCollection({
          search: $event,
        }).then(x => {
          this.diagnosis = x;
        });
      } else {
        this.DiagnosisS.GetCollection({
          search: '',
        }).then(x => {
          this.diagnosis = x;
        });
      }
    }
  }

  // async GetAux() {
  //   await this.diagnosisS.GetCollection().then(x => {
  //     this.diagnosis = x;
  //     this.loading = false;
  //   });

  //   return Promise.resolve(true);
  // }

  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;

    if (this.has_input) {
      this.respiratoryS.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          medical_diagnosis_id: [this.data[0] ? this.data[0].medical_diagnosis_id : this.data.medical_diagnosis_id,],
          therapeutic_diagnosis: [this.data[0] ? this.data[0].therapeutic_diagnosis : this.data.therapeutic_diagnosis,],
          reason_consultation: [this.data[0] ? this.data[0].reason_consultation : this.data.reason_consultation,],
        });
      });
    }


    this.form = this.formBuilder.group({
      medical_diagnosis_id: [this.data[0] ? this.returnCode(this.data[0].medical_diagnosis_id) : this.data.medical_diagnosis_id,],
      therapeutic_diagnosis: [this.data[0] ? this.data[0].therapeutic_diagnosis : this.data.therapeutic_diagnosis, Validators.compose([Validators.required])],
      reason_consultation: [this.data[0] ? this.data[0].reason_consultation : this.data.reason_consultation, Validators.compose([Validators.required])],
    });

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

  saveCode(e): void {
    var localidentify = this.diagnosis.find(item => item.name == e);

    if (localidentify) {
      if (e) {
        this.diagnosis_medical = localidentify.id;
      } else {
        this.diagnosis_medical = null;
        this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
        this.form.controls.diagnosis_id.setErrors({ 'incorrect': true });
      }

    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.respiratoryS.Update({
          id: this.data.id,
          medical_diagnosis_id: this.diagnosis_medical,
          therapeutic_diagnosis: this.form.controls.therapeutic_diagnosis.value,
          reason_consultation: this.form.controls.reason_consultation.value,
          type_record_id: this.type_record,
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
        await this.respiratoryS.Save({
          medical_diagnosis_id: this.diagnosis_medical,
          therapeutic_diagnosis: this.form.controls.therapeutic_diagnosis.value,
          reason_consultation: this.form.controls.reason_consultation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ medical_diagnosis_id: '', therapeutic_diagnosis: '', reason_consultation: '' });
          this.disabled = true;
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          if (this.form.controls.has_caregiver.value == true) {
            this.isSubmitted = true;
            this.loading = true;
          } else {
            this.isSubmitted = false;
            this.loading = false;
          }

        });
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

  receiveMessage($event) {

    if ($event.isactive == false) {
      this.changes = false;
      this.changes1 = false;
    }
    if ($event.entity) {
      this.form.get($event.entity).setValue(this.form.get($event.entity).value + ' ' + $event.text);
    }
  }

  changebuttom() {
    this.changes = true;
  }

  changebuttom1() {
    this.changes1 = true;
  }


}
