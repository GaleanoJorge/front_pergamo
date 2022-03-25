import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChDiagnosisTypeService } from '../../../../business-controller/ch-diagnosis-type.service';
import { ChDiagnosisClassService } from '../../../../business-controller/ch-diagnosis-class.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ChDiagnosisService } from '../../../../business-controller/ch-diagnosis.service';


@Component({
  selector: 'ngx-form-diagnostic',
  templateUrl: './form-diagnostic.component.html',
  styleUrls: ['./form-diagnostic.component.scss'],
})
export class FormDiagnosticComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public selectedOptions2: any[] = [];
  public diagnosis_id;
  public selectedOptions: any[] = [];
  public diagnosis: any[];
  public diagnosis_type: any[];
  public diagnosis_class: any[];


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chDiagnosisS: ChDiagnosisService,
    private diagnosisS: DiagnosisService,
    private diagnosisTypeS: ChDiagnosisTypeService,
    private diagnosisClassS: ChDiagnosisClassService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
        ch_diagnosis_type_id: '',
        ch_diagnosis_class_id: '',
        diagnosis_id: '',
        diagnosis_observation: '',
      };
    };

    this.diagnosisS.GetCollection().then(x => {
      this.diagnosis = x;
    });
    this.diagnosisTypeS.GetCollection().then(x => {
      this.diagnosis_type = x;
    });
    this.diagnosisClassS.GetCollection().then(x => {
      this.diagnosis_class = x;
    });

    this.form = this.formBuilder.group({
      diagnosis_id: [this.data[0] ? this.data[0].diagnosis_id : this.data.diagnosis_id],
      ch_vital_temperature_id: [this.data[0] ? this.data[0].ch_vital_temperature_id : this.data.ch_vital_temperature_id],
      ch_diagnosis_class_id: [this.data[0] ? this.data[0].ch_diagnosis_class_id : this.data.ch_diagnosis_class_id],
      diagnosis_observation: [this.data[0] ? this.data[0].diagnosis_observation : this.data.diagnosis_observation],
    });

    if (this.data || this.data.length != 0) {
      this.form.controls.ch_diagnosiss_type_id.disable();
      this.form.controls.ch_diagnosis_class_id.disable();
      this.form.controls.diagnosis_id.disable();
      this.form.controls.diagnosis_observation.disable();
      this.disabled = true;
    } else {
      this.form.controls.ch_diagnosis_type_id.enable();
      this.form.controls.ch_diagnosis_class_id.enable();
      this.form.controls.diagnosis_id.enable();
      this.form.controls.diagnosis_observation.enable();
      this.disabled = false;
    }
  }


  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.chDiagnosisS.Update({
          diagnosis_id: this.diagnosis_id,
          id: this.data.id,
          ch_diagnosis_type_id: this.form.controls.ch_diagnosis_type_id.value,
          ch_diagnosis_class_id: this.form.controls.ch_diagnosis_class_id.value,
          diagnosis_observation: this.form.controls.diagnosis_observation.value,
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
        await this.chDiagnosisS.Save({
          diagnosis_id: this.diagnosis_id,
          ch_diagnosis_type_id: this.form.controls.ch_diagnosis_type_id.value,
          ch_diagnosis_class_id: this.form.controls.ch_diagnosis_class_id.value,
          diagnosis_observation: this.form.controls.diagnosis_observation.value,
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
  saveCode(e): void {
    var localidentify = this.diagnosis.find(item => item.name == e);
    if (localidentify) {
      this.diagnosis_id = localidentify.id;
    } else {
      this.diagnosis_id = null;
    }
  }
}
