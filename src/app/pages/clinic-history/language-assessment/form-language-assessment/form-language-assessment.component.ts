import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { TlTherapyLanguageService } from '../../../../business-controller/tl-therapy-language.service';

@Component({
  selector: 'ngx-form-language-assessment',
  templateUrl: './form-language-assessment.component.html',
  styleUrls: ['./form-language-assessment.component.scss'],
})
export class FormLanguageAssessmentComponent implements OnInit {
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
  public medical_diagnostic_id: any[];
  public therapeutic_diagnosis_id: any[];
  public diagnosis_id;
  public diagnosis: any[] = [];
  public diagnosis_medical;
  public therapeutyc_diagnosis;
  
  public loadAuxData = true;


  constructor(
    private formBuilder: FormBuilder,
    private DiagnosisS: DiagnosisService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private TlTherapyLanguageS: TlTherapyLanguageService,
    private route: ActivatedRoute
  ) {}


 async ngOnInit() {
  
    if (!this.data || this.data.length == 0) {
      this.data = {
        medical_diagnostic_id: '',
        therapeutic_diagnosis_id: '',
        reason_consultation: '',
        
      };
    }
    this.loadForm(false).then();
    // await Promise.all([
    //   this.GetAux(),
    // ]);
    this.loadAuxData = false;
    this.loadForm();
  }

  public diagnosticConut = 0;

  searchDiagnostic($event) {
    this.diagnosticConut++;
    if (this.diagnosticConut == 3) {
      this.diagnosticConut = 0;
      if ($event.length >= 3) {
        this.DiagnosisS.GetCollection({
          search: $event,
        }).then(x => {
          this.diagnosis = x;
        });
      } else {
        this.DiagnosisS.GetCollection({
          search: '',
        }).then(x => {
          this.diagnosis = x;
        });
      }
    }
  }
    
  // async GetAux() {
  //   await this.DiagnosisS.GetCollection().then(x => {
  //     this.diagnosis = x;
  //     this.loading = false;
  //   });
  //   return Promise.resolve(true);
  // }

  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;
    

    if (this.has_input) {
      this.TlTherapyLanguageS.GetCollection({ has_input: true, record_id: this.record_id }).then(x => {
        this.data = x;
        this.form = this.formBuilder.group({
          medical_diagnostic_id: [this.data[0] ? this.returnCode( this.data[0].medical_diagnostic_id ): this.data.medical_diagnostic_id,Validators.compose([Validators.required]),],
          therapeutic_diagnosis_id: [this.data[0] ? this.returnCode( this.data[0].therapeutic_diagnosis_id ): this.data.therapeutic_diagnosis_id,Validators.compose([Validators.required]),],
          reason_consultation: [this.data[0] ? this.returnCode( this.data[0].reason_consultation) : this.data.reason_consultation,],
        });
      });
    }

    this.form = this.formBuilder.group({
      medical_diagnostic_id: [this.data[0] ? this.returnCode( this.data[0].medical_diagnostic_id ): this.data.medical_diagnostic_id,Validators.compose([Validators.required]),],
      therapeutic_diagnosis_id: [this.data[0] ? this.returnCode( this.data[0].therapeutic_diagnosis_id ): this.data.therapeutic_diagnosis_id,Validators.compose([Validators.required]),],
      reason_consultation: [this.data[0] ? this.returnCode( this.data[0].reason_consultation) : this.data.reason_consultation,],
    });

  }

  returnCode(diagnosis_id){
    var localName = this.diagnosis.find(item => item.id == diagnosis_id);
    var nombre_diagnosis
    if(localName){
      nombre_diagnosis = localName.name;
    } else {
      nombre_diagnosis = ''
    }
    return nombre_diagnosis;
  }

  saveCode(e, valid): void {
    var localidentify = this.diagnosis.find(item => item.name == e);

    if (localidentify) {
      if (valid==1){
        this.diagnosis_medical = localidentify.id;
      } else {
        this.therapeutyc_diagnosis = localidentify.id;
      }
    } else {
      if (valid==1){
        this.diagnosis_medical = null;
      } else {
        this.therapeutyc_diagnosis = null;
      }
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.diagnosis_id.setErrors({'incorrect': true});
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.TlTherapyLanguageS.Update({
          id: this.data.id,
          medical_diagnostic_id: this.diagnosis_medical,
          therapeutic_diagnosis_id: this.therapeutyc_diagnosis,
          reason_consultation: this.form.controls.reason_consultation.value,
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
        await this.TlTherapyLanguageS.Save({
          medical_diagnostic_id: this.diagnosis_medical,
          therapeutic_diagnosis_id: this.therapeutyc_diagnosis,
          reason_consultation: this.form.controls.reason_consultation.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ medical_diagnostic_id: '', therapeutic_diagnosis_id:'', reason_consultation:''});
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

