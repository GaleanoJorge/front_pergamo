import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../../../business-controller/ch_record.service';
import { FrequencyService } from '../../../../../../business-controller/frequency.service';
import { ProcedureService } from '../../../../../../business-controller/procedure.service';
import { ServicesBriefcaseService } from '../../../../../../business-controller/services-briefcase.service';
import { ChMedicalOrdersService } from '../../../../../../business-controller/ch-medical-orders.service';
import { ActivatedRoute } from '@angular/router';
import { ChLaboratoryService } from '../../../../../../business-controller/ch-laboratory.service';
@Component({
  selector: 'ngx-form-ch-medical-orders',
  templateUrl: './form-ch-medical-orders.component.html',
  styleUrls: ['./form-ch-medical-orders.component.scss'],
})
export class FormChMedicalOrdersComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() admission: any = null;
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
    private procedureS: ProcedureService,
    private serviceS: ServicesBriefcaseService,
    private ChMedicalOrdersS: ChMedicalOrdersService,
    private chLaboratoryS: ChLaboratoryService
  ) { }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        ambulatory_medical_order: 0,
        procedure_id: '',
        services_briefcase_id: '',
        amount: '',
        frequency_id: '',
        observations: '',

      };
    };
    this.serviceS.GetProcedureByChRecordId(this.record_id).then(x => {
      this.procedure = x;
    });

    this.FrequencyS.GetCollection().then(x => {
      this.frequency_id = x;
    });

    this.serviceS.GetProcedureByChRecordId(this.record_id).then(x => {
      this.procedure = x;
    });

    this.form = this.formBuilder.group({
      ambulatory_medical_order: [this.data.ambulatory_medical_order],
      procedure_id: [this.data.procedure_id],
      amount: [this.data.amount],
      frequency_id: [this.data.frequency_id],
      observations: [this.data.observations],

    });

    this.onChange();
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
    let serviceBriefcase = this.procedure.find(element => element.id == this.procedure_id);

    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChMedicalOrdersS
          .Update({
            id: this.data.id,
            ambulatory_medical_order: this.form.controls.ambulatory_medical_order.value ? 'Sí' : null,
            procedure_id: this.procedure_id,
            services_briefcase_id: this.procedure_id,
            amount: this.form.controls.amount.value,
            frequency_id: this.form.controls.frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,
            admissions_id: this.admission.id,
          })
          .then((x) => {
            this.clearForm();
            this.toastService.success('', x.message);
            this.form.patchValue({
              ambulatory_medical_order: '',
              procedure_id: '',
              amount: '',
              frequency_id: '',
              observations: ''
            });
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
            ambulatory_medical_order: this.form.controls.ambulatory_medical_order.value ? true : false,
            procedure_id: this.form.controls.ambulatory_medical_order.value == true ? this.procedure_id : null,
            services_briefcase_id: this.form.controls.ambulatory_medical_order.value != true ? this.procedure_id : null,
            amount: this.form.controls.amount.value,
            frequency_id: this.form.controls.frequency_id.value,
            observations: this.form.controls.observations.value,
            type_record_id: 6,
            ch_record_id: this.record_id,
            admissions_id: this.admission.id,
          })
          .then((x) => {
            let userData = JSON.parse(localStorage.getItem('user'));
            let medicalOrder = x.data.ch_medical_orders;
            if (this.form.controls.ambulatory_medical_order.value != true && serviceBriefcase && serviceBriefcase.manual_price.procedure.procedure_category_id == 5) {
              this.chLaboratoryS.Save({
                medical_order_id: medicalOrder.id,
                user_id: userData.id,
                observation: this.form.controls.observations.value
              }).then(y => {
    
              }).catch((y) => {
        
              });
            }

            this.clearForm();
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.patchValue({
              ambulatory_medical_order: '',
              procedure_id: '',
              amount: '',
              frequency_id: '',
              observations: ''
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

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


  saveCode(e): void {
    if (this.procedure) {
      var localidentify = this.procedure.find(item => (this.form.controls.ambulatory_medical_order.value == true ? item.name : item.manual_price.procedure.name) == e);

      if (localidentify) {
        this.procedure_id = localidentify.id;
        this.form.controls.procedure_id.setErrors(null);

      } else {
        this.procedure_id = null;
        this.form.controls.procedure_id.setErrors({ 'incorrect': true });
        this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');
      }
    } else {
      this.procedure_id = null;
      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');
    }
  }


  onChange() {

    this.form.get('ambulatory_medical_order').valueChanges.subscribe(val => {
      this.procedure_id = null;
      this.procedure = null;
      this.form.patchValue({
        procedure_id: '',
        amount: '',
        frequency_id: '',
        observations: ''
      });

      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
      if (val == 1) {

        this.procedureS.GetCollection().then(x => {
          this.procedure = x;
        });


      } else {
        this.serviceS.GetProcedureByChRecordId(this.record_id).then(x => {
          this.procedure = x;
        });


      };
    });

  }
}

