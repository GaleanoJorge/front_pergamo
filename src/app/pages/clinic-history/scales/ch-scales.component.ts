import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChScalesService } from '../../../business-controller/ch_scales.service';



@Component({
  selector: 'ngx-ch-scales',
  templateUrl: './ch-scales.component.html',
  styleUrls: ['./ch-scales.component.scss']
})

export class ChScalesComponent implements OnInit {

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
  public ch_type_background: any[];


  constructor(
    private formBuilder: FormBuilder,
    private ChScalesS: ChScalesService,
    private toastService: NbToastrService,   

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
        norton: '',
        glasgow: '',
        barthel: '',
      };
    }

    
    this.form = this.formBuilder.group({
      norton: [this.data[0] ? this.data[0].norton : this.data.norton,],
      glasgow: [this.data[0] ? this.data[0].glasgow : this.data.glasgow,],
      barthel: [this.data[0] ? this.data[0].barthel : this.data.barthel,],
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChScalesS.Update({
          id: this.data.id,
          norton: this.form.controls.norton.value,
          glasgow: this.form.controls.glasgow.value,
          barthel: this.form.controls.barthel.value,
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
        await this.ChScalesS.Save({
          norton: this.form.controls.norton.value,
          glasgow: this.form.controls.glasgow.value,
          barthel: this.form.controls.barthel.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ norton: '', glasgow: '', barthel:''});
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

