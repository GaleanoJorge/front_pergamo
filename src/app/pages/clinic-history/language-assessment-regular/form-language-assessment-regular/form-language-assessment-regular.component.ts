import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';

import { TlTherapyLanguageRegularService } from '../../../../business-controller/tl-therapy-language-regular.service';


@Component({
  selector: 'ngx-form-language-assessment-regular',
  templateUrl: './form-language-assessment-regular.component.html',
  styleUrls: ['./form-language-assessment-regular.component.scss'],
})
export class FormLanguageAssessmentRegularComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public diagnosis_id;
  public diagnosis: any[];
  public diagnosis_type: any[];
  public diagnosis_class: any[];


  constructor(
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private DiagnosisS: DiagnosisService,
    private TlTherapyLanguageRegularS: TlTherapyLanguageRegularService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
        
        diagnosis_id: '',
        status_patient: '',
      };
    };

    // this.diagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });
    

    this.form = this.formBuilder.group({
      diagnosis_id: [this.data.diagnosis_id, Validators.compose([Validators.required])],
      status_patient: [this.data.status_patient, ],
    });

    // this.diagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });
    
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

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.TlTherapyLanguageRegularS.Update({
          diagnosis_id: this.diagnosis_id,
          id: this.data.id,
          ch_diagnosis_type_id: this.form.controls.ch_diagnosis_type_id.value,
          status_patient: this.form.controls.status_patient.value,
          type_record_id: 3,
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
        await this.TlTherapyLanguageRegularS.Save({
          diagnosis_id: this.diagnosis_id,
          status_patient: this.form.controls.status_patient.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ diagnosis_id: '', status_patient: ''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
        });
      }
    }
  }

  saveCode(e): void {
    var localidentify = this.diagnosis.find(item => item.name == e);

    if (localidentify) {
      this.diagnosis_id = localidentify.id;
    } else {
      this.diagnosis_id = null;
    }
  }
}