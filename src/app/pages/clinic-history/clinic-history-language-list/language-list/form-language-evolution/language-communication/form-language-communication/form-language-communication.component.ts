import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunicationTlService } from '../../../../../../../business-controller/communication-tl.service';
import { ChRecordService } from '../../../../../../../business-controller/ch_record.service';
@Component({
  selector: 'ngx-form-language-communication',
  templateUrl: './form-language-communication.component.html',
  styleUrls: ['./form-language-communication.component.scss'],
})
export class FormLanguageCommunicationComponent implements OnInit {
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
    private CommunicationTlS: CommunicationTlService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
   
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.record_id = this.route.snapshot.params.id;

    if (!this.data || this.data.length == 0) {
      this.data = {
        eye_contact: '', 
        courtesy_rules: '', 
        communicative_intention: '', 
        communicative_purpose: '', 
        oral_verb_modality: '', 
        written_verb_modality: '', 
        nonsymbolic_nonverbal_modality: '', 
        symbolic_nonverbal_modality: '', 
        observations: '', 

      };
    }

    if (this.has_input) {
      this.CommunicationTlS.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          eye_contact: [this.data[0] ? this.data[0].eye_contact : this.data.eye_contact,],
          courtesy_rules: [this.data[0] ? this.data[0].courtesy_rules : this.data.courtesy_rules,],
          communicative_intention: [this.data[0] ? this.data[0].communicative_intention : this.data.communicative_intention,],
          communicative_purpose: [this.data[0] ? this.data[0].communicative_purpose : this.data.communicative_purpose,],
          oral_verb_modality: [this.data[0] ? this.data[0].oral_verb_modality : this.data.oral_verb_modality,],
          written_verb_modality: [this.data[0] ? this.data[0].written_verb_modality : this.data.written_verb_modality,],
          nonsymbolic_nonverbal_modality: [this.data[0] ? this.data[0].nonsymbolic_nonverbal_modality : this.data.nonsymbolic_nonverbal_modality,],
          symbolic_nonverbal_modality: [this.data[0] ? this.data[0].symbolic_nonverbal_modality : this.data.symbolic_nonverbal_modality,],
          observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
        });
      });
    }

    this.form = this.formBuilder.group({
      eye_contact: [this.data[0] ? this.data[0].eye_contact : this.data.eye_contact,Validators.compose([Validators.required])],
      courtesy_rules: [this.data[0] ? this.data[0].courtesy_rules : this.data.courtesy_rules,Validators.compose([Validators.required])],
      communicative_intention: [this.data[0] ? this.data[0].communicative_intention : this.data.communicative_intention,Validators.compose([Validators.required])],
      communicative_purpose: [this.data[0] ? this.data[0].communicative_purpose : this.data.communicative_purpose,Validators.compose([Validators.required])],
      oral_verb_modality: [this.data[0] ? this.data[0].oral_verb_modality : this.data.oral_verb_modality,Validators.compose([Validators.required])],
      written_verb_modality: [this.data[0] ? this.data[0].written_verb_modality : this.data.written_verb_modality,Validators.compose([Validators.required])],
      nonsymbolic_nonverbal_modality: [this.data[0] ? this.data[0].nonsymbolic_nonverbal_modality : this.data.nonsymbolic_nonverbal_modality,Validators.compose([Validators.required])],
      symbolic_nonverbal_modality: [this.data[0] ? this.data[0].symbolic_nonverbal_modality : this.data.symbolic_nonverbal_modality,Validators.compose([Validators.required])],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.CommunicationTlS.Update({
          id: this.data.id,
          eye_contact: this.form.controls.eye_contact.value,
          courtesy_rules: this.form.controls.courtesy_rules.value,
          communicative_intention: this.form.controls.communicative_intention.value,
          communicative_purpose: this.form.controls.communicative_purpose.value,
          oral_verb_modality: this.form.controls.oral_verb_modality.value,
          written_verb_modality: this.form.controls.written_verb_modality.value,
          nonsymbolic_nonverbal_modality: this.form.controls.nonsymbolic_nonverbal_modality.value,
          symbolic_nonverbal_modality: this.form.controls.symbolic_nonverbal_modality.value,
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
        await this.CommunicationTlS.Save({
          eye_contact: this.form.controls.eye_contact.value,
          courtesy_rules: this.form.controls.courtesy_rules.value,
          communicative_intention: this.form.controls.communicative_intention.value,
          communicative_purpose: this.form.controls.communicative_purpose.value,
          oral_verb_modality: this.form.controls.oral_verb_modality.value,
          written_verb_modality: this.form.controls.written_verb_modality.value,
          nonsymbolic_nonverbal_modality: this.form.controls.nonsymbolic_nonverbal_modality.value,
          symbolic_nonverbal_modality: this.form.controls.symbolic_nonverbal_modality.value,
          observations: this.form.controls.observations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ eye_contact:'', courtesy_rules:'', communicative_intention:'', communicative_purpose:'',
          oral_verb_modality:'', written_verb_modality:'', nonsymbolic_nonverbal_modality:'',  symbolic_nonverbal_modality:'', observations:''});
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