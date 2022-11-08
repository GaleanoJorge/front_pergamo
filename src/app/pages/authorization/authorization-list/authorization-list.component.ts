import { Component, OnInit, ViewChild, Renderer2, ElementRef, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService, NbWindowService } from '@nebular/theme';
import { map, filter, tap } from 'rxjs/operators'
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { HistoricAuthorizationListComponent } from './historic-authorization/historic-authorization.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { rowDataBound } from '@syncfusion/ej2/grids';
import { ActionsAuthNumberComponent } from './actions-auth-number.component';
import { ActionsStatusComponent } from './actions-status.component';
import { AuthStatusService } from '../../../business-controller/auth-status.service';
import { AuthorizationService } from '../../../business-controller/authorization.service';
import { FormObservationComponent } from './historic-authorization/form-observation/form-observation.component';
import { ManagementPlan } from '../../../models/management-plan';
import { CompanyService } from '../../../business-controller/company.service';
import { ContractService } from '../../../business-controller/contract.service';
import { AuthPackageComponent } from './historic-authorization/auth-package/auth-package.component';
import { ActionsComponent } from './actions.component';
import { AuthAsociatedPackageComponent } from './auth-asociated-package/auth-asociated-package.component';
import { AuthPackageService } from '../../../business-controller/auth-package.service';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { PatientService } from '../../../business-controller/patient.service';
import { BriefcaseService } from '../../../business-controller/briefcase.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActionsSemaphoreComponent } from './actionsSemaphore.component';
import { ProgramService } from '../../../business-controller/program.service';
import { TypeOfAttentionService } from '../../../business-controller/type-of-attention.service';

@Component({
  selector: 'ngx-authorization-list',
  templateUrl: './authorization-list.component.html',
  styleUrls: ['./authorization-list.component.scss'],
})
export class AuthorizationListComponent implements OnInit {


  public isSubmitted = false;
  public loading: boolean = false;
  public messageError: string = null;
  public title: string = 'AUTORIZACIONES: PENDIENTES';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
    'Estado',
    'ID',
    'Procedimiento',
    'Número de autorización',
    'Tipo de documento',
    'Número de documento',
    'Nombre completo',
    'Email',
    'Providencia, Vereda o Municipio',
    'Barrio',
    'Dirección',
    'Fecha de creación',
    'Tipo de atención',
    'Fecha de ejecución',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public entity: string = 'authorization/byStatus/0';
  public data: any = [];
  public data_aux: any = [];
  public auth_status;
  public auth_statusM: any[] = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;

  public today = null;
  public min_day = null;
  public selectedOptions: any[] = [];
  public briefcase_id: any = null;
  public admissions_id: any = null;
  public showdiv: boolean = null;
  public show;
  public checkbox: any[] = [];
  public all_Data: any[] = [];
  public company: any[] = [];
  public program: any[] = [];
  public type_of_attention: any[] = [];
  public contract: any[] = [];
  public briefcase: any[] = [];
  public admissions: any[] = [];
  public filter =
    {
      status_id: 0,
      eps_id: null,
      contract_id: null,
      initial_date: null,
      final_date: null,
      briefcase_id: null,
      patient_id: null,
      program_id: null,
      type_of_attention_id: null,
      id_number: null,
    }
  public parentData: any;
  public previewFile = null;
  public element;



  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('packagingTemplate', { read: TemplateRef }) packagingTemplate: TemplateRef<HTMLElement>;
  @ViewChild('packagingedit', { read: TemplateRef }) packagingedit: TemplateRef<HTMLElement>;
  @ViewChild('packagingView', { read: TemplateRef }) packagingView: TemplateRef<HTMLElement>;


  public selectedMode: boolean = true;

