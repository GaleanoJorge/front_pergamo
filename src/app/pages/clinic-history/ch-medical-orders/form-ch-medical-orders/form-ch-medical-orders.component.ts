import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../business-controller/product.service';
import { ChMedicalOrdersService } from '../../../../business-controller/ch-medical-orders.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { FrequencyService } from '../../../../business-controller/frequency.service';
import { DbPwaService } from '../../../../services/authPouch.service';
import PouchDB from 'pouchdb-browser';


@Component({
  selector: 'ngx-form-ch-medical-orders',
  templateUrl: './form-ch-medical-orders.component.html',
  styleUrls: ['./form-ch-medical-orders.component.scss'],
})
export class FormChMedicalOrdersComponent implements OnInit {
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
  public procedure: any[];
  public procedure_id;
  public frequency_id: any[];

  constructor(
    private formBuilder: FormBuilder,
    private evoSoapS: ChEvoSoapService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute,
    private FrequencyS: FrequencyService,
    private ProductS: ProcedureService,
    private ChMedicalOrdersS: ChMedicalOrdersService,
    private DbPounch: DbPwaService,
  ) { }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        ambulatory_medical_order: '',
        procedure_id: '',
        amount: '',
        frequency_id: '',
        observations: '',

      };
    };

    if (!navigator.onLine) {
      this.ProductS.GetCollection().then(x => {
        this.procedure = x;
        this.DbPounch.saveSelects(this.procedure, 'procedure');

      });
      this.FrequencyS.GetCollection().then(x => {
        this.frequency_id = x;
        this.DbPounch.saveSelects(this.frequency_id, 'frequency_id');
      });
    } else {
      if ('procedure') {
        let dataTable = new PouchDB('procedure');
        dataTable.get('procedure').then(x => {
          this.procedure = x.type;
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
    this.form = this.formBuilder.group({
      ambulatory_medical_order: [this.data.ambulatory_medical_order],
      procedure_id: [this.data.procedure_id],
      amount: [this.data.amount],
      frequency_id: [this.data.frequency_id],
      observations: [this.data.observations],

    });
  }

  clearForm() {
    this.form.patchValue({
      ambulatory_medical_order: '',
      procedure_id: '',
      amount: '',
      frequency_id: '',
      observations: '',
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChMedicalOrdersS
          .Update({
            id: this.data.id,
            ambulatory_medical_order: this.form.controls.ambulatory_medical_order.value ? 'Sí' : null,
            procedure_id: this.procedure_id,
            amount: this.form.controls.amount.value,
            frequency_id: this.form.controls.frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.clearForm();
            this.toastService.success('', x.message);
            this.form.patchValue({
              ambulatory_medical_order: '',
              procedure_id: '',
              amount: '',
              frequency_id: '',
              observations: '' });
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.ChMedicalOrdersS
          .Save({
            ambulatory_medical_order: this.form.controls.ambulatory_medical_order.value ? 'Sí' : null,
            procedure_id: this.procedure_id,
            amount: this.form.controls.amount.value,
            frequency_id: this.form.controls.frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.clearForm();
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.patchValue({
              ambulatory_medical_order: '',
              procedure_id: '',
              amount: '',
              frequency_id: '',
              observations: '' });
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

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


  saveCode(e): void {
    var localidentify = this.procedure.find(item => item.name == e);

    if (localidentify) {
      this.procedure_id = localidentify.id;
      this.form.controls.procedure_id.setErrors(null);

    } else {
      this.procedure_id = null;
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');
      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
    }
  }
}
