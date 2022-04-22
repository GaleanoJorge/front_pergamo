import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChTypePhysicalExamService } from '../../../../business-controller/ch_type_physical_exam.service';
import { ChPhysicalExamService } from '../../../../business-controller/ch_physical_exam.service';




@Component({
  selector: 'ngx-form-physical-exam-evo',
  templateUrl: './form-physical-exam-evo.component.html',
  styleUrls: ['./form-physical-exam-evo.component.scss']
})

export class FormPhysicalExamEvoComponent implements OnInit {

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
  public type_ch_physical_exam: any[];


  constructor(
    private formBuilder: FormBuilder,
    private typeChPhysical: ChTypePhysicalExamService,
    private PhysicalExamS: ChPhysicalExamService,
    private toastService: NbToastrService,
    
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        revision: '',
        observation: '',
        type_ch_physical_exam_id: '',
      };
    }

    this.typeChPhysical.GetCollection({ status_id: 1 }).then(x => {
      this.type_ch_physical_exam = x;
    });



    this.form = this.formBuilder.group({
      revision: [this.data.revision, Validators.compose([Validators.required])],
      observation: [this.data.observation, Validators.compose([Validators.required])],
      type_ch_physical_exam_id: [this.data.type_ch_physical_exam_id, Validators.compose([Validators.required])],
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.PhysicalExamS.Update({
          id: this.data.id,
          revision: this.form.controls.revision.value,
          observation: this.form.controls.observation.value,
          type_ch_physical_exam_id: this.form.controls.type_ch_physical_exam_id.value,
          type_record_id: 3,
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
        await this.PhysicalExamS.Save({
          revision: this.form.controls.revision.value,
          observation: this.form.controls.observation.value,
          type_ch_physical_exam_id: this.form.controls.type_ch_physical_exam_id.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ revision: '', observation: '', type_ch_physical_exam_id:''});
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
