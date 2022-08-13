import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEBalanceFTService } from '../../../../../../business-controller/ch_e_balance_f_t.service';
import { ChEPositionFTService } from '../../../../../../business-controller/ch_e_position_f_t.service';

@Component({
  selector: 'ngx-form-position-ft',
  templateUrl: './form-position-ft.component.html',
  styleUrls: ['./form-position-ft.component.scss']
})
export class FormPositionFTComponent implements OnInit {

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
    private ChEPositionFTService: ChEPositionFTService,
  )
  {

  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {       

        front_view: '',
        right_view: '',
        left_view: '',
        rear_view: '',

      };
    }

    this.form = this.formBuilder.group({
      

      front_view: [this.data[0] ? this.data[0].front_view : this.data.front_view, Validators.compose([Validators.required])],
      right_view: [this.data[0] ? this.data[0].right_view : this.data.right_view, Validators.compose([Validators.required])],
      left_view: [this.data[0] ? this.data[0].left_view : this.data.left_view, Validators.compose([Validators.required])],
      rear_view: [this.data[0] ? this.data[0].rear_view : this.data.rear_view, Validators.compose([Validators.required])],

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
          this.ChEPositionFTService.Update({
          id: this.data.id,         
          front_view: this.form.controls.front_view.value,
          right_view: this.form.controls.right_view.value,
          left_view: this.form.controls.left_view.value,
          rear_view: this.form.controls.rear_view.value,

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
          this.ChEPositionFTService.Save({
            front_view: this.form.controls.front_view.value,
            right_view: this.form.controls.right_view.value,
            left_view: this.form.controls.left_view.value,
            rear_view: this.form.controls.rear_view.value,

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
