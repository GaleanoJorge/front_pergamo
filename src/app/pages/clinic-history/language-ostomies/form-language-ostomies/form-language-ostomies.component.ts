import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { OstomiesTlService } from '../../../../business-controller/ostomies-tl.service';

@Component({
  selector: 'ngx-form-language-ostomies',
  templateUrl: './form-language-ostomies.component.html',
  styleUrls: ['./form-language-ostomies.component.scss'],
})
export class FormLanguageOstomiesComponent implements OnInit {
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
    private OstomiesTlS: OstomiesTlService,
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
        jejunostomy: '', 
        colostomy: '', 
        observations: '', 

      };
    }
    this.form = this.formBuilder.group({
      jejunostomy: [this.data[0] ? this.data[0].jejunostomy : this.data.jejunostomy,],
      colostomy: [this.data[0] ? this.data[0].colostomy : this.data.colostomy,],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
      
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.OstomiesTlS.Update({
          id: this.data.id,
          jejunostomy: this.form.controls.jejunostomy.value,
          colostomy: this.form.controls.colostomy.value,
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
        await this.OstomiesTlS.Save({
          jejunostomy: this.form.controls.jejunostomy.value,
          colostomy: this.form.controls.colostomy.value,
          observations: this.form.controls.observations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ jejunostomy:'', colostomy:'', observations:''  });
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
        this.messageEvent.emit(true);
      }

    }
  }

}