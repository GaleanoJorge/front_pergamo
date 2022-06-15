import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { TlTherapyLanguageService } from '../../../../business-controller/tl-therapy-language.service';

@Component({
  selector: 'ngx-form-language-assessment',
  templateUrl: './form-language-assessment.component.html',
  styleUrls: ['./form-language-assessment.component.scss'],
})
export class FormLanguageAssessmentComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public record_id;
  public admissions_id;
  public medical_diagnostic_id: any[];
  public therapeutic_diagnosis_id: any[];
  public diagnosis_id;
  public diagnosis: any[];
  public diagnosis_medical;
  public therapeutyc_diagnosis;

  constructor(
    private formBuilder: FormBuilder,
    private DiagnosisS: DiagnosisService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private TlTherapyLanguageS: TlTherapyLanguageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        medical_diagnostic_id: '',
        therapeutic_diagnosis_id: '',
        reason_consultation: '',
      };
    }

    this.form = this.formBuilder.group({
      medical_diagnostic_id: [this.data.medical_diagnostic_id],
      therapeutic_diagnosis_id: [this.data.therapeutic_diagnosis_id],
      reason_consultation: [this.data.reason_consultation],
    });

    this.DiagnosisS.GetCollection().then((x) => {
      this.medical_diagnostic_id = x;
    });
    this.DiagnosisS.GetCollection().then((x) => {
      this.therapeutic_diagnosis_id = x;
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.TlTherapyLanguageS.Update({
          id: this.data.id,
          medical_diagnostic_id: this.form.controls.medical_diagnostic_id.value,
          therapeutic_diagnosis_id:
            this.form.controls.therapeutic_diagnosis_id.value,
          reason_consultation: this.form.controls.reason_consultation.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.TlTherapyLanguageS.Save({
          medical_diagnostic_id: this.form.controls.diagnosis_medical.value,
          therapeutic_diagnosis_id:
            this.form.controls.therapeutyc_diagnosis.value,
          reason_consultation: this.form.controls.reason_consultation.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({
              medical_diagnostic_id: '',
              therapeutic_diagnosis_id: '',
              reason_consultation: '',
            });
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }

  saveCode(e, valid): void {
    var localidentify = this.diagnosis.find((item) => item.name == e);

    if (localidentify) {
      if (valid == 1) {
        this.diagnosis_medical = localidentify.id;
      } else {
        this.therapeutyc_diagnosis = localidentify.id;
      }
    } else {
      if (valid == 1) {
        this.diagnosis_medical = null;
      } else {
        this.therapeutyc_diagnosis = null;
      }
      this.toastService.warning(
        '',
        'Debe seleccionar un diagnostico de la lista'
      );
      this.form.controls.diagnosis_id.setErrors({ incorrect: true });
    }
  }
}
