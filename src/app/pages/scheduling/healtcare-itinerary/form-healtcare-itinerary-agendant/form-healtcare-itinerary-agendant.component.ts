import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { NonWorkingDaysService } from '../../../../business-controller/non-working-days.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { disable } from '@rxweb/reactive-form-validators';
import { BriefcaseService } from '../../../../business-controller/briefcase.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { ContractService } from '../../../../business-controller/contract.service';
import { CompanyService } from '../../../../business-controller/company.service';
import { MedicalDiaryDaysService } from '../../../../business-controller/medical_diary_days.service';
import { MedicalStatusService } from '../../../../business-controller/medical_status.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { PatientCheckComponent } from '../patient-check.component';
import { FormPatientComponent } from '../form-patient/form-patient.component';
import { getEnabledCategories } from 'trace_events';
import { CopayParametersService } from '../../../../business-controller/copay-parameters.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ngx-form-healtcare-itinerary-agendant',
  templateUrl: './form-healtcare-itinerary-agendant.component.html',
  styleUrls: ['./form-healtcare-itinerary-agendant.component.scss'],
})


export class FormHealthcareItineraryAgendantComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() patientData: any = null;
  @Input() cups_selected_id: any = null;

  @Input() assistance: any = null;
  @Input() disabled: boolean = false;
  @Input() onlyView: boolean = false;
  @Input() id: number = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public filteredControlOptions$: Observable<string[]>;
  public procedures: any[] = [];
  public briefcase: any[] = [];
  public eps: any[] = [];
  public contract: any[] = [];
  public medical_status: any[] = [];
  public procedure_id;
  public copay_value;
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public selectedOptions: any[] = [];
  public categories: any[];
  public selectedOptions2: any[] = [];
  public patient_data: any;
  public showcat: boolean = false;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            data: row,
            valid: !this.selectedOptions2.includes(row.id) ? false : true,
            selection: (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: PatientCheckComponent,
      },
      'identification_type.name': {
        title: this.headerFields[0],
        type: 'string',
        // sort: false,
        valuePrepareFunction(value, row) {
          return row.identification_type?.name;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private NonWorkingDaysS: NonWorkingDaysService,
    private toastService: NbToastrService,
    private procedureS: ProcedureService,
    private BriefcaseS: BriefcaseService,
    private ServiceBriefcaseS: ServicesBriefcaseService,
    private ContractS: ContractService,
    private companyS: CompanyService,
    private medicalDiaryDaysS: MedicalDiaryDaysService,
    private CopayParametersS: CopayParametersService,
    private currency: CurrencyPipe,
    private dialogFormService: NbDialogService,
    private medicalStatusS: MedicalStatusService
  ) {}

  ngOnInit(): void {
   this.title = 'Listado de pacientes';
    
    if (!this.data) {
      this.data = {
        state_id: '',
        eps: '',
        contract_id: '',
        briefcase_id: '',
        procedure_id: '',
      };
    }

    if (this.data.data.medical_status_id == 1) {
      this.title = 'Agendamiento de:';
    } else if (this.data.data.medical_status_id == 2) {
      this.title = 'Reservación para:';
      this.disabled = true;
    } else if (this.data.data.medical_status_id == 3) {
      this.title = 'Confirmación para:';
      this.disabled = true;
    }

    this.form = this.formBuilder.group({
      star_hour: [this.data.data.start_hour],
      finish_hour: [this.data.data.finish_hour],
      state_id: [this.data.data.medical_status_id == 1 ? 2 :this.data.data.medical_status_id , Validators.compose([Validators.required])],
      eps_id: [this.data.data.eps_id],
      contract_id: [this.data.data.contract ? this.data.data.contract.name : '' , Validators.compose([Validators.required])],
      briefcase_id: [this.data.data.briefcase ? this.data.data.briefcase.name : '', Validators.compose([Validators.required])],
      procedure_id: [{value : this.data.data.services_briefcase ? this.data.data.services_briefcase.manual_price.name : '', disabled: this.onlyView}, Validators.compose([Validators.required])],
      category_id: [{value : '', disabled: this.onlyView}, Validators.compose([Validators.required])],
      value: [{value : '', disabled: this.onlyView}],
    });

    this.companyS
      .GetCollection({ eps: 1, company_category_id: 1 })
      .then((x) => {
        this.eps = x;
      });

    this.medicalStatusS.GetCollection().then((x) => {
      this.medical_status = x;
    });
    this.onChanges();
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2 = [];
      this.selectedOptions2.push(row.id);
      this.patient_data = row;
      this.table.changeEntity(
        `all_patients?pagination=true&identification=${row.identification}`,
        'patients'
      );
    } else {
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      this.patient_data = undefined;
      // this.eventSettings = undefined;
      this.table.changeEntity(`all_patients?pagination=true`, 'patients');
    }
    this.selectedOptions = this.selectedOptions2;
    this.table.refresh();
  }

  RefreshData() {
    // this.getSchedule(this.assistance_id);
    this.table.refresh();
  }

  NewPatient() {
    this.dialogFormService.open(FormPatientComponent, {
      context: {
        title: 'Nuevo paciente',
        saved: (event, row: any) => this.eventSelections(event, row),
      },
    });
  }

  private filter(value: string): string[] {
    const filterValue = value?.toUpperCase();
    return this.procedures.filter(
      (optionValue) =>
        optionValue.manual_price.own_code.includes(filterValue) ||
        optionValue.manual_price.procedure.code.includes(filterValue) ||
        optionValue.manual_price.procedure.name.includes(filterValue)
    );
  }

  onFilter() {
    this.filteredControlOptions$ = this.form
      .get('procedure_id')
      .valueChanges.pipe(
        startWith(''),
        map((filterString) => this.filter(filterString))
      );
  }

  onSelectionChange($event) {
    // console.log($event)
    var localidentify = this.procedures.find(
      (item) => item.manual_price.procedure.name == $event
    );
      if(!this.disabled && !this.onlyView){
        if (localidentify) {
          this.procedure_id = localidentify.id;
          this.getCategories(this.procedure_id);
        } else {
          this.procedure_id = null;
          this.toastService.warning(
            '',
            'Debe seleccionar un procedimiento de la lista'
          );
          this.form.controls.procedure_id.setErrors({ incorrect: true });
        }
      }
  }

  close() {
    this.dialogRef.close();
  }

  getCategories(procedure_id){
    this.toastService.info('','Calculando posible tarifa')
    this.CopayParametersS.GetCollection({
      services_briefcase_id: procedure_id,
      status_id: 1,
    }).then((x) => {
      this.showcat = true;
      this.categories = x;
    });
  }

  onChanges() {
    this.form.get('eps_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.contract = [];
      } else {
        this.ContractS.GetCollection({ company_id: val }).then((x) => {
          this.contract = x;
        });
      }
      this.form.patchValue({
        contract_id: '',
      });
    });

    this.form.get('contract_id').valueChanges.subscribe((val) => {
      if (val == '') {
        this.briefcase = [];
      } else {
        this.GetBriefcase(val).then();
      }
      this.form.patchValue({
        briefcase_id: '',
      });
    });

    this.form.get('briefcase_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.procedures = [];
      } else {
        this.Getprocedures(val).then();
      }
      this.form.patchValue({
        procedures: '',
      });
    });

    this.form.get('category_id').valueChanges.subscribe((val) => {
      if(val != ''){
        var localCat  = this.categories.find(item => item.id == val);
        if(localCat.payment_type == 2){
          
          var localproc = this.procedures.find(
            (item) => item.id == this.procedure_id
          );
          if(localproc){
            this.copay_value = localproc.value*localCat.value;
            this.form.patchValue({
              value: this.currency.transform(this.copay_value),
            })
          }
        }else {
          this.copay_value = localCat.value;
          this.form.patchValue({
            value: this.currency.transform(this.copay_value),
          })
        }
      }
    });
  }

  GetBriefcase(contract_id) {
    if (!contract_id || contract_id === '') return Promise.resolve(false);
    return this.BriefcaseS.GetBriefcaseByContract(contract_id).then((x) => {
      this.briefcase = x;
      return Promise.resolve(true);
    });
  }

  Getprocedures(briefcase_id) {
    if (!briefcase_id || briefcase_id === '') return Promise.resolve(false);
    return this.ServiceBriefcaseS.GetProcedureByBriefcase(briefcase_id, {
      cups_selected_id: this.cups_selected_id,
    }).then((x) => {
      if (x.length > 0) {
        this.procedures = x;
        this.filteredControlOptions$ = of(this.procedures);
        this.onFilter();
      } else {
        this.toastService.warning(
          '',
          'CUPS no asociado portafolio, comuniquese con personal de contratación'
        );
        this.form.controls.procedure_id.setErrors({ incorrect: true });
      }
      return Promise.resolve(true);
    });
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.Id) {
        this.medicalDiaryDaysS
          .Update({
            id: this.data.Id,
            state_id: this.form.controls.state_id.value,
            eps_id: this.form.controls.eps_id.value,
            contract_id: this.form.controls.contract_id.value,
            briefcase_id: this.form.controls.briefcase_id.value,
            service_briefcase_id: this.procedure_id,
            patient_id: this.patient_data.id,
            copay_id: this.form.controls.category_id.value,
            copay_value: this.copay_value,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            if(this.saved){
              this.saved();
            }
            this.dialogRef.close();
          })
          .catch((x) => {
            this.toastService.warning('', x);
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        this.NonWorkingDaysS.Save({
          day: this.form.controls.day.value,
          description: this.form.controls.description.value,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.dialogRef.close();
          })
          .catch((x) => {
            this.toastService.warning('', x);
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }
}
