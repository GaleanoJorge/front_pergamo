import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { OstomiesTlService } from '../../../../business-controller/ostomies-tl.service';
import { HearingTlService } from '../../../../business-controller/hearing-tl.service';

@Component({
  selector: 'ngx-form-language-hearing',
  templateUrl: './form-language-hearing.component.html',
  styleUrls: ['./form-language-hearing.component.scss'],
})
export class FormLanguageHearingComponent implements OnInit {
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
  public admissions_id;
 


  constructor(

    private formBuilder: FormBuilder,
    private HearingTlS: HearingTlService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
   
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });
    if (!this.data || this.data.length == 0) {
      this.data = {
        external_ear: '', 
        middle_ear: '', 
        inner_ear: '',
        observations: '', 

      };
    }
    this.form = this.formBuilder.group({
      external_ear: [this.data[0] ? this.data[0].external_ear : this.data.external_ear,Validators.compose([Validators.required]),],
      middle_ear: [this.data[0] ? this.data[0].middle_ear : this.data.middle_ear,Validators.compose([Validators.required]),],
      inner_ear: [this.data[0] ? this.data[0].inner_ear : this.data.inner_ear,Validators.compose([Validators.required]),],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
      
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.HearingTlS.Update({
          id: this.data.id,
          external_ear: this.form.controls.external_ear.value,
          middle_ear: this.form.controls.middle_ear.value,
          inner_ear: this.form.controls.inner_ear.value,
          observations: this.form.controls.observations.value,
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
        await this.HearingTlS.Save({
          external_ear: this.form.controls.external_ear.value,
          middle_ear: this.form.controls.middle_ear.value,
          inner_ear: this.form.controls.inner_ear.value,
          observations: this.form.controls.observations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ external_ear:'', middle_ear:'', inner_ear:'',  observations:'' });
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