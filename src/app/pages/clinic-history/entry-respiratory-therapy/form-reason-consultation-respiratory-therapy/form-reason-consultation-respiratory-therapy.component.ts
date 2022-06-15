import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../business-controller/ch-external-cause.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ChRespiratoryTherapyService } from '../../../../business-controller/ch_respiratory_therapy.service';



@Component({
  selector: 'ngx-form-reason-consultation-respiratory-therapy',
  templateUrl: './form-reason-consultation-respiratory-therapy.component.html',
  styleUrls: ['./form-reason-consultation-respiratory-therapy.component.scss']
})
export class FormReasonConsultationRespiratoryTherapyComponent implements OnInit {

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
  public diagnosis: any[] = [];
  public diagnosis_therapeutyc;
  public diagnosis_medical;
  public therapeutic_diagnosis_id;
  public reason_consultation;


  constructor(
    private formBuilder: FormBuilder,
    private chexternalcauseS: ChExternalCauseService,
    private toastService: NbToastrService,
    private diagnosisS: DiagnosisService,
    private respiratoryS: ChRespiratoryTherapyService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        diagnosis_id: '',
        therapeutic_diagnosis_id: '',
        reason_consultation: '',
        
      };
    }

    this.chexternalcauseS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_external_cause = x;
    });

    this.diagnosisS.GetCollection().then(x => {
      this.diagnosis = x;
    });


    this.form = this.formBuilder.group({
      diagnosis_id: [this.data[0] ? this.data[0].diagnosis_id : this.data.diagnosis_id,],
      therapeutic_diagnosis_id: [this.data[0] ? this.data[0].therapeutic_diagnosis_id : this.data.therapeutic_diagnosis_id,],
      reason_consultation: [this.data[0] ? this.data[0].reason_consultation : this.data.reason_consultation,],
    });

  }

  saveCode(e, valid): void {
    var localidentify = this.diagnosis.find(item => item.name == e);

    if (localidentify) {
      if (valid==1){
        this.diagnosis_medical = localidentify.id;
      } else {
        this.diagnosis_therapeutyc = localidentify.id;
      }
    } else {
      if (valid==1){
        this.diagnosis_medical = null;
      } else {
        this.diagnosis_therapeutyc = null;
      }
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.diagnosis_id.setErrors({'incorrect': true});
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
          therapeutic_diagnosis_id: this.diagnosis_therapeutyc,
          reason_consultation: this.form.controls.reason_consultation.value,
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
        await this.respiratoryS.Save({
          medical_diagnosis_id: this.diagnosis_medical,
          therapeutic_diagnosis_id: this.diagnosis_therapeutyc,
          reason_consultation: this.form.controls.reason_consultation.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
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

    }
  }

}
