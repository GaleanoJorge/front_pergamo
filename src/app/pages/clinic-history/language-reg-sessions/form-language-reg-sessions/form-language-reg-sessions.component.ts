import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { NumberMonthlySessionsTlService } from '../../../../business-controller/number-monthly-sessions-tl.service';

@Component({
  selector: 'ngx-form-language-reg-sessions',
  templateUrl: './form-language-reg-sessions.component.html',
  styleUrls: ['./form-language-reg-sessions.component.scss'],
})
export class FormLanguageRegSessionsComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() record_id: any = null;
  @Input() type_record: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
 
  public admissions_id;


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute,
    private NumberMonthlySessionsTlS:NumberMonthlySessionsTlService
   
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        monthly_sessions: '',
        weekly_intensity: '',
        recomendations: '',
        
      };
    }

    this.form = this.formBuilder.group({
      monthly_sessions: [this.data[0] ? this.data[0].monthly_sessions : this.data.monthly_sessions,],
      weekly_intensity: [this.data[0] ? this.data[0].weekly_intensity : this.data.weekly_intensity,],
      recomendations: [this.data[0] ? this.data[0].recomendations : this.data.recomendations,],
     
     
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.NumberMonthlySessionsTlS
          .Update({
            id: this.data.id,
            monthly_sessions: this.form.controls.monthly_sessions.value,
            weekly_intensity: this.form.controls.weekly_intensity.value,
            recomendations: this.form.controls.recomendations.value,
            type_record_id: this.type_record,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.form.setValue({ monthly_sessions: '', weekly_intensity: '', recomendations:''});
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.NumberMonthlySessionsTlS
          .Save({
            monthly_sessions: this.form.controls.monthly_sessions.value,
            weekly_intensity: this.form.controls.weekly_intensity.value,
            recomendations: this.form.controls.recomendations.value,
            type_record_id: this.type_record,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ monthly_sessions: '', weekly_intensity: '', recomendations: ''});
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
}
