import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEBalanceFTService } from '../../../../../../business-controller/ch_e_balance_f_t.service';

@Component({
  selector: 'ngx-form-balance-ft',
  templateUrl: './form-balance-ft.component.html',
  styleUrls: ['./form-balance-ft.component.scss']
})
export class FormBalanceFTComponent implements OnInit {

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
    private ChEBalanceFTService: ChEBalanceFTService,
  )
  {

  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {       

        static: '',
        dinamic: '',
        observation: '',

      };
    }

    this.form = this.formBuilder.group({
      

      static: [this.data[0] ? this.data[0].static : this.data.static, Validators.compose([Validators.required])],
      dinamic: [this.data[0] ? this.data[0].dinamic : this.data.dinamic, Validators.compose([Validators.required])],
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
          this.ChEBalanceFTService.Update({
          id: this.data.id,         
          static: this.form.controls.static.value,
          dinamic: this.form.controls.dinamic.value,
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
          this.ChEBalanceFTService.Save({
            static: this.form.controls.static.value,
            dinamic: this.form.controls.dinamic.value,
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
