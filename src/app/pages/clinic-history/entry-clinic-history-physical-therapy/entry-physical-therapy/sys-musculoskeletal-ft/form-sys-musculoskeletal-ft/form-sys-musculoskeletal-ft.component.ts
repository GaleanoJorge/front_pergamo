import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChESysMusculoskeletalFTService } from '../../../../../../business-controller/ch_e_sys_musculoskeletal_f_t.service';

@Component({
  selector: 'ngx-form-sys-musculoskeletal-ft',
  templateUrl: './form-sys-musculoskeletal-ft.component.html',
  styleUrls: ['./form-sys-musculoskeletal-ft.component.scss']
})
export class FormSysMusculoskeletalFTComponent implements OnInit {

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
    private ChESysMusculoskeletalFTService: ChESysMusculoskeletalFTService,
  )
  {

  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {       

        head: '',
        sup_left: '',
        hand_left: '',
        sup_right: '',
        hand: '',
        trunk: '',
        inf_left: '',
        left_foot: '',
        inf_right: '',
        right_foot: '',
        observation: '',

      };
    }

    this.form = this.formBuilder.group({
      

      head: [this.data[0] ? this.data[0].head : this.data.head, Validators.compose([Validators.required])],
      sup_left: [this.data[0] ? this.data[0].sup_left : this.data.sup_left, Validators.compose([Validators.required])],
      hand_left: [this.data[0] ? this.data[0].hand_left : this.data.hand_left, Validators.compose([Validators.required])],
      sup_right: [this.data[0] ? this.data[0].sup_right : this.data.sup_right, Validators.compose([Validators.required])],
      hand: [this.data[0] ? this.data[0].hand : this.data.hand, Validators.compose([Validators.required])],
      trunk: [this.data[0] ? this.data[0].trunk : this.data.trunk, Validators.compose([Validators.required])],
      inf_left: [this.data[0] ? this.data[0].inf_left : this.data.inf_left, Validators.compose([Validators.required])],
      left_foot: [this.data[0] ? this.data[0].left_foot : this.data.left_foot, Validators.compose([Validators.required])],
      inf_right: [this.data[0] ? this.data[0].inf_right : this.data.inf_right, Validators.compose([Validators.required])],
      right_foot: [this.data[0] ? this.data[0].right_foot : this.data.right_foot, Validators.compose([Validators.required])],
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
          this.ChESysMusculoskeletalFTService.Update({
          id: this.data.id,         
          head: this.form.controls.head.value,
          sup_left: this.form.controls.sup_left.value,
          hand_left: this.form.controls.hand_left.value,
          sup_right: this.form.controls.sup_right.value,
          hand: this.form.controls.hand.value,
          trunk: this.form.controls.trunk.value,
          inf_left: this.form.controls.inf_left.value,
          left_foot: this.form.controls.left_foot.value,
          inf_right: this.form.controls.inf_right.value,
          right_foot: this.form.controls.right_foot.value,
          observation: this.form.controls.observation.value,

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
          this.ChESysMusculoskeletalFTService.Save({
            head: this.form.controls.head.value,
            sup_left: this.form.controls.sup_left.value,
            hand_left: this.form.controls.hand_left.value,
            sup_right: this.form.controls.sup_right.value,
            hand: this.form.controls.hand.value,
            trunk: this.form.controls.trunk.value,
            inf_left: this.form.controls.inf_left.value,
            left_foot: this.form.controls.left_foot.value,
            inf_right: this.form.controls.inf_right.value,
            right_foot: this.form.controls.right_foot.value,
            observation: this.form.controls.observation.value,

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
