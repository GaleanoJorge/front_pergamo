import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChPsAttentionService } from '../../../../../business-controller/ch-ps-attention.service';
import { ChPsIntellectiveService } from '../../../../../business-controller/ch-ps-intellective.service';
import { ChPsInterventionService } from '../../../../../business-controller/ch-ps-intervention.service';
import { ChPsMemoryService } from '../../../../../business-controller/ch-ps-memory.service';
import { ChPsPerceptionService } from '../../../../../business-controller/ch-ps-perception.service';



@Component({
  selector: 'ngx-form-ps-intervention',
  templateUrl: './form-ps-intervention.component.html',
  styleUrls: ['./form-ps-intervention.component.scss']
})
export class FormPsInterventionComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() has_input: any = null;
  @Input() type_record_id: Boolean = false;
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

    private interventionS: ChPsInterventionService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

        assessment:'',

      };

     
  
    }

    this.form = this.formBuilder.group({

      assessment: [this.data[0] ? this.data[0].assessment : this.data.assessment, Validators.compose([Validators.required])],
    
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.interventionS.Update({
          id: this.data.id,
          assessment: this.form.controls.assessment.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          // this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.interventionS.Save({
          assessment: this.form.controls.assessment.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            assessment:'',
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
