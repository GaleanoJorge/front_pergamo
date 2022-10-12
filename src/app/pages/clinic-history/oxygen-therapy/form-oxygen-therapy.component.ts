import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChOxygenTherapyService } from '../../../business-controller/ch_oxygen_therapy.service';


@Component({
  selector: 'ngx-form-oxygen-therapy',
  templateUrl: './form-oxygen-therapy.component.html',
  styleUrls: ['./form-oxygen-therapy.component.scss']
})

export class FormChOxygenTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
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
    private OxygenS: ChOxygenTherapyService,
    private toastService: NbToastrService,   

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        revision: '',
        observation: '',
      };
    }

    this.form = this.formBuilder.group({
      revision: [this.data[0] ? this.data[0].revision : this.data.revision,Validators.compose([Validators.required])],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation,],
    });

    if (this.data.revision != '') {
      this.form.controls.revision.disable();
      this.form.controls.observation.disable();
      this.disabled = true;
    } else {
      this.form.controls.revision.enable();
      this.form.controls.observation.enable();
      this.disabled = false;
    }

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.OxygenS.Update({
          id: this.data.id,
          revision: this.form.controls.revision.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.OxygenS.Save({
          revision: this.form.controls.revision.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ revision: '', observation: ''});
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

    }else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


}

