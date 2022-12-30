import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { SpecialFieldService } from '../../../../business-controller/special-field.service';
import { ChInterconsultationService } from '../../../../business-controller/ch-interconsultation.service';
import { SpecialtyService } from '../../../../business-controller/specialty.service';
import { FrequencyService } from '../../../../business-controller/frequency.service';
import { DbPwaService } from '../../../../services/authPouch.service';
import PouchDB from 'pouchdb-browser';

import { ProcedureService } from '../../../../business-controller/procedure.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { TypeOfAttentionService } from '../../../../business-controller/type-of-attention.service';

@Component({
  selector: 'ngx-form-ch-interconsultation',
  templateUrl: './form-ch-interconsultation.component.html',
  styleUrls: ['./form-ch-interconsultation.component.scss'],
})
export class FormChInterconsultationComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();



  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public record_id;
  public admissions_id;
  public specialty_id;
  public procedure_id;
  public frequency_id: any[];
  public specialty: any[];
  public procedure: any[];
  public type_of_attention: any[];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute,
    private FrequencyS: FrequencyService,
    private SpecialtyS: SpecialtyService,
    private ChInterconsultationS: ChInterconsultationService,
    private DbPounch: DbPwaService,
    private procedureS: ProcedureService,
    private serviceS: ServicesBriefcaseService,
    private typeOfAttentionS: TypeOfAttentionService,
  ) {}
  
  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        ambulatory_medical_order: 0,
        type_of_attention_id: '',
        specialty_id: '',
        procedure_id: '',
        amount: '',
        frequency_id: '',
        observations: '',
      };
    };
    
    if (!navigator.onLine) {
    this.SpecialtyS.GetCollection().then(x => {
      this.specialty= x;
      this.DbPounch.saveSelects(this.specialty, 'specialty');
      this.specialty = x;
    });
    this.FrequencyS.GetCollection().then(x => {
      this.frequency_id = x;
      this.DbPounch.saveSelects(this.frequency_id, 'frequency_id');
    });
  } else {
    if ('specialty') {
      let dataTable = new PouchDB('specialty');
      dataTable.get('specialty').then(x => {
        this.specialty = x.type;
        return Promise.resolve(true);
      });
    } 
    if ('frequency_id') {
      let dataTable = new PouchDB('frequency_id');
      dataTable.get('frequency_id').then(x => {
        this.frequency_id = x.type;
        return Promise.resolve(true);
      });
    } 
  }

    this.typeOfAttentionS.GetCollection().then(x => {
      this.type_of_attention = x;
    });

    this.serviceS.GetProcedureByChRecordId(this.record_id).then(x => {
      this.procedure = x;
    });

    this.form = this.formBuilder.group({
      ambulatory_medical_order: [this.data.ambulatory_medical_order],
      type_of_attention_id: [this.data.type_of_attention_id, Validators.compose([Validators.required])],
      specialty_id: [this.data[0] ? this.data[0].specialty_id : this.data.specialty_id],
      procedure_id: [this.data.procedure_id, Validators.compose([Validators.required])],
      amount: [this.data.amount],
      frequency_id: [this.data.frequency_id, Validators.compose([Validators.required])],
      observations: [this.data.observations],
    });

    this.onChange();

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChInterconsultationS.Update({
          id: this.data.id,
          type_of_attention_id: this.form.controls.type_of_attention_id.value,
          ambulatory_medical_order: this.form.controls.ambulatory_medical_order.value ? 'Sí' : null,
          procedure_id: this.form.controls.ambulatory_medical_order.value ? this.procedure_id : null,
          services_briefcase_id: this.form.controls.ambulatory_medical_order.value ? null : this.procedure_id,
          specialty_id: this.specialty_id,
          amount: this.form.controls.amount.value,
          frequency_id: this.form.controls.frequency_id.value,
          observations: this.form.controls.observations.value,
          type_record_id: 6,
          ch_record_id: this.record_id,
        })
          .then((x) => {
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
        await this.ChInterconsultationS
          .Save({
            type_of_attention_id: this.form.controls.type_of_attention_id.value,
            ambulatory_medical_order: this.form.controls.ambulatory_medical_order.value ? 'Sí' : null,
            procedure_id: this.form.controls.ambulatory_medical_order.value == true  ? this.procedure_id : null,
            services_briefcase_id: this.form.controls.ambulatory_medical_order.value == true  ? null : this.procedure_id,
            specialty_id: this.specialty_id,
            amount: this.form.controls.amount.value,
            frequency_id: this.form.controls.frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            // this.form.setValue({ specialty_id: '', amount: '', frequency_id: '', observations: '' });
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.toastService.warning('', x);
            this.isSubmitted = false;
            this.loading = false;
          });
        this.messageEvent.emit(true);
      }
    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }

  }
  returnCode(specialty_id) {
    var localName = this.specialty.find(item => item.id == specialty_id);
    var nombre_specialty
    if (localName) {
      nombre_specialty = localName.name;
    } else {
      nombre_specialty = ''
    }
    return nombre_specialty;
  }

  saveCode(e): void {
    var localidentify = this.specialty.find(item => item.name == e);

    if (localidentify) {
      this.specialty_id = localidentify.id;
    } else {
      this.specialty_id = null;
    }
  }

  saveCodeProcedure(e): void {
    var localidentify = this.procedure.find(item => (this.form.controls.ambulatory_medical_order.value==true? item.name : item.manual_price.procedure.name) == e);

    if (localidentify) {
      this.procedure_id = localidentify.id;
      this.form.controls.procedure_id.setErrors(null);

    } else {
      this.procedure_id = null;
      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');
    }
  }

  onChange() {

    this.form.get('type_of_attention_id').valueChanges.subscribe(val => {
      if (val == 2) {
        this.form.controls.specialty_id.setValidators(Validators.compose([Validators.required]));
      } else {
        this.form.controls.specialty_id.setValidators(null);
      }
    });

    this.form.get('ambulatory_medical_order').valueChanges.subscribe(val => {
      this.procedure_id = null;
      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
      this.form.patchValue({
        type_of_attention_id: '',
        specialty_id: '',
        procedure_id: '',
      });
      if (val == 1) {

        this.form.controls.type_of_attention_id.setValidators(null);
        this.form.controls.specialty_id.setValidators(null);
        this.procedureS.GetCollection().then(x => {
          this.procedure = x;
        });


      } else {
        this.form.controls.type_of_attention_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.specialty_id.setValidators(Validators.compose([Validators.required]));
        this.serviceS.GetProcedureByChRecordId(this.record_id).then(x => {
          this.procedure = x;
        });


      };
    });

  }
}
