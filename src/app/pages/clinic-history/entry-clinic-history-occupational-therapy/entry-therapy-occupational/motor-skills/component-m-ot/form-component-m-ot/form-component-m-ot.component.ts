import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSComponentOTService } from '../../../../../../../business-controller/ch_e_m_s_component_o_t.service';





@Component({
  selector: 'ngx-form-component-m-ot',
  templateUrl: './form-component-m-ot.component.html',
  styleUrls: ['./form-component-m-ot.component.scss']
})
export class FormComponentMOTComponent implements OnInit {

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
    private ChEMSComponentOTService: ChEMSComponentOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        dynamic_balance: '',
        static_balance: '',
        observation_component: '',

      };
    }

    this.form = this.formBuilder.group({

      dynamic_balance: [this.data[0] ? this.data[0].dynamic_balance : this.data.dynamic_balance, Validators.compose([Validators.required])],
      static_balance: [this.data[0] ? this.data[0].static_balance : this.data.static_balance, Validators.compose([Validators.required])],
      observation_component: [this.data[0] ? this.data[0].observation_component : this.data.observation_component, Validators.compose([Validators.required])],

    });

    if (this.data.dynamic_balance != '') {
      this.form.controls.dynamic_balance.disable();
      this.form.controls.static_balance.disable();
      this.form.controls.observation_component.disable();

      this.disabled = true;
    } else {
      this.form.controls.dynamic_balance.enable();
      this.form.controls.static_balance.enable();
      this.form.controls.observation_component.enable();

      this.disabled = false;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMSComponentOTService.Update({
          id: this.data.id,
          dynamic_balance: this.form.controls.dynamic_balance.value,
          static_balance: this.form.controls.static_balance.value,
          observation_component: this.form.controls.observation_component.value,

          type_record_id: 1,
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
          this.ChEMSComponentOTService.Save({
          dynamic_balance: this.form.controls.dynamic_balance.value,
          static_balance: this.form.controls.static_balance.value,
          observation_component: this.form.controls.observation_component.value,

          type_record_id: 1,
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


