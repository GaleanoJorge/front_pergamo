import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEMSFunPatOTService } from '../../../../../../../business-controller/ch_e_m_s_fun_pat_o_t.service';





@Component({
  selector: 'ngx-form-fun-pat-m-ot',
  templateUrl: './form-fun-pat-m-ot.component.html',
  styleUrls: ['./form-fun-pat-m-ot.component.scss']
})
export class FormFunPatMOTComponent implements OnInit {

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
      head_right: [this.data[0] ? this.data[0].head_right : this.data.head_right,],
      head_left: [this.data[0] ? this.data[0].head_left : this.data.head_left,],
      mouth_right: [this.data[0] ? this.data[0].mouth_right : this.data.mouth_right,],
      mouth_left: [this.data[0] ? this.data[0].mouth_left : this.data.mouth_left,],
      shoulder_right: [this.data[0] ? this.data[0].shoulder_right : this.data.shoulder_right,],
      shoulder_left: [this.data[0] ? this.data[0].shoulder_left : this.data.shoulder_left,],
      back_right: [this.data[0] ? this.data[0].back_right : this.data.back_right,],
      back_left: [this.data[0] ? this.data[0].back_left : this.data.back_left,],
      waist_right: [this.data[0] ? this.data[0].waist_right : this.data.waist_right,],
      waist_left: [this.data[0] ? this.data[0].waist_left : this.data.waist_left,],
      knee_right: [this.data[0] ? this.data[0].knee_right : this.data.knee_right,],
      knee_left: [this.data[0] ? this.data[0].knee_left : this.data.knee_left,],
      foot_right: [this.data[0] ? this.data[0].foot_right : this.data.foot_right,],
      foot_left: [this.data[0] ? this.data[0].foot_left : this.data.foot_left,],
    });

  }

  save() {
    this.isSubmitted = true;
    var count = 0;
    var e = Object.entries(this.form.value).map(entry => {
      let obj_aux = {
        key: entry[0],
        value: String(entry[1])
      }
      if(obj_aux.value == ""){
        count++
      } 

      return obj_aux;
    });

    if(e.length == count) this.form.setErrors({ 'incorrect': true });

    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMSFunPatOTService.Update({
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
          
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({head_right:'',  head_left:'', mouth_right:'', mouth_left:'', shoulder_right:'',
          shoulder_left:'',  back_right:'',  back_left:'',  waist_right:'',  waist_left:'', 
          knee_right:'',  knee_left:'',  foot_right:'',  foot_left:'',});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEMSFunPatOTService.Save({
          head_right: this.form.controls.head_right.value ? this.form.controls.head_right.value : "FUNCIONAL",
          head_left: this.form.controls.head_left.value ? this.form.controls.head_left.value : "FUNCIONAL",
          mouth_right: this.form.controls.mouth_right.value ? this.form.controls.mouth_right.value : "FUNCIONAL",
          mouth_left: this.form.controls.mouth_left.value ? this.form.controls.mouth_left.value : "FUNCIONAL",
          shoulder_right: this.form.controls.shoulder_right.value ? this.form.controls.shoulder_right.value : "FUNCIONAL",
          shoulder_left: this.form.controls.shoulder_left.value ? this.form.controls.shoulder_left.value : "FUNCIONAL",
          back_right: this.form.controls.back_right.value ? this.form.controls.back_right.value : "FUNCIONAL",
          back_left: this.form.controls.back_left.value ? this.form.controls.back_left.value : "FUNCIONAL",
          waist_right: this.form.controls.waist_right.value ? this.form.controls.waist_right.value : "FUNCIONAL",
          waist_left: this.form.controls.waist_left.value ? this.form.controls.waist_left.value : "FUNCIONAL",
          knee_right: this.form.controls.knee_right.value ? this.form.controls.knee_right.value : "FUNCIONAL",
          knee_left: this.form.controls.knee_left.value ? this.form.controls.knee_left.value : "FUNCIONAL",
          foot_right: this.form.controls.foot_right.value ? this.form.controls.foot_right.value : "FUNCIONAL",
          foot_left: this.form.controls.foot_left.value ? this.form.controls.foot_left.value : "FUNCIONAL",

          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({head_right:'',  head_left:'', mouth_right:'', mouth_left:'', shoulder_right:'',
          shoulder_left:'',  back_right:'',  back_left:'',  waist_right:'',  waist_left:'', 
          knee_right:'',  knee_left:'',  foot_right:'',  foot_left:'',});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {


        });
      }

    }else {
      this.toastService.warning('','Debe seleccionar al menos una opción');
    }
  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

}


