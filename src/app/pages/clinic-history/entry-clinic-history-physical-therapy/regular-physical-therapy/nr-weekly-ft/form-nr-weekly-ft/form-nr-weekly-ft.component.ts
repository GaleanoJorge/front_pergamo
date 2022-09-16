import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEWeeklyFTService } from '../../../../../../business-controller/ch_e_weekly_f_t.service';

@Component({
  selector: 'ngx-form-nr-weekly-ft',
  templateUrl: './form-nr-weekly-ft.component.html',
  styleUrls: ['./form-nr-weekly-ft.component.scss']
})
export class FormNRWeeklyFTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_external_cause: any[];



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEWeeklyFTService: ChEWeeklyFTService,
  )
  {

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
      recommendations: [this.data[0] ? this.data[0].recommendations : this.data.recommendations],

    });

    // if (this.data.illness != '') {
    //   this.form.controls.type.disable();
    //   this.form.controls.irradiated.disable();
    //   this.form.controls.located.disable();
    //   this.form.controls.intensity.disable();
    //   this.form.controls.exaccervating.disable();
    //   this.form.controls.decreated.disable();

    //   this.disabled = true;
    // } else {
    //   this.form.controls.type.enable();
    //   this.form.controls.irradiated.enable();
    //   this.form.controls.located.enable();
    //   this.form.controls.intensity.enable();
    //   this.form.controls.exaccervating.enable();
    //   this.form.controls.decreated.enable();


    //   this.disabled = false;
    // }
  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.messageEvent.emit(true)
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEWeeklyFTService.Update({
          id: this.data.id,         
          monthly_sessions: this.form.controls.monthly_sessions.value,
          weekly_intensity: this.form.controls.weekly_intensity.value,
          recommendations: this.form.controls.recommendations.value,

          type_record_id: 3,
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
          this.ChEWeeklyFTService.Save({
            monthly_sessions: this.form.controls.monthly_sessions.value,
            weekly_intensity: this.form.controls.weekly_intensity.value,
            recommendations: this.form.controls.recommendations.value,

          type_record_id: 3,
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
