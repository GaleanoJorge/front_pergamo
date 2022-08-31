import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSDisTactileOTService } from '../../../../../../../business-controller/ch_e_m_s_dis_tactile_o_t.service';





@Component({
  selector: 'ngx-form-dis-tactile-m-ot',
  templateUrl: './form-dis-tactile-m-ot.component.html',
  styleUrls: ['./form-dis-tactile-m-ot.component.scss']
})
export class FormDisTactilelMOTComponent implements OnInit {

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
    private ChEMSDisTactileOTService: ChEMSDisTactileOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {

        right: '',
        left: '',


      };
    }

    this.form = this.formBuilder.group({

      right: [this.data[0] ? this.data[0].right : this.data.right, Validators.compose([Validators.required])],
      left: [this.data[0] ? this.data[0].left : this.data.left, Validators.compose([Validators.required])],

    });

    if (this.data.right != '') {
      this.form.controls.right.disable();
      this.form.controls.left.disable();

      this.disabled = true;
    } else {
      this.form.controls.right.enable();
      this.form.controls.left.enable();

      this.disabled = false;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
       if (this.data.id) {
          this.ChEMSDisTactileOTService.Update({
          id: this.data.id,
          right: this.form.controls.right.value,
          left: this.form.controls.left.value,

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
          this.ChEMSDisTactileOTService.Save({
          right: this.form.controls.right.value,
          left: this.form.controls.left.value,

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


