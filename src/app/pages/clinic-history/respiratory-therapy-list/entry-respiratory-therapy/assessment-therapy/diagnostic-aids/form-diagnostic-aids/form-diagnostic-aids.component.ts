import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChDiagnosticAidsService } from '../../../../../../../business-controller/ch_diagnostic_aids.service';


@Component({
  selector: 'ngx-form-diagnostic-aids',
  templateUrl: './form-diagnostic-aids.component.html',
  styleUrls: ['./form-diagnostic-aids.component.scss']
})
export class FormaDiagnosticAidsComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() has_input: boolean = false;


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private DiagnosticS: ChDiagnosticAidsService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        paraclinical: '',
        observation: '',

      };
    }
    this.form = this.formBuilder.group({
      paraclinical: [this.data[0] ? this.data[0].paraclinical : this.data.paraclinical, Validators.compose([Validators.required])],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation,],

    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.DiagnosticS.Update({
          id: this.data.id,
          paraclinical: this.form.controls.paraclinical.value,
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
        await this.DiagnosticS.Save({
          paraclinical: this.form.controls.paraclinical.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ paraclinical: '', observation: '' });
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

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

}
