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

@Component({
  selector: 'ngx-authorization-list',
  templateUrl: './authorization-list.component.html',
  styleUrls: ['./authorization-list.component.scss'],
})
export class AuthorizationListComponent implements OnInit {


  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'AUTORIZACIONES: PENDIENTES';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Providencia, Vereda o Municipio', 'Barrio', 'Dirección', 'Consecutivo de ingreso', 'Ambito', 'Programa', 'Sede', 'Estado', 'Procedimiento', 'Número de autorización', 'Fecha de creación'];
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
  public company: any[] = []
  public contract: any[] = []
  public filter =
    {
      eps_id: null,
      initial_date: null,
      final_date: null,
    }
  public parentData: any;



  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('packagingTemplate', { read: TemplateRef }) packagingTemplate: TemplateRef<HTMLElement>;
  @ViewChild('packagingedit', { read: TemplateRef }) packagingedit: TemplateRef<HTMLElement>;


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
  ) {
  }

  // disableCheck() {
  //   this.all_Data = [];
  //   this.checkbox = this.elementR.nativeElement.querySelectorAll(
  //     'input[type=checkbox]'
  //   );

  //   this.checkbox.forEach((element, index) => {
  //     let aux;
  //     /* disable the select all checkbox */
  //     if (index > 0) {
  //       // this.all_Data.push(element);
  //       aux = Object.assign({ auth_id: this.table.source.data[index - 1].id }, { indice: index });
  //       this.all_Data.push(aux);
  //       if (this.table.source.data[index - 1].assigned_management_plan.execution_date != "0000-00-00") {
  //         this.renderer2.setAttribute(element, 'disabled', 'true');
  //       }

  //     }

  //     /* disable the checkbox if set column is false */
  //     // if (index > 1 ) {
  //     //   this.renderer2.setAttribute(element, 'disabled', 'true');
  //     // }
  //   });
  // }

  // ngAfterViewInit() {
  //   this.disableCheck();  
  // }
  public settings = {
    // pager: {
    //   display: true,
    //   perPage: 10,
    // },
    selectMode: 'multi',
    columns: {
      // actions: {
      //   title: 'Acciones',
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     // DATA FROM HERE GOES TO renderComponent
      //     return {
      //       'data': row,
      //       'edit': this.EditPadComplementary.bind(this),
      //       'delete': this.DeleteConfirmPadComplementary.bind(this),
      //       'confirm': this.ConfirmAction.bind(this),
      //       'refresh': this.RefreshData.bind(this),
      //       'currentRole': this.currentRole,
      //     };
      //   },
      //   renderComponent: Actions2Component,
      // },
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditAdmissions.bind(this),
            'view': this.ViewPackage.bind(this),
            'delete': this.DeleteConfirmAuth.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      select: {
        title: this.headerFields[11],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // this.disableCheck();
          if (row.auth_status_id == 2) {
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
      services_briefcase: {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.manual_price.name;
        },
      },
      auth_number: {
        title: this.headerFields[13],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'enabled': this.show ? false : true,
            'amount': '',
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          }
        },
        renderComponent: ActionsAuthNumberComponent,
      },
      identification_type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
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
      residence_municipality: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence_address: {
        title: this.headerFields[6],
        type: 'string',
      },
      date: {
        title: this.headerFields[14],
        type: 'string',
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
      company_id: null,
      start_date: '',
      finish_date: '',
      state_gloss: '',
    };

    this.form = this.formBuilder.group({
      company_id: [
        this.data.company_id,
      ],
      start_date: [
        this.data.start_date,
      ],
      finish_date: [
        this.data.finish_date,
      ],
    });

    await this.authStatusS.GetCollection().then(x => {
      this.auth_status = x;
      this.auth_statusM = x;
      this.auth_statusM.pop();
    });

    await this.companyS.GetCollection().then(x => {
      this.company = x;
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

  EditAdmissions(data) {
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

    this.dialogFormService.open(AuthAsociatedPackageComponent, {
      context: {
        title: 'Ver',
        data,
        show: true,
        parentData: this.parentData,
      },
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

  FilterAuth() {
    // this.disableCheck();
    var entity = this.entity
    this.table.changeEntity(`${entity}?eps_id=${this.filter.eps_id}&initial_date=${this.filter.initial_date}&final_date=${this.filter.final_date}`, 'authorization');
  }

  FilterStatus(status) {
    this.status = status;
    this.table.changeEntity(`authorization/byStatus/${this.status}`, 'authorization');
    this.entity = this.table.entity
    // this.RefreshData();

  }

  ConfirmAction(data, Managemen?) {
    var closeOnBackdropClick = false;
    this.dialogFormService.open(FormObservationComponent, {
      closeOnBackdropClick,
      context: {
        data: data,
        Managemen: Managemen,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  packagingProcess() {

    if (this.selectedOptions.length < 1) {
      this.toastS.warning('', 'Debe seleccionar al menos 1 autorización de procedimientos');
    } else {
      if (this.briefcase_id) {
        this.dialogFormService.open(AuthPackageComponent, {
          context: {
            briefcase_id: this.briefcase_id,
            title: "Organizar paquete para " + this.selectedOptions[0].nombre_completo,
            saved: this.RefreshData.bind(this),
            selectedOptions: this.selectedOptions,
            admissions_id: this.admissions_id
          },
        });
      } else {
        this.toastS.warning('Dentro de la selección hay un elemento invalido', 'Selección invalida')
      }
    }

  }


  authMassive() {
    // this.disableCheck();
    // this.dialogFormService.open(this.packagingTemplate);
    // this.GetResponseParam();
    this.windowService.open(this.packagingTemplate, {
      hasBackdrop: false,
      closeOnEsc: false,
      context: {
      }
    });

  }

  SaveStatus(event?, data?) {

    if (event == data.auth_status_id) {

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
        case 3: {
          if (data.assigned_management_plan) {
            this.ConfirmAction(data, data.assigned_management_plan);
          } else {
            this.authorizationS.Update({
              id: data.id,
              auth_status_id: event
            }).then(x => {
              this.toastS.success('', x.message);
              this.RefreshData();
            }).catch()
          }
          break;
        }
        default: {
          this.ConfirmAction(data);

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
    this.form.get('company_id').valueChanges.subscribe(val => {
      this.filter.eps_id = val;
    });

    this.form.get('start_date').valueChanges.subscribe(val => {
      this.min_day = val;
      this.filter.initial_date = val;
    });

    this.form.get('finish_date').valueChanges.subscribe(val => {
      this.filter.final_date = val;
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
}
