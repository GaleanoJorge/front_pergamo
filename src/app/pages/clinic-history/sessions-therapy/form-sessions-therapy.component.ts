import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChRtSessionsService } from '../../../business-controller/ch_rt_sessions.service';


@Component({
  selector: 'ngx-form-sessions-therapy',
  templateUrl: './form-sessions-therapy.component.html',
  styleUrls: ['./form-sessions-therapy.component.scss']
})
export class FormSessionsTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
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
    private RtSessionsS: ChRtSessionsService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        month: '',
        week: '',
        recommendations: ''

      };
    }
    this.form = this.formBuilder.group({
      month: [this.data[0] ? this.data[0].month : this.data.month,],
      week: [this.data[0] ? this.data[0].week : this.data.week,],
      recommendations: [this.data[0] ? this.data[0].recommendations : this.data.recommendations,]
           
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.RtSessionsS.Update({
          id: this.data.id,
          month: this.form.controls.month.value,
          week: this.form.controls.week.value,
          recommendations: this.form.controls.recommendations.value,
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
        await this.RtSessionsS.Save({
          month: this.form.controls.month.value,
          week: this.form.controls.week.value,
          recommendations: this.form.controls.recommendations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ month: '', week: '', recommendations: ''});
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
