import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChInabilityService } from '../../../../business-controller/ch-inability.service';
import { ChReasonService } from '../../../../business-controller/ch-reason.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ChContingencyCodeService } from '../../../../business-controller/ch-contingency-code.service';
import { ChTypeInabilityService } from '../../../../business-controller/ch-type-inability.service';
import { ChTypeProcedureService } from '../../../../business-controller/ch-type-procedure.service';
@Component({
  selector: 'ngx-form-ch-inability',
  templateUrl: './form-ch-inability.component.html',
  styleUrls: ['./form-ch-inability.component.scss'],
})
export class FormChInabilityComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() record_id: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;
  public ch_contingency_code_id: any[];
  public ch_type_inability_id: any[];
  public ch_type_procedure_id: any[];
  public diagnosis_id: any[];
  public changes=false;
  public diagnosis: any[] = [];
  public changes1=false;


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChInabilityS: ChInabilityService,
    private DiagnosisS: DiagnosisService,
    private route: ActivatedRoute,
    private chRecord: ChRecordService,
    private ChContingencyCodeS: ChContingencyCodeService,
    private ChTypeInabilityS: ChTypeInabilityService,
    private ChTypeProcedureS: ChTypeProcedureService,
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        ch_contingency_code_id: '',
        extension: '',
        initial_date: '',
        final_date: '',
        diagnosis_id: '',
        ch_type_inability_id: '',
        ch_type_procedure_id: '',
        observation: '',
        total_days: '',
      };
    }
    
   

    this.form = this.formBuilder.group({
      ch_contingency_code_id: [this.data[0] ? this.data[0].ch_contingency_code_id : this.data.ch_contingency_code_id,],
      extension: [this.data[0] ? this.data[0].extension : this.data.extension,],
      initial_date: [this.data[0] ? this.data[0].initial_date : this.data.initial_date,],
      final_date: [this.data[0] ? this.data[0].final_date : this.data.final_date,],
      diagnosis_id: [this.data[0] ? this.data[0].diagnosis_id : this.data.diagnosis_id,],
      ch_type_inability_id: [this.data[0] ? this.data[0].ch_type_inability_id : this.data.ch_type_inability_id,],
      ch_type_procedure_id: [this.data[0] ? this.data[0].ch_type_procedure_id : this.data.ch_type_procedure_id,],
      observation: [this.data[0] ? this.data[0].observation : this.data.observation,],
      total_days: [this.data[0] ? this.data[0].total_days : this.data.total_days,],
      

    });


    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });


    this.DiagnosisS.GetCollection().then((x) => {
      this.diagnosis_id = x;
    });

    this.ChContingencyCodeS.GetCollection().then((x) => {
      this.ch_contingency_code_id = x;
    });
    this.ChTypeInabilityS.GetCollection().then((x) => {
      this.ch_type_inability_id = x;
    });
    this.ChTypeProcedureS.GetCollection().then((x) => {
      this.ch_type_procedure_id = x;
    });
  }

 

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChInabilityS.Update({
          id: this.data.id,
          ch_contingency_code_id: this.form.controls.ch_contingency_code_id.value,
          extension: this.form.controls.extension.value,
          initial_date: this.form.controls.initial_date.value,
          final_date: this.form.controls.final_date.value,
          diagnosis_id: this.form.controls.diagnosis_id.value,
          ch_type_inability_id: this.form.controls.ch_type_inability_id.value,
          ch_type_procedure_id: this.form.controls.ch_type_procedure_id.value,
          observation: this.form.controls.observation.value,
          total_days: this.form.controls.total_days.value,
          type_record_id: 7,
          ch_record_id: this.record_id,
        }).then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.ChInabilityS.Save({
          ch_contingency_code_id: this.form.controls.ch_contingency_code_id.value,
          extension: this.form.controls.extension.value,
          initial_date: this.form.controls.initial_date.value,
          final_date: this.form.controls.final_date.value,
          diagnosis_id: this.form.controls.diagnosis_id.value,
          ch_type_inability_id: this.form.controls.ch_type_inability_id.value,
          ch_type_procedure_id: this.form.controls.ch_type_procedure_id.value,
          observation: this.form.controls.observation.value,
          total_days: this.form.controls.total_days.value,
          type_record_id: 7,
          ch_record_id: this.record_id,
        
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({
              ch_contingency_code_id: '',
              extension: '',
              initial_date: '',
              final_date: '',
              diagnosis_id: '',
              ch_type_inability_id: '',
              ch_type_procedure_id: '',
              observation: '',
              total_days:'',
            });
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
          this.messageEvent.emit(true);
      }
    }
  }
  receiveMessage($event) {   
    
    if($event.isactive==false){
      this.changes=false;
      this.changes1=false;
    }
    if($event.entity){
    this.form.get($event.entity).setValue(this.form.get($event.entity).value+' '+$event.text);
    }
  }

  changebuttom() {
    this.changes=true;
  }

  changebuttom1() {
    this.changes1=true;
  }


  saveCode(e): void {
    var localidentify = this.diagnosis.find(item => item.name == e);

    if (localidentify) {
      this.diagnosis_id = localidentify.id;
    } else {
      this.diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
      this.form.controls.diagnosis_id.setErrors({ 'incorrect': true });
    }
  }
  

}
