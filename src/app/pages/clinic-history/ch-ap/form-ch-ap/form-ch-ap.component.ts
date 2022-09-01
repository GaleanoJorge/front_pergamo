import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { ChApService } from '../../../../business-controller/ch-ap.service';

@Component({
  selector: 'ngx-form-ch-ap',
  templateUrl: './form-ch-ap.component.html',
  styleUrls: ['./form-ch-ap.component.scss'],
})
export class FormChApComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() type_record: any;
  @Input() record_id: any;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;
  public changes=false;
  public changes1=false;

  constructor(
    private formBuilder: FormBuilder,
    private ChApS: ChApService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        analisys: '',
        plan: '',
        
      };
    }

    this.form = this.formBuilder.group({
      analisys: [this.data.analisys, Validators.compose([Validators.required])],
      plan: [this.data.plan, Validators.compose([Validators.required])],
     
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChApS
          .Update({
            id: this.data.id,
            analisys: this.form.controls.analisys.value,
            plan: this.form.controls.plan.value,
         
            type_record_id: this.type_record,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ analisys: '', plan: ''});
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.ChApS
          .Save({
            analisys: this.form.controls.analisys.value,
            plan: this.form.controls.plan.value,
            type_record_id: this.type_record,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ analisys: '', plan: '' });
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
    }
}
  


