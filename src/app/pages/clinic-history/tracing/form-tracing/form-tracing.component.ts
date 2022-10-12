import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { TracingService } from '../../../../business-controller/tracing.service';



@Component({
  selector: 'ngx-form-tracing',
  templateUrl: './form-tracing.component.html',
  styleUrls: ['./form-tracing.component.scss']
})
export class FormTracingComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public attention: any[] = [];
  public awareness: any[] = [];
  public memory: any[] = [];
  public perception: any[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService, 
    private tracingS: TracingService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

        observation:'',

      };

     
  
    }

    this.form = this.formBuilder.group({

      observation: [this.data[0] ? this.data[0].observation : this.data.observation, Validators.compose([Validators.required])],
    
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.tracingS.Update({
          id: this.data.id,
          observation: this.form.controls.observation.value,
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
        this.tracingS.Save({
          observation: this.form.controls.observation.value,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            observation:'',
          });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    } 
    else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


}
