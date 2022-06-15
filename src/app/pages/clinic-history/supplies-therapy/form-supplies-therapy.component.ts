import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChRtInspectionService } from '../../../business-controller/ch_rt_inspection.service';


@Component({
  selector: 'ngx-form-supplies-therapy',
  templateUrl: './form-supplies-therapy.component.html',
  styleUrls: ['./form-supplies-therapy.component.scss']
})
export class FormSuppliesTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public checked: boolean;
 


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private IspectionS: ChRtInspectionService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        expansion: '',
        masses: '',
        crepitations: '',
        fracturues: '',
        airway: '',

      };
    }
    this.form = this.formBuilder.group({
      expansion: [this.data[0] ? this.data[0].expansion : this.data.expansion,],
      masses: [this.data[0] ? this.data[0].masses : this.data.masses,],
      crepitations: [this.data[0] ? this.data[0].crepitations : this.data.crepitations,],
      fracturues: [this.data[0] ? this.data[0].fracturues : this.data.fracturues,],
      airway: [this.data[0] ? this.data[0].airway : this.data.airway,],
           
    });    

    }

    toggle(checked: boolean) {
      this.checked = checked;
    }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.IspectionS.Update({
          id: this.data.id,
          expansion: this.form.controls.expansion.value,
          masses: this.form.controls.masses.value,
          crepitations: this.form.controls.crepitations.value,
          fracturues: this.form.controls.fracturues.value,
          airway: this.form.controls.airway.value,
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
        await this.IspectionS.Save({
          expansion: this.form.controls.expansion.value,
          masses: this.form.controls.masses.value,
          crepitations: this.form.controls.crepitations.value,
          fracturues: this.form.controls.fracturues.value,
          airway: this.form.controls.airway.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
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
