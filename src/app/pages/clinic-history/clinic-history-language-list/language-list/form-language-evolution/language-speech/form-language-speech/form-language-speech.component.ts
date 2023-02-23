import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpeechTlService } from '../../../../../../../business-controller/speech-tl.service';
import { ChRecordService } from '../../../../../../../business-controller/ch_record.service';

@Component({
  selector: 'ngx-form-language-speech',
  templateUrl: './form-language-speech.component.html',
  styleUrls: ['./form-language-speech.component.scss'],
})
export class FormLanguageSpeechComponent implements OnInit {
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
  public medical_diagnostic_id: any[]; 
  public therapeutic_diagnosis_id: any[];
  public diagnosis_id;
  public diagnosis: any[];
 


  constructor(

    private formBuilder: FormBuilder,
    private SpeechTlS: SpeechTlService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
   
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.record_id = this.route.snapshot.params.id;

    if (!this.data || this.data.length == 0) {
      this.data = {
        breathing: '', 
        joint: '', 
        resonance: '',
        fluency: '',
        prosody:'',
        observations: '', 

      };
    }

    if (this.has_input) {
      this.SpeechTlS.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          breathing: [this.data[0] ? this.data[0].breathing : this.data.breathing,],
          joint: [this.data[0] ? this.data[0].joint : this.data.joint,],
          resonance: [this.data[0] ? this.data[0].resonance : this.data.resonance,],
          fluency: [this.data[0] ? this.data[0].joint : this.data.fluency,],
          prosody: [this.data[0] ? this.data[0].prosody : this.data.prosody,],
          observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
        });
      });
    }

    this.form = this.formBuilder.group({
      breathing: [this.data[0] ? this.data[0].breathing : this.data.breathing,],
      joint: [this.data[0] ? this.data[0].joint : this.data.joint,],
      resonance: [this.data[0] ? this.data[0].resonance : this.data.resonance,],
      fluency: [this.data[0] ? this.data[0].joint : this.data.fluency,],
      prosody: [this.data[0] ? this.data[0].prosody : this.data.prosody,],
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
      
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.SpeechTlS.Update({
          id: this.data.id,
          breathing: this.form.controls.breathing.value,
          joint: this.form.controls.joint.value,
          resonance: this.form.controls.resonance.value,
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
        await this.SpeechTlS.Save({
          breathing: this.form.controls.breathing.value,
          joint: this.form.controls.joint.value,
          resonance: this.form.controls.resonance.value,
          fluency: this.form.controls.fluency.value,
          prosody: this.form.controls.prosody.value,
          observations: this.form.controls.observations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ breathing: '',  joint:'', resonance:'', fluency:'', prosody:'', observations:'' });
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
    else{
      this.toastService.warning('', 'Debe diligenciar los campos obligatorios');
    }
  }
}