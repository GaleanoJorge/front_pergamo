import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChESysMusculoskeletalFTService } from '../../../../../../business-controller/ch_e_sys_musculoskeletal_f_t.service';
import { ChEMuscularStrengthFTService } from '../../../../../../business-controller/ch_e_muscular-strength_f_t.service';
import { ChESensibilityFTService } from '../../../../../../business-controller/ch_e_sensibility_f_t.service';

@Component({
  selector: 'ngx-form-sensibility-ft',
  templateUrl: './form-sensibility-ft.component.html',
  styleUrls: ['./form-sensibility-ft.component.scss']
})
export class FormSensibilityFTComponent implements OnInit {

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
    private ChESensibilityFTService: ChESensibilityFTService,
  )
  {

  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {       

        deep: '',
        superficial: '',
        cortical: '',
        observation: '',

      };
    }

    this.form = this.formBuilder.group({
      

      deep: [this.data[0] ? this.data[0].deep : this.data.deep, Validators.compose([Validators.required])],
      superficial: [this.data[0] ? this.data[0].superficial : this.data.superficial, Validators.compose([Validators.required])],
      cortical: [this.data[0] ? this.data[0].cortical : this.data.cortical, Validators.compose([Validators.required])],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation, Validators.compose([Validators.required])],

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
          this.ChESensibilityFTService.Update({
          id: this.data.id,         
          deep: this.form.controls.deep.value,
          superficial: this.form.controls.superficial.value,
          cortical: this.form.controls.cortical.value,
          observation: this.form.controls.observation.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
          
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChESensibilityFTService.Save({
            deep: this.form.controls.deep.value,
            superficial: this.form.controls.superficial.value,
            cortical: this.form.controls.cortical.value,
            observation: this.form.controls.observation.value,

          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
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
