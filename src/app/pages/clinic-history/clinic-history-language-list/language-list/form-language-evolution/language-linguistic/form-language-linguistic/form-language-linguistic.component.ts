import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LanguageTlService } from '../../../../../../../business-controller/language-tl.service';
import { ChRecordService } from '../../../../../../../business-controller/ch_record.service';

@Component({
  selector: 'ngx-form-language-linguistic',
  templateUrl: './form-language-linguistic.component.html',
  styleUrls: ['./form-language-linguistic.component.scss'],
})
export class FormLanguageLinguisticComponent implements OnInit {
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


  constructor(

    private formBuilder: FormBuilder,
    private LanguageTlS: LanguageTlService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
   
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.record_id = this.route.snapshot.params.id;

    
    if (!this.data || this.data.length == 0) {
      this.data = {
        phonetic_phonological: '', 
        syntactic: '', 
        morphosyntactic: '',
        semantic: '', 
        pragmatic: '', 
        reception: '',
        coding: '', 
        decoding: '', 
        production: '',
        observations: '', 

      };
    }

    if (this.has_input) {
      this.LanguageTlS.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          phonetic_phonological: [this.data[0] ? this.data[0].phonetic_phonological : this.data.phonetic_phonological,Validators.compose([Validators.required]),],
          syntactic: [this.data[0] ? this.data[0].syntactic : this.data.syntactic,Validators.compose([Validators.required]),],
          morphosyntactic: [this.data[0] ? this.data[0].morphosyntactic : this.data.morphosyntactic,Validators.compose([Validators.required]),],
          semantic: [this.data[0] ? this.data[0].semantic : this.data.semantic,Validators.compose([Validators.required]),],
          pragmatic: [this.data[0] ? this.data[0].pragmatic : this.data.pragmatic,Validators.compose([Validators.required]),],
          reception: [this.data[0] ? this.data[0].reception : this.data.reception,Validators.compose([Validators.required]),],
          coding: [this.data[0] ? this.data[0].coding : this.data.coding,Validators.compose([Validators.required]),],
          decoding: [this.data[0] ? this.data[0].decoding : this.data.decoding,Validators.compose([Validators.required]),],
          production: [this.data[0] ? this.data[0].production : this.data.production,Validators.compose([Validators.required]),],
          observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
        });
      });
    }

    this.form = this.formBuilder.group({
      phonetic_phonological: [this.data[0] ? this.data[0].phonetic_phonological : this.data.phonetic_phonological,Validators.compose([Validators.required]),],
      syntactic: [this.data[0] ? this.data[0].syntactic : this.data.syntactic,Validators.compose([Validators.required]),],
      morphosyntactic: [this.data[0] ? this.data[0].morphosyntactic : this.data.morphosyntactic,Validators.compose([Validators.required]),],
      semantic: [this.data[0] ? this.data[0].semantic : this.data.semantic,Validators.compose([Validators.required]),],
      pragmatic: [this.data[0] ? this.data[0].pragmatic : this.data.pragmatic,Validators.compose([Validators.required]),],
      reception: [this.data[0] ? this.data[0].reception : this.data.reception,Validators.compose([Validators.required]),],
      coding: [this.data[0] ? this.data[0].coding : this.data.coding,Validators.compose([Validators.required]),],
      decoding: [this.data[0] ? this.data[0].decoding : this.data.decoding,Validators.compose([Validators.required]),],
      production: [this.data[0] ? this.data[0].production : this.data.production,Validators.compose([Validators.required]),],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
      
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.LanguageTlS.Update({
          id: this.data.id,
          phonetic_phonological: this.form.controls.phonetic_phonological.value,
          syntactic: this.form.controls.syntactic.value,
          morphosyntactic: this.form.controls.morphosyntactic.value,
          semantic: this.form.controls.semantic.value,
          pragmatic: this.form.controls.pragmatic.value,
          reception: this.form.controls.reception.value,
          coding: this.form.controls.coding.value,
          decoding: this.form.controls.decoding.value,
          production: this.form.controls.production.value,
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
        await this.LanguageTlS.Save({
          phonetic_phonological: this.form.controls.phonetic_phonological.value,
          syntactic: this.form.controls.syntactic.value,
          morphosyntactic: this.form.controls.morphosyntactic.value,
          semantic: this.form.controls.semantic.value,
          pragmatic: this.form.controls.pragmatic.value,
          reception: this.form.controls.reception.value,
          coding: this.form.controls.coding.value,
          decoding: this.form.controls.decoding.value,
          production: this.form.controls.production.value,
          observations: this.form.controls.observations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ phonetic_phonological:'', syntactic:'', morphosyntactic:'',
          semantic:'', pragmatic:'',  reception:'', coding:'', decoding:'', production:'', observations:''  });
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
    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }

    
  }

}