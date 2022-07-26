import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRtInspectionService } from '../../../../business-controller/ch_rt_inspection.service';


@Component({
  selector: 'ngx-form-ispection-therapy',
  templateUrl: './form-ispection-therapy.component.html',
  styleUrls: ['./form-ispection-therapy.component.scss']
})
export class FormIspectionTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
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
    private IspectionS: ChRtInspectionService,    

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        expansion: '',
        masses: '',
        detail_masses: '',
        crepitations: '',
        fracturues: '',
        detail_fracturues: '',
        airway: '',

      };
    }
    this.form = this.formBuilder.group({
      expansion: [this.data[0] ? this.data[0].expansion : this.data.expansion,Validators.compose([Validators.required])],
      masses: [this.data[0] ? this.data[0].masses : this.data.masses,Validators.compose([Validators.required])],
      detail_masses: [this.data[0] ? this.data[0].detail_masses : this.data.detail_masses,],
      crepitations: [this.data[0] ? this.data[0].crepitations : this.data.crepitations,Validators.compose([Validators.required])],
      fracturues: [this.data[0] ? this.data[0].fracturues : this.data.fracturues,Validators.compose([Validators.required])],
      detail_fracturues: [this.data[0] ? this.data[0].detail_fracturues : this.data.detail_fracturues,],
      airway: [this.data[0] ? this.data[0].airway : this.data.airway,Validators.compose([Validators.required])],
           
    });    

    if (this.data.expansion != '') {
      this.form.controls.expansion.disable();
      this.form.controls.masses.disable();
      this.form.controls.detail_masses.disable();
      this.form.controls.crepitations.disable();
      this.form.controls.fracturues.disable();
      this.form.controls.detail_fracturues.disable();
      this.form.controls.airway.disable();
      this.disabled = true;
    } else {
      this.form.controls.expansion.enable();
      this.form.controls.masses.enable();
      this.form.controls.detail_masses.enable();
      this.form.controls.crepitations.enable();
      this.form.controls.fracturues.enable();
      this.form.controls.detail_fracturues.enable();
      this.form.controls.airway.enable();
      this.disabled = false;
    }

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
          detail_masses: this.form.controls.detail_masses.value,
          crepitations: this.form.controls.crepitations.value,
          fracturues: this.form.controls.fracturues.value,
          detail_fracturues: this.form.controls.detail_fracturues.value,
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
          detail_masses: this.form.controls.detail_masses.value,
          crepitations: this.form.controls.crepitations.value,
          fracturues: this.form.controls.fracturues.value,
          detail_fracturues: this.form.controls.detail_fracturues.value,
          airway: this.form.controls.airway.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({  expansion: '', masses: '',  crepitations:'', fracturues:'', airway:''});
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

    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

}
