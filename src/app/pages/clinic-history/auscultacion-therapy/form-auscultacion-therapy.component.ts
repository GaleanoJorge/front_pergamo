import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChRtInspectionService } from '../../../business-controller/ch_rt_inspection.service';
import { ChAuscultationService } from '../../../business-controller/ch_auscultation.service';


@Component({
  selector: 'ngx-form-auscultacion-therapy',
  templateUrl: './form-auscultacion-therapy.component.html',
  styleUrls: ['./form-auscultacion-therapy.component.scss']
})
export class FormaAuscultacionTherapyComponent implements OnInit {

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
    private AuscultacionS: ChAuscultationService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        aus: [],
        observation: '',

      };
    }
    this.form = this.formBuilder.group({
      aus: [this.data[0] ? this.data[0].aus : this.data.aus,],
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
          aus: this.form.controls.aus.value,
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
        await this.AuscultacionS.Save({
          aus: this.form.controls.aus.value,
          observation: this.form.controls.observation.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ aus: [], observation: ''});
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

    }
  }

}
