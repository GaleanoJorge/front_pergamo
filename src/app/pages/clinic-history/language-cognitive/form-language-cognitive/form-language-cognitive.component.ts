import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { CognitiveTlService } from '../../../../business-controller/cognitive-tl.service';

@Component({
  selector: 'ngx-form-language-cognitive',
  templateUrl: './form-language-cognitive.component.html',
  styleUrls: ['./form-language-cognitive.component.scss'],
})
export class FormLanguageCognitiveComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() has_input: boolean = false;
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
    private CognitiveTlS: CognitiveTlService,
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
        memory: '', 
        attention: '', 
        concentration: '',
        observations: '', 

      };
    }

    if (this.has_input) {
      this.CognitiveTlS.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          memory: [this.data[0] ? this.data[0].memory : this.data.memory,Validators.compose([Validators.required]),],
          attention: [this.data[0] ? this.data[0].attention : this.data.attention,Validators.compose([Validators.required]),],
          concentration: [this.data[0] ? this.data[0].concentration : this.data.concentration,Validators.compose([Validators.required]),],
          observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
        });
      });
    }

    this.form = this.formBuilder.group({
      memory: [this.data[0] ? this.data[0].memory : this.data.memory,Validators.compose([Validators.required]),],
      attention: [this.data[0] ? this.data[0].attention : this.data.attention,Validators.compose([Validators.required]),],
      concentration: [this.data[0] ? this.data[0].concentration : this.data.concentration,Validators.compose([Validators.required]),],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
      
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.CognitiveTlS.Update({
          id: this.data.id,
          memory: this.form.controls.memory.value,
          attention: this.form.controls.attention.value,
          concentration: this.form.controls.concentration.value,
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
        await this.CognitiveTlS.Save({
          memory: this.form.controls.memory.value,
          attention: this.form.controls.attention.value,
          concentration: this.form.controls.concentration.value,
          observations: this.form.controls.observations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ memory: '', attention:'', concentration:'', observations:'' });
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
    else{
      this.toastService.warning('', 'Debe diligenciar los campos obligatorios');
    }
  }
  

}