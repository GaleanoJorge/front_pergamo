import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEMSIntPatOTService } from '../../../../../../../business-controller/ch_e_m_s_int_pat_o_t.service';



@Component({
  selector: 'ngx-form-int-pat-m-ot',
  templateUrl: './form-int-pat-m-ot.component.html',
  styleUrls: ['./form-int-pat-m-ot.component.scss']
})
export class FormIntPatMOTComponent implements OnInit {

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
    private ChEMSIntPatOTService: ChEMSIntPatOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        up_right: '',
        up_left: '',
        side_right: '',
        side_left: '',
        backend_right: '',
        backend_left: '',
        frontend_right: '',
        frontend_left: '',
        down_right: '',
        down_left: '',
        full_hand_right: '',
        full_hand_left: '',
        cylindric_right: '',
        cylindric_left: '',
        hooking_right: '',
        hooking_left: '',
        fine_clamp_right: '',
        fine_clamp_left: '',
        tripod_right: '',
        tripod_left: '',
        opposition_right: '',
        opposition_left: '',
        coil_right: '',
        coil_left: '',

      };
    }

    this.form = this.formBuilder.group({


      up_right: [this.data[0] ? this.data[0].up_right : this.data.up_right, Validators.compose([Validators.required])],
      up_left: [this.data[0] ? this.data[0].up_left : this.data.up_left, Validators.compose([Validators.required])],
      side_right: [this.data[0] ? this.data[0].side_right : this.data.side_right, Validators.compose([Validators.required])],
      side_left: [this.data[0] ? this.data[0].side_left : this.data.side_left, Validators.compose([Validators.required])],
      backend_right: [this.data[0] ? this.data[0].backend_right : this.data.backend_right, Validators.compose([Validators.required])],
      backend_left: [this.data[0] ? this.data[0].backend_left : this.data.backend_left, Validators.compose([Validators.required])],
      frontend_right: [this.data[0] ? this.data[0].frontend_right : this.data.frontend_right, Validators.compose([Validators.required])],
      frontend_left: [this.data[0] ? this.data[0].frontend_left : this.data.frontend_left, Validators.compose([Validators.required])],
      down_right: [this.data[0] ? this.data[0].down_right : this.data.down_right, Validators.compose([Validators.required])],
      down_left: [this.data[0] ? this.data[0].down_left : this.data.down_left, Validators.compose([Validators.required])],
      full_hand_right: [this.data[0] ? this.data[0].full_hand_right : this.data.full_hand_right, Validators.compose([Validators.required])],
      full_hand_left: [this.data[0] ? this.data[0].full_hand_left : this.data.full_hand_left, Validators.compose([Validators.required])],
      cylindric_right: [this.data[0] ? this.data[0].cylindric_right : this.data.cylindric_right, Validators.compose([Validators.required])],
      cylindric_left: [this.data[0] ? this.data[0].cylindric_left : this.data.cylindric_left, Validators.compose([Validators.required])],
      hooking_right: [this.data[0] ? this.data[0].hooking_right : this.data.hooking_right, Validators.compose([Validators.required])],
      hooking_left: [this.data[0] ? this.data[0].hooking_left : this.data.hooking_left, Validators.compose([Validators.required])],
      fine_clamp_right: [this.data[0] ? this.data[0].fine_clamp_right : this.data.fine_clamp_right, Validators.compose([Validators.required])],
      fine_clamp_left: [this.data[0] ? this.data[0].fine_clamp_left : this.data.fine_clamp_left, Validators.compose([Validators.required])],
      tripod_right: [this.data[0] ? this.data[0].tripod_right : this.data.tripod_right, Validators.compose([Validators.required])],
      tripod_left: [this.data[0] ? this.data[0].tripod_left : this.data.tripod_left, Validators.compose([Validators.required])],
      opposition_right: [this.data[0] ? this.data[0].opposition_right : this.data.opposition_right, Validators.compose([Validators.required])],
      opposition_left: [this.data[0] ? this.data[0].opposition_left : this.data.opposition_left, Validators.compose([Validators.required])],
      coil_right: [this.data[0] ? this.data[0].coil_right : this.data.coil_right, Validators.compose([Validators.required])],
      coil_left: [this.data[0] ? this.data[0].coil_left : this.data.coil_left, Validators.compose([Validators.required])],

    });

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMSIntPatOTService.Update({
          id: this.data.id,
          up_right: this.form.controls.up_right.value,
          up_left: this.form.controls.up_left.value,
          side_right: this.form.controls.side_right.value,
          side_left: this.form.controls.side_left.value,
          backend_right: this.form.controls.backend_right.value,
          backend_left: this.form.controls.backend_left.value,
          frontend_right: this.form.controls.frontend_right.value,
          frontend_left: this.form.controls.frontend_left.value,
          down_right: this.form.controls.down_right.value,
          down_left: this.form.controls.down_left.value,
          full_hand_right: this.form.controls.full_hand_right.value,
          full_hand_left: this.form.controls.full_hand_left.value,
          cylindric_right: this.form.controls.cylindric_right.value,
          cylindric_left: this.form.controls.cylindric_left.value,
          hooking_right: this.form.controls.hooking_right.value,
          hooking_left: this.form.controls.hooking_left.value,
          fine_clamp_right: this.form.controls.fine_clamp_right.value,
          fine_clamp_left: this.form.controls.fine_clamp_left.value,
          tripod_right: this.form.controls.tripod_right.value,
          tripod_left: this.form.controls.tripod_left.value,
          opposition_right: this.form.controls.opposition_right.value,
          opposition_left: this.form.controls.opposition_left.value,
          coil_right: this.form.controls.coil_right.value,
          coil_left: this.form.controls.coil_left.value,

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
          this.ChEMSIntPatOTService.Save({
          up_right: this.form.controls.up_right.value,
          up_left: this.form.controls.up_left.value,
          side_right: this.form.controls.side_right.value,
          side_left: this.form.controls.side_left.value,
          backend_right: this.form.controls.backend_right.value,
          backend_left: this.form.controls.backend_left.value,
          frontend_right: this.form.controls.frontend_right.value,
          frontend_left: this.form.controls.frontend_left.value,
          down_right: this.form.controls.down_right.value,
          down_left: this.form.controls.down_left.value,
          full_hand_right: this.form.controls.full_hand_right.value,
          full_hand_left: this.form.controls.full_hand_left.value,
          cylindric_right: this.form.controls.cylindric_right.value,
          cylindric_left: this.form.controls.cylindric_left.value,
          hooking_right: this.form.controls.hooking_right.value,
          hooking_left: this.form.controls.hooking_left.value,
          fine_clamp_right: this.form.controls.fine_clamp_right.value,
          fine_clamp_left: this.form.controls.fine_clamp_left.value,
          tripod_right: this.form.controls.tripod_right.value,
          tripod_left: this.form.controls.tripod_left.value,
          opposition_right: this.form.controls.opposition_right.value,
          opposition_left: this.form.controls.opposition_left.value,
          coil_right: this.form.controls.coil_right.value,
          coil_left: this.form.controls.coil_left.value,

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


