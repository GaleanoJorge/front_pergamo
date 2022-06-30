import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChDiagnosticAidsService } from '../../../business-controller/ch_diagnostic_aids.service';


@Component({
  selector: 'ngx-form-diagnostic-therapy',
  templateUrl: './form-diagnostic-therapy.component.html',
  styleUrls: ['./form-diagnostic-therapy.component.scss']
})
export class FormaDiagnosticTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
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
    private DiagnosticS: ChDiagnosticAidsService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        aids: [],
        observation: '',

      };
    }
    this.form = this.formBuilder.group({
      aids: [this.data[0] ? this.data[0].aids : this.data.aids,Validators.compose([Validators.required])],
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
          aids: this.form.controls.aids.value,
          observation: this.form.controls.observation.value,
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
        await this.DiagnosticS.Save({
          aids: this.form.controls.aids.value,
          observation: this.form.controls.observation.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ aids: [], observation: ''});
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

    }else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

}
