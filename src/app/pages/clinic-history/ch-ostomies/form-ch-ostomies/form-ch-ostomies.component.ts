import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { OstomyService } from '../../../../business-controller/ostomy.service';
import { ChOstomiesService } from '../../../../business-controller/ch-ostomies.service';

@Component({
  selector: 'ngx-form-ch-ostomies',
  templateUrl: './form-ch-ostomies.component.html',
  styleUrls: ['./form-ch-ostomies.component.scss'],
})
export class FormChOstomiesComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() type_record: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;
  public ostomy_id: any[]=[];
 


  constructor(

    private formBuilder: FormBuilder,
    private OstomyS: OstomyService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private ChOstomiesS: ChOstomiesService,
   
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });
    if (!this.data || this.data.length == 0) {
      this.data = {
        ostomy_id: '', 
        observation: '', 
        

      };
    }
    this.form = this.formBuilder.group({
      ostomy_id: [this.data[0] ? this.data[0].ostomy_id : this.data.ostomy_id,Validators.compose([Validators.required])],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation,Validators.compose([Validators.required])],
     
    });    
    this.OstomyS.GetCollection().then(x => {
      this.ostomy_id = x;
    });

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.ChOstomiesS.Update({
          id: this.data.id,
          ostomy_id: this.form.controls.ostomy_id.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
          this.form.patchValue({
            ostomy_id: '',
            observation: '',
          });
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChOstomiesS.Save({
          ostomy_id: this.form.controls.ostomy_id.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            ostomy_id: '',
            observation: '',
          });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
        });
        this.messageEvent.emit(true);
      }

    }
  }

}