  constructor(
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    public companyS: CompanyService,
    public contractS: ContractService,
    private formBuilder: FormBuilder,
    private authStatusS: AuthStatusService,
    private authorizationS: AuthorizationService,
    private toastS: NbToastrService,
    // private renderer2: Renderer2,
    // private elementR: ElementRef,
    private windowService: NbWindowService,
    private authPackageS: AuthPackageService,
    private admissionS: AdmissionsService,
    private patientS: PatientService,
    private ContractS: ContractService,
    private briefcaseS: BriefcaseService,
    private ProgramS: ProgramService,
    private typeOfAttention: TypeOfAttentionService,

  ) {
  }

  public settings = {
    selectMode: 'multi',
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      semaphore: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionsSemaphoreComponent,
      },
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditAuthPackage.bind(this),
            'view': this.ViewPackage.bind(this),
            'delete': this.DeleteConfirmAuth.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      select: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // this.disableCheck();
          if (row.auth_status_id == 2 || row.auth_status_id == 3) {
            this.show = true;
          } else {
            this.show = false;
          }
          return {
            'data': row,
            'show': true,
            'select': this.auth_status,
            'status': (event, row: any) => this.SaveStatus(event, row),
          };
        },
        renderComponent: ActionsStatusComponent,
      },
      id: {
        title: this.headerFields[1],
        type: 'string',
      },
      date: {
        title: this.headerFields[11],
        type: 'string',
      },
      'patient_type': {
        title: 'Tipo de paciente',
        type: 'string',
        valuePrepareFunction(value, row) {
            return row?.admissions.location.at(-1).scope_of_attention.name ? row?.admissions.location.at(-1).scope_of_attention.name : 'N/A' 
        },
      },
      services_briefcase: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.fixed_add_id) {
            return row?.fixed_add.fixed_assets.fixed_nom_product.name + ' - ' + row.fixed_add.fixed_assets.fixed_clasification.name;
          } else {            
            return value?.manual_price.name;
          }
        },
      },
      auth_number: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value ? value : '--'
        },
      },
      assigned_management_plan: {
        title: this.headerFields[13],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value.execution_date != "0000-00-00" ? value.execution_date : '--';
          } else {
            return '--';
          }
        },
      },
      'type_of_attention': {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan) {
            return row.assigned_management_plan.management_plan.type_of_attention.name;
          } else {
            return '--';
          }
        },
      },
      'identification_type': {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.identification_type.name;
        },
      },
      'identification': {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.identification;
        },
      },
      nombre_completo: {
        title: this.headerFields[6],
        type: 'string',
      },
      'email': {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.email;
        },
      },
      'residence_municipality': {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence_municipality.name;
        },
      },
      'residence': {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence.name;
        },
      },
      residence_address: {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence_address;
        },
      },
      applications: {
        title: 'Hora de aplicación',
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.application_id != null){
            return row.applications.application_hour;
          } else {
            return '--';
          }
        },
      },
      assistencial_aplications: {
        title: 'Asistencial',
        type: 'string',
        valuePrepareFunction(value, row) {
          if(row.application_id != null){
            return row.applications.users.identification
          } else {
            return '--';
          }
        },
      },
    },
  };

  public routes = [
    {
      name: 'Autorizaciones',
      route: './',
    },
  ];


  public form: FormGroup;
  public formMassive: FormGroup;
  public xlsForm: FormGroup;
  public RadicationGlossForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;


  async ngOnInit() {

    this.parentData = {
      selectedOptions: [],
      entity: '',
      customData: '',
    };

    this.today = new Date();
    this.today = this.today.toISOString().split('T')[0];

    this.data = {
      status_id: 0,
      company_id: null,
      start_date: '',
      finish_date: '',
      state_gloss: '',
      briefcase_id: '',
      contract_id: '',
      program_id: '',
      type_of_attention_id: '',
      id_number: null,
    };

    this.form = this.formBuilder.group({
      status_id: [
        this.data.status_id,
      ],
      company_id: [
        this.data.company_id,
      ],
      start_date: [
        this.data.start_date,
      ],
      finish_date: [
        this.data.finish_date,
      ],
      briefcase_id: [
        this.data.briefcase_id,
      ],
      contract_id: [
        this.data.contract_id,
      ],
      type_of_attention_id: [
        this.data.type_of_attention_id,
      ],
      program_id: [
        this.data.program_id,
      ],
      id_number: [
        this.data.id_number,
      ],
    });

    this.formMassive = this.formBuilder.group({
      observation: [
        '',
        // Validators.compose([Validators.required]),
      ],
      auth_number: [
        '',
        Validators.compose([Validators.required]),
      ],
      copay: [
        null,
        // Validators.compose([Validators.required]),
      ],
      copay_value: [
        '',
      ],
      file_auth: [
        null,
        Validators.compose([Validators.required])
      ]
    })

    this.authStatusS.GetCollection().then(x => {
      this.auth_status = x;
      this.auth_statusM = x;
      this.auth_statusM.pop();
    });

    this.companyS.GetCollection().then(x => {
      this.company = x;
    });
    
    this.ProgramS.GetCollection().then(x => {
      this.program = x;
    });

    this.typeOfAttention.GetCollection().then(x => {
      this.type_of_attention = x;
    });
    
    this.xlsForm = this.formBuilder.group({
      state_gloss: [
        this.data.state_gloss,
        Validators.compose([Validators.required])
      ],
    });
    
    this.onChanges();
  }

  onUserRowSelect(select: any[]) {
    this.selectedOptions = [];
    var briefValidator = [];
    var admiValidator = [];
    select.forEach(element => {

      this.selectedOptions.push(element);
      briefValidator.push(element.services_briefcase.briefcase_id);
      admiValidator.push(element.admissions_id);
    });
    let result = briefValidator.filter((item, index) => {
      return briefValidator.indexOf(item) === index;
    })
    let result2 = admiValidator.filter((item, index) => {
      return admiValidator.indexOf(item) === index;
    })
    if (result.length == 1 && result2.length == 1) {
      this.briefcase_id = result[0];
      this.admissions_id = result2[0];
    } else {
      this.briefcase_id = null;
      this.admissions_id = null;
    }
  }

  RefreshData() {
    this.table.refresh();
  }

  reloadForm(tab) {

    if (tab.tabTitle == 'A tramitar') {
      this.showdiv = false;
    } else {
      this.showdiv = true;
    }

  }

  ConfirmActions(dialog: TemplateRef<any>) {
    if (this.selectedOptions.length > 0) {
      this.dialog = this.dialogFormService.open(dialog);
    } else {
      this.toastS.warning('', 'Debe seleccionar registros para autorizar masivamente')
    }
  }

  close() {
    this.dialog.close();
  }

  EditAuthPackage(data) {
    this.data_aux = [];
    if (data) {
      this.parentData.entity = 'authorization/auth_byAdmission/' + data.admissions_id + '?edit=true&id=' + data.id;
      this.parentData.customData = 'authorization'
    };
    this.data_aux = data;
    this.dialog = this.dialogFormService.open(this.packagingedit, {
    });
  }

  ViewPackage(data) {
    if (data) {
      this.parentData.entity = 'authorization/auth_byAdmission/' + data.admissions_id + '?view=true&id=' + data.id;
      this.parentData.customData = 'authorization'
    };

    this.dialog = this.dialogFormService.open(this.packagingView, {
    });
  }

  DeleteConfirmAuth(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAuth.bind(this),
      },
    });
  }

  DeleteAuth(data) {
    return this.authPackageS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  onAmountChange(input, row) {

    if (input.target.value != '') {
      this.authorizationS.Update({
        id: row.id,
        auth_number: input.target.value,
      }).then(x => {
        this.toastS.success('', x.message);
        this.RefreshData();
      }).catch(x => {

      });
    }

  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  FilterProgram(event){
    if(event === ""){
      this.filter.type_of_attention_id = null;
    } else {
      this.filter.type_of_attention_id = event;
    }
    this.FilterAuth();
  }

  FilterAuth() {
    // this.disableCheck();
    this.table.changeEntity(`authorization/byStatus/0?pagination=false&status_id=${this.filter.status_id}&eps_id=${this.filter.eps_id}&contract_id=${this.filter.contract_id}&briefcase_id=${this.filter.briefcase_id}&program_id=${this.filter.program_id}&initial_date=${this.filter.initial_date}&final_date=${this.filter.final_date}&type_of_attention_id=${this.filter.type_of_attention_id}&number_id=${this.filter.id_number}`, 'authorization');
  }

  FilterStatus(status) {
    this.status = status;
    this.table.changeEntity(`authorization/byStatus/${this.status}`, 'authorization');
    this.entity = this.table.entity
    this.form.patchValue({
      company_id: null,
      start_date: null,
      finish_date: '',
      state_gloss: '',
      briefcase_id: '',
      contract_id: '',
      type_of_attention_id: '',
    });
    // document.getElementById('type_of').
  }

  ConfirmAction(data, Managemen?, type?) {
    var closeOnBackdropClick = false;
    this.dialogFormService.open(FormObservationComponent, {
      closeOnBackdropClick,
      context: {
        data: data,
        Managemen: Managemen,
        title: type == 4 ? 'OBSERVACIÓN MOTIVO DE CANCELACIÓN' : type == 6 ? 'OBSERVACIÓN EMITIDA ERRADA' : 'AUTORIZAR',
        auth_status: type,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  packagingProcess() {
    if (this.selectedOptions.length < 1) {
      this.toastS.warning('', 'Debe seleccionar al menos 1 autorización de procedimientos');
    } else {
      if (this.briefcase_id) {
        this.dialog = this.dialogFormService.open(AuthPackageComponent, {
          context: {
            briefcase_id: this.briefcase_id,
            title: "Organizar paquete para " + this.selectedOptions[0].nombre_completo,
            saved: this.ClosePackage.bind(this),
            selectedOptions: this.selectedOptions,
            admissions_id: this.admissions_id
          },
        });
      } else {
        this.toastS.warning('Dentro de la selección hay un elemento invalido', 'Selección invalida')
      }
    }

  }



  ClosePackage() {
    this.element = document.getElementsByTagName("nb-windows-container");
    if(this.element.length > 0)
    {
      this.element[0].remove();
    }
    this.dialog.close();
    this.dialog = null;
    this.RefreshData();
  }

  authMassive() {
    // this.disableCheck();
    // this.dialogFormService.open(this.packagingTemplate);
    // this.GetResponseParam();
    this.dialog = this.windowService.open(this.packagingTemplate, {
      hasBackdrop: false,
      closeOnEsc: false,
      context: {
      }
    });

  }

  SaveStatus(event?, data?) {

    if (event == 3) {
      this.ConfirmAction(data, data.assigned_management_plan, event);
    }
    else if (event == data.auth_status_id) {

    } else {
      switch (event) {
        case 1: {
          this.authorizationS.Update({
            id: data.id,
            auth_status_id: event
          }).then(x => {
            this.toastS.success('', x.message);
            this.RefreshData();
          }).catch()
          break;
        }
        case 2: {
          this.authorizationS.Update({
            id: data.id,
            auth_status_id: event
          }).then(x => {
            this.toastS.success('', x.message);
            this.RefreshData();
          }).catch()
          break;
        }
        case 4: {
          this.ConfirmAction(data, null, event);
          break;
        }
        case 5: {
          this.authorizationS.Update({
            id: data.id,
            auth_status_id: event
          }).then(x => {
            this.toastS.success('', x.message);
            this.RefreshData();
          }).catch()
          break;
        }
        case 6: {
          this.ConfirmAction(data, null, event);
          break;
        }
      }
    }

  }

  GetDataSelect(select: any[]) {
    this.selectedOptions = [];
    select.forEach(element => {
      var gloss = element;
      this.selectedOptions.push(gloss.id);

    });

  }

  onChanges() {

    this.form.get('finish_date').valueChanges.subscribe(val => {
      this.filter.final_date = val;
      this.FilterAuth();
    });

    this.form.get('company_id').valueChanges.subscribe(val => {
      this.filter.eps_id = val;
      if (val == '') {
        this.contract = [];
        this.form.patchValue({
          contract_id: ''
        });
      } else {
        this.ContractS.GetCollection({ company_id: val }).then(x => {
          this.contract = x;
        });
      }
      this.FilterAuth();
    });

    this.form.get('contract_id').valueChanges.subscribe(val => {
      this.filter.contract_id = val;
      if (val === '') {
        this.briefcase = [];
      } else {
        this.briefcaseS.GetBriefcaseByContract(val).then(x => {
          this.briefcase = x;
        });
      }
      this.form.patchValue({
        briefcase_id: '',
      });
      this.FilterAuth();
    });

    this.form.get('start_date').valueChanges.subscribe(val => {
      this.min_day = val;
      this.filter.initial_date = val;
      this.FilterAuth();
    });

    this.form.get('finish_date').valueChanges.subscribe(val => {
      this.filter.final_date = val;
      this.FilterAuth();
    });

    this.form.get('briefcase_id').valueChanges.subscribe(val => {
      this.filter.briefcase_id = val;
      if (val === '') {
        this.briefcase = [];
      } else {
        this.admissionS.GetByBriefcase(val).then(x => {
          this.admissions = x;
        });
      }
      this.FilterAuth();
    });

    this.form.get('program_id').valueChanges.subscribe(val => {
      this.filter.program_id = val;
      this.FilterAuth();
    });

    this.form.get('id_number').valueChanges.subscribe(val => {
      this.filter.id_number = val;
      this.FilterAuth();
    });

    this.form.get('status_id').valueChanges.subscribe(val => {
      this.filter.status_id = val;
      this.FilterAuth();
    });

    this.form.get('type_of_attention_id').valueChanges.subscribe(val => {
      this.filter.type_of_attention_id = val;
      this.FilterAuth();
    });

  }

  save() {

    this.isSubmitted = true;
    if (!this.selectedOptions.length) {
      this.toastS.danger(null, 'Debe seleccionar al menos un procedimiento');
    } else {
      if (!this.form.invalid) {
        this.loading = true;
        if (this.data_aux.id) {
          this.authPackageS.Update({
            id: this.data_aux.id,
            auth_array: JSON.stringify(this.selectedOptions),
          }).then(x => {
            this.toastS.success('', x.message);
            this.dialog.close();
            if (this.saved) {
              this.saved();
            }
            this.data_aux = [];
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        }
      }
    }
  }

  async saveGroup() {

    this.isSubmitted = true;
    if (!this.formMassive.invalid) {
      if (this.selectedOptions.length > 0) {
        this.loading = true;

        var formData = new FormData();
        var data = this.formMassive.controls;
        formData.append('auth_number', data.auth_number.value);
        formData.append('observation', data.observation.value);
        formData.append('copay', data.copay.value);
        formData.append('copay_value', data.copay_value.value);
        formData.append('authorizations', JSON.stringify(this.selectedOptions));
        formData.append('file_auth', this.formMassive.value.file_auth);
        try {
          let response;
          if (this.data?.id) {
            // response = await this.authorizationS.Update(formData, this.data.id);
          } else {
            response = await this.authorizationS.SaveGroup(formData, 1);
          }
          this.toastS.success('', response.message);
          this.messageError = null;
          this.isSubmitted = false;
          this.loading = false;
          this.close();
          this.RefreshData();
          this.formMassive.patchValue({
            observation: '',
            auth_number: '',
            copay: null,
            copay_value: '',
            file_auth: null,
          });
          this.isSubmitted = false;
        } catch (response) {
          this.messageError = response;
          this.isSubmitted = false;
          this.loading = false;
          throw new Error(response);
        }
      } else {
        this.toastS.warning('', "Debe seleccionar almenos un registro");
      }
    } else {
      this.toastS.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.formMassive.patchValue({
          file_auth: files[0],
        });
        break;
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}

