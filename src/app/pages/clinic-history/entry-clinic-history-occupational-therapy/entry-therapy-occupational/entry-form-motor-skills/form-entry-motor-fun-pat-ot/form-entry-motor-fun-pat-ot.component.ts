import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEMSFunPatOTService } from '../../../../../../business-controller/ch_e_m_s_fun_pat_o_t.service';





@Component({
  selector: 'ngx-form-entry-motor-fun-pat-ot',
  templateUrl: './form-entry-motor-fun-pat-ot.component.html',
  styleUrls: ['./form-entry-motor-fun-pat-ot.component.scss']
})
export class FormEntryMotorFunPatOTComponent implements OnInit {

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
    private ChEMSFunPatOTService: ChEMSFunPatOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        head_right: '',
        head_left: '',
        mouth_right: '',
        mouth_left: '',
        shoulder_right: '',
        shoulder_left: '',
        back_right: '',
        back_left: '',
        waist_right: '',
        waist_left: '',
        knee_right: '',
        knee_left: '',
        foot_right: '',
        foot_left: '',

      };
    }

    this.form = this.formBuilder.group({
      head_right: [this.data[0] ? this.data[0].head_right : this.data.head_right, Validators.compose([Validators.required])],
      head_left: [this.data[0] ? this.data[0].head_left : this.data.head_left, Validators.compose([Validators.required])],
      mouth_right: [this.data[0] ? this.data[0].mouth_right : this.data.mouth_right, Validators.compose([Validators.required])],
      mouth_left: [this.data[0] ? this.data[0].mouth_left : this.data.mouth_left, Validators.compose([Validators.required])],
      shoulder_right: [this.data[0] ? this.data[0].shoulder_right : this.data.shoulder_right, Validators.compose([Validators.required])],
      shoulder_left: [this.data[0] ? this.data[0].shoulder_left : this.data.shoulder_left, Validators.compose([Validators.required])],
      back_right: [this.data[0] ? this.data[0].back_right : this.data.back_right, Validators.compose([Validators.required])],
      back_left: [this.data[0] ? this.data[0].back_left : this.data.back_left, Validators.compose([Validators.required])],
      waist_right: [this.data[0] ? this.data[0].waist_right : this.data.waist_right, Validators.compose([Validators.required])],
      waist_left: [this.data[0] ? this.data[0].waist_left : this.data.waist_left, Validators.compose([Validators.required])],
      knee_right: [this.data[0] ? this.data[0].knee_right : this.data.knee_right, Validators.compose([Validators.required])],
      knee_left: [this.data[0] ? this.data[0].knee_left : this.data.knee_left, Validators.compose([Validators.required])],
      foot_right: [this.data[0] ? this.data[0].foot_right : this.data.foot_right, Validators.compose([Validators.required])],
      foot_left: [this.data[0] ? this.data[0].foot_left : this.data.foot_left, Validators.compose([Validators.required])],
    });

    if (this.data.head_right != '') {
      this.form.controls.head_right.disable();
      this.form.controls.head_left.disable();
      this.form.controls.mouth_right.disable();
      this.form.controls.mouth_left.disable();
      this.form.controls.shoulder_right.disable();
      this.form.controls.shoulder_left.disable();
      this.form.controls.back_right.disable();
      this.form.controls.back_left.disable();
      this.form.controls.waist_right.disable();
      this.form.controls.waist_left.disable();
      this.form.controls.knee_right.disable();
      this.form.controls.knee_left.disable();
      this.form.controls.foot_right.disable();
      this.form.controls.foot_left.disable();
      this.disabled = true;
    } else {
      this.form.controls.head_right.enable();
      this.form.controls.head_left.enable();
      this.form.controls.mouth_right.enable();
      this.form.controls.mouth_left.enable();
      this.form.controls.shoulder_right.enable();
      this.form.controls.shoulder_left.enable();
      this.form.controls.back_right.enable();
      this.form.controls.back_left.enable();
      this.form.controls.waist_right.enable();
      this.form.controls.waist_left.enable();
      this.form.controls.knee_right.enable();
      this.form.controls.knee_left.enable();
      this.form.controls.foot_right.enable();
      this.form.controls.foot_left.enable();
      this.disabled = false;
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
        await this.ChEMSFunPatOTService.Update({
          id: this.data.id,
          head_right: this.form.controls.head_right.value,
          head_left: this.form.controls.head_left.value,
          mouth_right: this.form.controls.mouth_right.value,
          mouth_left: this.form.controls.mouth_left.value,
          shoulder_right: this.form.controls.shoulder_right.value,
          shoulder_left: this.form.controls.shoulder_left.value,
          back_right: this.form.controls.back_right.value,
          back_left: this.form.controls.back_left.value,
          waist_right: this.form.controls.waist_right.value,
          waist_left: this.form.controls.waist_left.value,
          knee_right: this.form.controls.knee_right.value,
          knee_left: this.form.controls.knee_left.value,
          foot_right: this.form.controls.foot_right.value,
          foot_left: this.form.controls.foot_left.value,
          
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
        await this.ChEMSFunPatOTService.Save({
          head_right: this.form.controls.head_right.value,
          head_left: this.form.controls.head_left.value,
          mouth_right: this.form.controls.mouth_right.value,
          mouth_left: this.form.controls.mouth_left.value,
          shoulder_right: this.form.controls.shoulder_right.value,
          shoulder_left: this.form.controls.shoulder_left.value,
          back_right: this.form.controls.back_right.value,
          back_left: this.form.controls.back_left.value,
          waist_right: this.form.controls.waist_right.value,
          waist_left: this.form.controls.waist_left.value,
          knee_right: this.form.controls.knee_right.value,
          knee_left: this.form.controls.knee_left.value,
          foot_right: this.form.controls.foot_right.value,
          foot_left: this.form.controls.foot_left.value,

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


