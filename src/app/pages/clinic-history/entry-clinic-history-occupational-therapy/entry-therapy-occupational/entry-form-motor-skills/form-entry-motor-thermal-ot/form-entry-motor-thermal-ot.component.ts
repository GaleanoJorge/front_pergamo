import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSThermalOTService } from '../../../../../../business-controller/ch_e_m_s_thermal_o_t.service';





@Component({
  selector: 'ngx-form-entry-motor-thermal-ot',
  templateUrl: './form-entry-motor-thermal-ot.component.html',
  styleUrls: ['./form-entry-motor-thermal-ot.component.scss']
})
export class FormEntryMotorThermalOTComponent implements OnInit {

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
    private ChEMSThermalOTService: ChEMSThermalOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        heat: '',
        cold: '',

      };
    }

    this.form = this.formBuilder.group({

      heat: [this.data[0] ? this.data[0].heat : this.data.heat, Validators.compose([Validators.required])],
      cold: [this.data[0] ? this.data[0].cold : this.data.cold, Validators.compose([Validators.required])],

    });

     if (this.data.heat != '') {
       this.form.controls.heat.disable();
       this.form.controls.cold.disable();

       this.disabled = true;
     } else {
       this.form.controls.heat.enable();
       this.form.controls.cold.enable();

       this.disabled = false;
     }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMSThermalOTService.Update({
          id: this.data.id,
          heat: this.form.controls.heat.value,
          cold: this.form.controls.cold.value,

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
          this.ChEMSThermalOTService.Save({
          heat: this.form.controls.heat.value,
          cold: this.form.controls.cold.value,


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


