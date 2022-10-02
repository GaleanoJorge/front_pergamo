import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChPsObjectivesService } from '../../../../../business-controller/ch-ps-objectives.service';


@Component({
  selector: 'ngx-form-ps-objectives',
  templateUrl: './form-ps-objectives.component.html',
  styleUrls: ['./form-ps-objectives.component.scss']
})
export class FormPsObjectivesComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() type_record_id: Boolean = false;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;

  public attitude: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,      
    private objectivesS: ChPsObjectivesService, 

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
       patient: '',
       session: '',
       intervention: '',
       patient_state: '',
       recommendations: '',
       control: '',
       referrals: ''
    }

    this.form = this.formBuilder.group({

      patient: [this.data[0] ? this.data[0].patient : this.data.patient, Validators.compose([Validators.required])],
      session: [this.data[0] ? this.data[0].session : this.data.session, Validators.compose([Validators.required])],
      intervention: [this.data[0] ? this.data[0].intervention : this.data.intervention, Validators.compose([Validators.required])],
      patient_state: [this.data[0] ? this.data[0].patient_state : this.data.patient_state, Validators.compose([Validators.required])],
      recommendations: [this.data[0] ? this.data[0].recommendations : this.data.recommendations, Validators.compose([Validators.required])],
      control: [this.data[0] ? this.data[0].control : this.data.control, Validators.compose([Validators.required])],
      referrals: [this.data[0] ? this.data[0].referrals : this.data.referrals, Validators.compose([Validators.required])],
      

    });

    

  }

}

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.objectivesS.Update({
          id: this.data.id,
          patient: this.form.controls.patient.value,
          session: this.form.controls.session.value,
          intervention: this.form.controls.intervention.value,
          patient_state: this.form.controls.patient_state.value,
          recommendations: this.form.controls.recommendations.value,
          control: this.form.controls.control.value,
          referrals: this.form.controls.referrals.value,
          type_record_id:  this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          // this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.objectivesS.Save({
          patient: this.form.controls.patient.value,
          session: this.form.controls.session.value,
          intervention: this.form.controls.intervention.value,
          patient_state: this.form.controls.patient_state.value,
          recommendations: this.form.controls.recommendations.value,
          control: this.form.controls.control.value,
          referrals: this.form.controls.referrals.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
              patient:'',
              session:'',
              intervention:'',
              patient_state:'',
              recommendations:'',
              control:'',
              referrals:''
           });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


}
