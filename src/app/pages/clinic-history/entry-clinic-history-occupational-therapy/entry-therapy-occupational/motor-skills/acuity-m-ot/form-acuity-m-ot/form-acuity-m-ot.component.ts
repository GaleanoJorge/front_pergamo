import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSAcuityOTService } from '../../../../../../../business-controller/ch_e_m_s_acuity_o_t.service';





@Component({
  selector: 'ngx-form-acuity-m-ot',
  templateUrl: './form-acuity-m-ot.component.html',
  styleUrls: ['./form-acuity-m-ot.component.scss']
})
export class FormAcuityMOTComponent implements OnInit {

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
  public ch_external_cause: any[];



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEMSAcuityOTService: ChEMSAcuityOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        follow_up: '',
        object_identify: '',
        figures: '',
        color_design: '',
        categorization: '',
        special_relation: '',

      };
    }

    this.form = this.formBuilder.group({

      follow_up: [this.data[0] ? this.data[0].follow_up : this.data.follow_up, Validators.compose([Validators.required])],
      object_identify: [this.data[0] ? this.data[0].object_identify : this.data.object_identify, Validators.compose([Validators.required])],
      figures: [this.data[0] ? this.data[0].figures : this.data.figures, Validators.compose([Validators.required])],
      color_design: [this.data[0] ? this.data[0].color_design : this.data.color_design, Validators.compose([Validators.required])],
      categorization: [this.data[0] ? this.data[0].categorization : this.data.categorization, Validators.compose([Validators.required])],
      special_relation: [this.data[0] ? this.data[0].special_relation : this.data.special_relation, Validators.compose([Validators.required])],

    });

    if (this.data.follow_up != '') {
      this.form.controls.follow_up.disable();
      this.form.controls.object_identify.disable();
      this.form.controls.figures.disable();
      this.form.controls.color_design.disable();
      this.form.controls.categorization.disable();
      this.form.controls.special_relation.disable();

      this.disabled = true;
    } else {
      this.form.controls.follow_up.enable();
      this.form.controls.object_identify.enable();
      this.form.controls.figures.enable();
      this.form.controls.color_design.enable();
      this.form.controls.categorization.enable();
      this.form.controls.special_relation.enable();

      this.disabled = false;
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
        await this.ChEMSAcuityOTService.Update({
          id: this.data.id,
          follow_up: this.form.controls.follow_up.value,
          object_identify: this.form.controls.object_identify.value,
          figures: this.form.controls.figures.value,
          color_design: this.form.controls.color_design.value,
          categorization: this.form.controls.categorization.value,
          special_relation: this.form.controls.special_relation.value,

          type_record_id: 1,
          ch_record_id: this.record_id,
          
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({follow_up:'',  object_identify:'', figures:'', color_design:'', categorization:'',
          special_relation:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChEMSAcuityOTService.Save({
          follow_up: this.form.controls.follow_up.value,
          object_identify: this.form.controls.object_identify.value,
          figures: this.form.controls.figures.value,
          color_design: this.form.controls.color_design.value,
          categorization: this.form.controls.categorization.value,
          special_relation: this.form.controls.special_relation.value,

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


