import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRtSessionsService } from '../../../business-controller/ch_rt_sessions.service';
import { FrequencyService } from '../../../business-controller/frequency.service';


@Component({
  selector: 'ngx-form-sessions-therapy',
  templateUrl: './form-sessions-therapy.component.html',
  styleUrls: ['./form-sessions-therapy.component.scss']
})
export class FormSessionsTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public frequency:any[];



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private RtSessionsS: ChRtSessionsService,
    private frequencyS: FrequencyService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        month: '',
        week: '',
        recommendations: '',
        frequency_id: '',

      };

      this.frequencyS.GetCollection({ status_id: 1 }).then(x => {
        this.frequency = x;
      });
    }

    this.form = this.formBuilder.group({
      month: [this.data[0] ? this.data[0].month : this.data.month, Validators.compose([Validators.required])],
      week: [this.data[0] ? this.data[0].week : this.data.week, Validators.compose([Validators.required])],
      recommendations: [this.data[0] ? this.data[0].recommendations : this.data.recommendations,],
      frequency_id: [this.data[0] ? this.data[0].frequency_id : this.data.frequency_id, Validators.compose([Validators.required])]

    });

    if (this.data.month != '') {
      this.form.controls.month.disable();
      this.form.controls.week.disable();
      this.form.controls.recommendations.disable();
      this.disabled = true;
    } else {
      this.form.controls.month.enable();
      this.form.controls.week.enable();
      this.form.controls.recommendations.enable();
      this.disabled = false;
    }

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
          frequency_id: this.form.controls.frequency_id.value,
          type_record_id: this.type_record_id,
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
          frequency_id: this.form.controls.frequency_id.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ month: '', week: '', recommendations: '', frequency_id:'' });
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

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

}
