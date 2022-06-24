import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../business-controller/ch-external-cause.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';



@Component({
  selector: 'ngx-form-entry-ot',
  templateUrl: './form-entry-ot.component.html',
  styleUrls: ['./form-entry-ot.component.scss']
})
export class FormEntryOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_diagnosis: any[];


  constructor(
    private formBuilder: FormBuilder,
    private reasonConsultationS: ChReasonConsultationService,
    private DiagnosisS: DiagnosisService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        ch_diagnosis_id: '',
        recommendations: '',
      };
    }

    this.DiagnosisS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_diagnosis = x;
    });



    this.form = this.formBuilder.group({
      ch_diagnosis_id: [this.data[0] ? this.data[0].ch_diagnosis_id : this.data.ch_diagnosis_id,],
      recommendations: [this.data[0] ? this.data[0].recommendations : this.data.recommendations,],
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.reasonConsultationS.Update({
          id: this.data.id,
          recommendations: this.form.controls.recommendations.value,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
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
        await this.reasonConsultationS.Save({
          recommendations: this.form.controls.recommendations.value,
          ch_diagnosis_id: this.form.controls.ch_diagnosis_id.value,
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
