import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChPatientExitService } from '../../../../business-controller/ch-patient-exit.service';
import { ReasonExitService } from '../../../../business-controller/reason-exit.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ChDiagnosisService } from '../../../../business-controller/ch-diagnosis.service';
@Component({
  selector: 'ngx-form-patient-exit',
  templateUrl: './form-patient-exit.component.html',
  styleUrls: ['./form-patient-exit.component.scss'],
})
export class FormPatientExitComponent implements OnInit {
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
  public death_diagnosis_id: any[];
  public ch_diagnosis_id: any[];
  public exit_diagnosis_id: any[];
  public relations_diagnosis_id: any[];
  public reason_exit_id: any[];
  public previewFile = null;
  public show: boolean;
  public show_death: boolean = false;
  public show_inputs: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChPatientExitS: ChPatientExitService,
    private ReasonExitS: ReasonExitService,
    private DiagnosisS: DiagnosisService,
    private ChDiagnosisS: ChDiagnosisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        exit_status: '',
        legal_medicine_transfer: '',
        date_time: '',
        death_diagnosis_id: '',
        medical_signature: '',
        death_certificate_number: '',
        ch_diagnosis_id: '',
        exit_diagnosis_id: '',
        relations_diagnosis_id: '',
        reason_exit_id:'',

      };
    }

    this.ReasonExitS.GetCollection().then((x) => {
      this.reason_exit_id = x;
    });

    this.DiagnosisS.GetCollection().then((x) => {
      this.death_diagnosis_id = x;
    });
    this.ChDiagnosisS.GetCollection().then((x) => {
      this.ch_diagnosis_id = x;
    });
    this.DiagnosisS.GetCollection().then((x) => {
      this.exit_diagnosis_id = x;
    });
    this.DiagnosisS.GetCollection().then((x) => {
      this.relations_diagnosis_id = x;
    });

    this.form = this.formBuilder.group({
      exit_status: [this.data.exit_status,Validators.compose([Validators.required]),],
      legal_medicine_transfer: [this.data.legal_medicine_transfer],
      date_time: [this.data.date_time],
      death_diagnosis_id: [this.data.death_diagnosis_id],
      ch_diagnosis_id: [this.data.ch_diagnosis_id],
      medical_signature: [this.data.medical_signature],
      death_certificate_number: [this.data.death_certificate_number],
      exit_diagnosis_id: [this.data.exit_diagnosis_id],
      relations_diagnosis_id: [this.data.relations_diagnosis_id],
      reason_exit_id: [this.data.reason_exit_id],
     
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false; 

      if (this.data.id) {
        await this.ChPatientExitS.Update({
          id: this.data.id,
          exit_status: this.form.controls.exit_status.value,
          legal_medicine_transfer: this.form.controls.legal_medicine_transfer.value,
          date_time: this.form.controls.date_time.value,
          death_diagnosis_id: this.form.controls.death_diagnosis_id.value,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
          medical_signature: this.form.controls.medical_signature.value,
          death_certificate_number: this.form.controls.death_certificate_number.value,
          relations_diagnosis_id: this.form.controls.relations_diagnosis_id.value,
          reason_exit_id: this.form.controls.reason_exit_id.value,
          type_record_id: 10,
          ch_record_id: this.record_id,
        }).then((x) => {
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
        await this.ChPatientExitS.Save({
          id: this.data.id,
          exit_status: this.form.controls.exit_status.value,
          legal_medicine_transfer: this.form.controls.legal_medicine_transfer.value,
          date_time: this.form.controls.date_time.value,
          death_diagnosis_id: this.form.controls.death_diagnosis_id.value,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
          exit_diagnosis_id: this.form.controls.exit_diagnosis_id.value,
          medical_signature: this.form.controls.medical_signature.value,
          death_certificate_number: this.form.controls.death_certificate_number.value,
          relations_diagnosis_id: this.form.controls.relations_diagnosis_id.value,
          reason_exit_id: this.form.controls.reason_exit_id.value,
          type_record_id: 10,
          ch_record_id: this.record_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({exit_status: '', legal_medicine_transfer: '', date_time: '', death_diagnosis_id: '', });
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
 
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

//   eventSelections(input) {
//     if(input==true){
//       this.show=false;
     
//    }
// }

async ShowDeath(e) {
  if (e == 1) {
    this.show_death = true;
    this.show_inputs = true;
  } else {
    this.show_inputs = false;
    this.show_death = false;
  }
}
}