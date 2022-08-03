import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSDisAuditoryOTService } from '../../../../../../business-controller/ch_e_m_s_dis_auditory_o_t.service';





@Component({
  selector: 'ngx-form-entry-motor-dis-auditory-ot',
  templateUrl: './form-entry-motor-dis-auditory-ot.component.html',
  styleUrls: ['./form-entry-motor-dis-auditory-ot.component.scss']
})
export class FormEntryMotorDisAuditoryOTComponent implements OnInit {

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



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEMSDisAuditoryOTService: ChEMSDisAuditoryOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        sound_sources: '',
        auditory_hyposensitivity: '',
        auditory_hypersensitivity: '',
        auditory_stimuli: '',
        auditive_discrimination: '',

      };
    }

    this.form = this.formBuilder.group({

      sound_sources: [this.data[0] ? this.data[0].sound_sources : this.data.sound_sources, Validators.compose([Validators.required])],
      auditory_hyposensitivity: [this.data[0] ? this.data[0].auditory_hyposensitivity : this.data.auditory_hyposensitivity, Validators.compose([Validators.required])],
      auditory_hypersensitivity: [this.data[0] ? this.data[0].auditory_hypersensitivity : this.data.auditory_hypersensitivity, Validators.compose([Validators.required])],
      auditory_stimuli: [this.data[0] ? this.data[0].auditory_stimuli : this.data.auditory_stimuli, Validators.compose([Validators.required])],
      auditive_discrimination: [this.data[0] ? this.data[0].auditive_discrimination : this.data.auditive_discrimination, Validators.compose([Validators.required])],

    });

    if (this.data.sound_sources != '') {
      this.form.controls.sound_sources.disable();
      this.form.controls.auditory_hyposensitivity.disable();
      this.form.controls.auditory_hypersensitivity.disable();
      this.form.controls.auditory_stimuli.disable();
      this.form.controls.auditive_discrimination.disable();

      this.disabled = true;
    } else {
      this.form.controls.sound_sources.enable();
      this.form.controls.auditory_hyposensitivity.enable();
      this.form.controls.auditory_hypersensitivity.enable();
      this.form.controls.auditory_stimuli.enable();
      this.form.controls.auditive_discrimination.enable();

      this.disabled = false;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMSDisAuditoryOTService.Update({
          id: this.data.id,
          sound_sources: this.form.controls.sound_sources.value,
          auditory_hyposensitivity: this.form.controls.auditory_hyposensitivity.value,
          auditory_hypersensitivity: this.form.controls.auditory_hypersensitivity.value,
          auditory_stimuli: this.form.controls.auditory_stimuli.value,
          auditive_discrimination: this.form.controls.auditive_discrimination.value,

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
          this.ChEMSDisAuditoryOTService.Save({
          sound_sources: this.form.controls.sound_sources.value,
          auditory_hyposensitivity: this.form.controls.auditory_hyposensitivity.value,
          auditory_hypersensitivity: this.form.controls.auditory_hypersensitivity.value,
          auditory_stimuli: this.form.controls.auditory_stimuli.value,
          auditive_discrimination: this.form.controls.auditive_discrimination.value,


          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
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


