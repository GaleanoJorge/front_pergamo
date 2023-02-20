import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChAuscultationService } from '../../../../../../../business-controller/ch_auscultation.service';


@Component({
  selector: 'ngx-form-auscultacion',
  templateUrl: './form-auscultacion.component.html',
  styleUrls: ['./form-auscultacion.component.scss']
})
export class FormAuscultacionComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;
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
    private AuscultacionS: ChAuscultationService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        auscultation: '',
        observation: '',
      };
    }
    this.form = this.formBuilder.group({
      auscultation: [this.data[0] ? this.data[0].auscultation : this.data.auscultation, Validators.compose([Validators.required])],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation,],
     
           
    });   

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.AuscultacionS.Update({
          id: this.data.id,
          auscultation: this.form.controls.auscultation.value,
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
        await this.AuscultacionS.Save({
          auscultation: this.form.controls.auscultation.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ auscultation: '', observation: ''});
          if (this.saved) {
            this.saved();
          }
          
        });
      }

    }else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

}
