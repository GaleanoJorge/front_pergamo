import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSAssessmentOTService } from '../../../../../../business-controller/ch_e_m_s_assessment_o_t.service';

@Component({
  selector: 'ngx-form-r-n-intervention-ot',
  templateUrl: './form-r-n-intervention-ot.component.html',
  styleUrls: ['./form-r-n-intervention-ot.component.scss']
})
export class FormRNinterventionTComponent implements OnInit {

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
    private ChEMSAssessmentOTService: ChEMSAssessmentOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {

        occupational_con:  '',
      };
    }

    this.form = this.formBuilder.group({

      occupational_con: [this.data.occupational_con, Validators.compose([Validators.required])],
    });

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      if (this.data.id) {
          this.ChEMSAssessmentOTService.Update({
          id: this.data.id,
          occupational_con: this.form.controls.occupational_con.value,

          type_record_id: 3,
          ch_record_id: this.record_id,

        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({occupational_con:''});
          if (this.saved) {
            this.saved();
            this.messageEvent.emit(true);
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEMSAssessmentOTService.Save({
          occupational_con: this.form.controls.occupational_con.value,

          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({occupational_con:''});
          if (this.saved) {
            this.messageEvent.emit(true);
            this.saved();
          }
        }).catch(x => {
        });
      }
    }else{
      this.toastService.danger('ingrese todos los campos solicitados');
    }
  }
  checked = false;
  toggle(checked: boolean) {
    this.checked = checked;
  }
}

