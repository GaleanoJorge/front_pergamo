import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChTypeBackgroundService } from '../../../../../business-controller/ch_type_background.service';
import { ChBackgroundService } from '../../../../../business-controller/ch_background.service';


@Component({
  selector: 'ngx-form-background',
  templateUrl: './form-background.component.html',
  styleUrls: ['./form-background.component.scss']
})

export class FormBackgroundComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = 1;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_type_background: any[];


  constructor(
    private formBuilder: FormBuilder,
    private ChTypeBackgroundS: ChTypeBackgroundService,
    private BackgroundS: ChBackgroundService,
    private toastService: NbToastrService,   

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        revision: 'SI',
        observation: '',
        ch_type_background_id: '',
      };
    }

    this.ChTypeBackgroundS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_type_background = x;
    });



    this.form = this.formBuilder.group({
      revision: ['SI',],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation,],
      ch_type_background_id: [this.data[0] ? this.data[0].ch_type_background_id : this.data.ch_type_background_id,Validators.compose([Validators.required])],
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.BackgroundS.Update({
          id: this.data.id,
          revision: this.form.controls.revision.value,
          observation: this.form.controls.observation.value,
          ch_type_background_id: this.form.controls.ch_type_background_id.value,
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
        await this.BackgroundS.Save({
          revision: this.form.controls.revision.value,
          observation: this.form.controls.observation.value,
          ch_type_background_id: this.form.controls.ch_type_background_id.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ revision: '', observation: '', ch_type_background_id:''});
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

    } else{
      this.toastService.warning('', "Debe seleccionar un item de la lista");
    }

    }
  }




