import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../business-controller/ch-external-cause.service';



@Component({
  selector: 'ngx-form-reason-consultation',
  templateUrl: './form-reason-consultation.component.html',
  styleUrls: ['./form-reason-consultation.component.scss']
})
export class FormReasonConsultationComponent implements OnInit {

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


  constructor(
    private formBuilder: FormBuilder,
    private reasonConsultationS: ChReasonConsultationService,
    private chexternalcauseS: ChExternalCauseService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        reason_consultation: '',
        current_illness: '',
        ch_external_cause_id: '',
      };
    }

    this.chexternalcauseS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_external_cause = x;
    });



    this.form = this.formBuilder.group({
      reason_consultation: [this.data[0] ? this.data[0].reason_consultation : this.data.reason_consultation,],
      current_illness: [this.data[0] ? this.data[0].current_illness : this.data.current_illness,],
      ch_external_cause_id: [this.data[0] ? this.data[0].ch_external_cause_id : this.data.ch_external_cause_id,],
    });

    if (this.data || this.data.length != 0) {
      this.form.controls.reason_consultation.disable();
      this.form.controls.current_illness.disable();
      this.form.controls.ch_external_cause_id.disable();
      this.disabled = true;
    }else{
          this.form.controls.reason_consultation.enable();
      this.form.controls.current_illness.enable();
      this.form.controls.ch_external_cause_id.enable();
      this.disabled = false;
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.reasonConsultationS.Update({
          id: this.data.id,
          reason_consultation: this.form.controls.reason_consultation.value,
          current_illness: this.form.controls.current_illness.value,
          ch_external_cause_id: this.form.controls.ch_external_cause_id.value,
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
          reason_consultation: this.form.controls.reason_consultation.value,
          current_illness: this.form.controls.current_illness.value,
          ch_external_cause_id: this.form.controls.ch_external_cause_id.value,
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
