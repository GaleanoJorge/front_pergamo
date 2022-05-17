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
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Ciudad', 'Barrio', 'Dirección', 'Consecutivo de ingreso', 'ambito', 'Programa', 'Sede', 'Estado', 'Procedimiento', 'Número de autorización', 'Cantidad autorizada'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public entity: string = 'authorization/byStatus/0';
  public data: any = [];
  public auth_status;
  public auth_statusM: any[] = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];
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



  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('packagingTemplate', { read: TemplateRef }) packagingTemplate: TemplateRef<HTMLElement>;


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
      management_plan: {
        title: this.headerFields[14],
        type: 'string',
        valuePrepareFunction(value) {
          if (value.length > 0) {
            return value[0]?.quantity
          } else {
            return '--';
          }
        },
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
    select.forEach(element => {
      var auth = element;
      this.selectedOptions.push(auth);
    });
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

  FilterAuth() {
    // this.disableCheck();
    if (!this.filter.eps_id && !this.filter.final_date && !this.filter.final_date) {
      this.title = 'AUTORIZACIONES: PENDIENTES';
      this.table.changeEntity(`${this.entity}`, 'authorization')
    } else {
      var localidentify = this.company.find(item => item.id == this.filter.eps_id)
      this.title = 'AUTORIZACIONES: PENDIENTES DE ' + localidentify.name;
      var entity = this.entity
      this.table.changeEntity(`${entity}?eps_id=${this.filter.eps_id}&initial_date=${this.filter.initial_date}&final_date=${this.filter.final_date}`, 'authorization')
    };


    // switch () {
    //   //por EPS
    //   case 1: {
    //     if (search) {
    //       var localidentify = this.company.find(item => item.id == search)
    //       this.title = 'AUTORIZACIONES: PENDIENTES DE ' + localidentify.name;
    //       var entity = this.entity
    //       this.table.changeEntity(`${entity}?eps_id=${this.filter.eps_id}&initial_date=${this.filter.initial_date}&final_date=${this.filter.final_date}`, 'authorization')
    //       // this.authorizationS.GetInProcess({eps_id: search}).then(x => {
    //       //   this.table.source.data = x;
    //       // });
    //       // this.table.refresh();
    //     } else {
    //       this.title = 'AUTORIZACIONES: PENDIENTES';
    //       this.table.changeEntity(`${this.entity}`, 'authorization')

    //     }
    //     break;
    //   }
    // }
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
    // this.disableCheck();
    // this.dialogFormService.open(dialog);
    // this.GetResponseParam();
    // this.windowService.open(AuthPackageComponent, {
    //   hasBackdrop: false,
    //   closeOnEsc: false,
    //   context: {
    //     data: data
    //   }
    // });
    if (this.form.controls.company_id.value) {
      let eps_id = this.form.controls.company_id.value;
      var localidentify = this.company.find(item => item.id == eps_id);
      this.dialogFormService.open(AuthPackageComponent, {
        context: {
          eps_id: eps_id,
          title: "Organizar paquete de: " + localidentify.name,
          saved: this.RefreshData.bind(this),

        },
      });
    } else {
      this.toastS.warning('Debe seleccionar una eps', 'Acción invalida')

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
    // if(this.form.controls.company_id.value){
    //   let eps_id = this.form.controls.company_id.value;
    //   var localidentify = this.company.find(item => item.id == eps_id);
    //   this.dialogFormService.open(AuthPackageComponent, {
    //     context: {
    //       data: data,
    //       eps_id: eps_id,
    //       title: "Organizar paquete de: " + localidentify.name,
    //     },
    //   });
    // } else {
    //   this.toastS.warning('Debe seleccionar una eps','Acción invalida')

    // }

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
          if (data.management_plan) {
            this.ConfirmAction(data, 1);
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

  GetResponseParam(company_id?) {
    this.companyS.GetCollection().then(x => {
      this.company = x;
    });

    if (company_id) {
      this.contractS.GetByCompany({ company_id: company_id }).then(x => {
        this.contract = x
      })
    }

  }

  onChanges() {
    this.form.get('company_id').valueChanges.subscribe(val => {
      this.filter.eps_id = val;
    });

    this.form.get('start_date').valueChanges.subscribe(val => {
      this.filter.initial_date = val;
    });

    this.form.get('finish_date').valueChanges.subscribe(val => {
      this.filter.final_date = val;
    });

  }

}

