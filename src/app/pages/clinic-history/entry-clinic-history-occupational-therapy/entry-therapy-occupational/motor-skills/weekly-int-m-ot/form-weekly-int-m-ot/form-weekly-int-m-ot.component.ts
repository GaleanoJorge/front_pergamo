import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSWeeklyOTService } from '../../../../../../../business-controller/ch_e_m_s_weekly_o_t.service';





@Component({
  selector: 'ngx-form-weekly-int-m-ot',
  templateUrl: './form-weekly-int-m-ot.component.html',
  styleUrls: ['./form-weekly-int-m-ot.component.scss']
})
export class FormWeeklyInMOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEMSWeeklyOTService: ChEMSWeeklyOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        monthly_sessions: '',
        weekly_intensity: '',
        recommendations: '',

      };
    }

    this.form = this.formBuilder.group({

      monthly_sessions: [this.data[0] ? this.data[0].monthly_sessions : this.data.monthly_sessions, Validators.compose([Validators.required])],
      weekly_intensity: [this.data[0] ? this.data[0].weekly_intensity : this.data.weekly_intensity, Validators.compose([Validators.required])],
      recommendations: [this.data[0] ? this.data[0].recommendations : this.data.recommendations, Validators.compose([Validators.required])],

    });

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMSWeeklyOTService.Update({
          id: this.data.id,
          monthly_sessions: this.form.controls.monthly_sessions.value,
          weekly_intensity: this.form.controls.weekly_intensity.value,
          recommendations: this.form.controls.recommendations.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
          
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({monthly_sessions:'',  weekly_intensity:'', recommendations:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEMSWeeklyOTService.Save({
          monthly_sessions: this.form.controls.monthly_sessions.value,
          weekly_intensity: this.form.controls.weekly_intensity.value,
          recommendations: this.form.controls.recommendations.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({monthly_sessions:'',  weekly_intensity:'', recommendations:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {


        });
      }

    }
  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

}


