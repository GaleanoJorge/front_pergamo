import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../../business-controller/ch-external-cause.service';



@Component({
  selector: 'ngx-form-entry-occupat-history-valoration-ot',
  templateUrl: './form-entry-occupat-history-valoration-ot.component.html',
  styleUrls: ['./form-entry-occupat-history-valoration-ot.component.scss']
})
export class FormEntryOccupatHistoryValorationOTComponent implements OnInit {

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
        ocupation: '',
        enterprice_employee: '',
        work_employee: '',
        shift_employee: '',
        observation_employee: '',
        work_independent: '',
        shift_independent: '',
        observation_independent: '',
        observation_home: '',
      };
    }

    this.chexternalcauseS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_external_cause = x;
    });



    this.form = this.formBuilder.group({
      ocupation: [this.data[0] ? this.data[0].ocupation : this.data.ocupation, Validators.compose([Validators.required])],
      enterprice_employee: [this.data[0] ? this.data[0].enterprice_employee : this.data.enterprice_employee, Validators.compose([Validators.required])],
      work_employee: [this.data[0] ? this.data[0].work_employee : this.data.work_employee, Validators.compose([Validators.required])],
      shift_employee: [this.data[0] ? this.data[0].shift_employee : this.data.shift_employee, Validators.compose([Validators.required])],
      observation_employee: [this.data[0] ? this.data[0].observation_employee : this.data.observation_employee,],
      work_independent: [this.data[0] ? this.data[0].work_independent : this.data.work_independent, Validators.compose([Validators.required])],
      shift_independent: [this.data[0] ? this.data[0].shift_independent : this.data.shift_independent, Validators.compose([Validators.required])],
      observation_independent: [this.data[0] ? this.data[0].observation_independent : this.data.observation_independent,],
      observation_home: [this.data[0] ? this.data[0].observation_home : this.data.observation_home, Validators.compose([Validators.required])],
    });

    // if (this.data.reason_consultation != '') {
    //   this.form.controls.reason_consultation.disable();
    //   this.form.controls.current_illness.disable();
    //   this.form.controls.ch_external_cause_id.disable();
    //   this.disabled = true;
    // } else {
    //   this.form.controls.reason_consultation.enable();
    //   this.form.controls.current_illness.enable();
    //   this.form.controls.ch_external_cause_id.enable();
    //   this.disabled = false;
    // }
  }

  async save() 
  {
    
  }

}
