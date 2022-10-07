import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { ActionsPadProcedureComponent } from './actions-pad-procedure.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SelectServiceBillingComponent } from './select-service-billing.component';
import { FormBillingPadComponent } from './form-billing-pad/form-billing-pad.component';
import { BillingPadService } from '../../../business-controller/billing-pad.service';
import { AuthService } from '../../../services/auth.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-billing-pad-procedure',
  templateUrl: './billing-pad-procedure.component.html',
  styleUrls: ['./billing-pad-procedure.component.scss'],
})
export class BillingPadProcedureComponent implements OnInit {
  @Input() adm: any = null;
  @Input() bill: any = null;


  public isSubmitted = false;
  public loading: boolean = false;
  public show_info: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = null;
  public subtitle: string = 'Gestión';
  public patient_name: string = '';
  public headerFields: any[] = ['ACCIONES', 'PROCEDIMIENTO', 'VALOR', 'EPS', 'FECHA DE EJECUCIÓN', 'AUTORIZADO', 'FACTURA', 'VERIFICADO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public user;
  public user_data;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];

  public form: FormGroup;
  public ResponseGlossForm: FormGroup;
  public RadicationGlossForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;
  public billing: any = null;
  public total_pre_billing: number = 0;
  public total_already_billing: number = 0;
  public total_pendding_billing: number = 0;
  public total_pendding_auth: number = 0;
  public total_billing: number = 0;
  public count_billing: number = 0;
  public admission_id;
  public billing_id;
  public user_id;
  public settings;
  public entity: string = '';



  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  // @ViewChild('prebilling', { read: TemplateRef }) prebilling: TemplateRef<HTMLElement>;

  public settings1 = {
    selectMode: 'multi',
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      // select: {
      //   title: 'SELECCIÓN',
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     return {
      //       'data': row,
      //       'selection': (event, row: any) => this.eventSelections(event, row),
      //     };
      //   },
      //   renderComponent: SelectServiceBillingComponent,
      // },
      actions: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'route': 1,
            'show': this.ShowPackageContent.bind(this),
          };
        },
        renderComponent: ActionsPadProcedureComponent,
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.services_briefcase.manual_price.name;
        },
      },
      value: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          var q = 1;
          if (row.location_id) {
            var a = +(new Date(row.created_at).getFullYear() + '' + (new Date(row.created_at).getMonth() < 10 ? '0' + new Date(row.created_at).getMonth() : new Date(row.created_at).getMonth()) + '' + (new Date(row.created_at).getDate() < 10 ? '0' + new Date(row.created_at).getDate() : new Date(row.created_at).getDate()));
            var b = +(new Date().getFullYear() + '' + (new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()) + '' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()));
            var diff = Math.abs(b - a) + 1;
            row.quantity = diff;
          }
          if (row.quantity) {
            q = row.quantity;
          }
          this.total_billing += (row.services_briefcase.value * q);
          return this.currency.transform((row.services_briefcase.value * q));
        },
      },
      assigned_management_plan_id: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan != null) {
            if (row.assigned_management_plan.execution_date != "0000-00-00 00:00:00") {
              return this.datePipe.transform3(row.assigned_management_plan.execution_date);
            } else {
              return 'Sin ejecutar';
            }
          } else {
            return '';
          }
        }
      },
    },
  };

  public settings2 = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'route': 2,
            'show': this.ShowPackageContent.bind(this),
          };
        },
        renderComponent: ActionsPadProcedureComponent,
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.services_briefcase.manual_price.name;
        },
      },
      value: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          var q = 1;
          if (row.location_id) {
            var a = +(new Date(row.created_at).getFullYear() + '' + (new Date(row.created_at).getMonth() < 10 ? '0' + new Date(row.created_at).getMonth() : new Date(row.created_at).getMonth()) + '' + (new Date(row.created_at).getDate() < 10 ? '0' + new Date(row.created_at).getDate() : new Date(row.created_at).getDate()));
            var b = +(new Date().getFullYear() + '' + (new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()) + '' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()));
            var diff = Math.abs(b - a) + 1;
            row.quantity = diff;
          }
          if (row.quantity) {
            q = row.quantity;
          }
          this.total_pre_billing += (row.services_briefcase.value * q);
          if (row.billing_pad_status == 'FACTURADA') {
            this.total_already_billing += (row.services_briefcase.value * q);
          }
          if (row.assigned_management_plan != null) {
            if (row.auth_status_id != 3 || row.assigned_management_plan.approved == 0) {
              this.total_pendding_auth += (row.services_briefcase.value * q);
            }
            if (row.billing_pad_status != 'FACTURADA' && row.auth_status_id == 3 &&
              row.assigned_management_plan.execution_date != "0000-00-00 00:00:00"
              && row.assigned_management_plan.approved == 1) {
              this.total_pendding_billing += (row.services_briefcase.value * q);
            }
          } else {
            if (row.auth_status_id != 3) {
              this.total_pendding_auth += (row.services_briefcase.value * q);
            }
            if (row.billing_pad_status != 'FACTURADA' && row.auth_status_id == 3) {
              this.total_pendding_billing += (row.services_briefcase.value * q);
            }
          }
          return this.currency.transform((row.services_briefcase.value * q));
        },
      },
      assigned_management_plan_id: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan != null) {
            if (row.assigned_management_plan.execution_date != "0000-00-00 00:00:00") {
              return this.datePipe.transform3(row.assigned_management_plan.execution_date);
            } else {
              return 'Sin ejecutar';
            }
          } else {
            return '';
          }

        }
      },
      auth_status_id: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value == 3) {
            return 'Autorizado';
          } else {
            return 'Sin autorizar';
          }
        }
      },
      assigned_management_plan: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan != null) {
            if (row.assigned_management_plan.approved == 1) {
              return 'Aprobado';
            } else {
              return 'Sin aprobar';
            }
          } else {
            return '';
          }

        }
      },
      billing_consecutive: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value;
        }
      },
    },
  };

  public routes = null;

  constructor(
    private route: ActivatedRoute,
    public currency: CurrencyPipe,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastS: NbToastrService,
    private BillingPadS: BillingPadService,
    private authService: AuthService,
    public datePipe: DateFormatPipe,
    private location: Location,
  ) {
  }




  async ngOnInit() {
    if (this.adm == null) {
      this.routes = [
        {
          name: 'Procedimientos',
          route: './',
        },
      ];
      this.title = 'POR FACTURAR DE';
      this.settings = this.settings1
      this.admission_id = this.route.snapshot.params.admission_id;
      this.billing_id = this.route.snapshot.params.billing_id;
      this.entity = 'billing_pad/getAuthorizedProcedures/' + this.admission_id + '?billing_id=' + this.billing_id + '&bill=' + true;
    } else {
      this.title = 'PREFACTURA DE';
      this.settings = this.settings2
      this.admission_id = this.adm;
      this.billing_id = this.bill;
      this.entity = 'billing_pad/getPreBillingProcedures/' + this.admission_id + '?billing_id=' + this.billing_id;
    }
    this.user_data = this.authService.GetUser();
    this.user_id = this.user_data.id;

    this.BillingPadS.GetCollection({ id: this.billing_id }).then(x => {
      if (x != null) {
        this.user = x[0]['admissions']['patients'];
        this.billing = x[0];
        this.patient_name =
          (x[0]['admissions']['patients']['firstname'] != null ? ' ' + x[0]['admissions']['patients']['firstname'] : '') +
          (x[0]['admissions']['patients']['middlefirstname'] != null ? ' ' + x[0]['admissions']['patients']['middlefirstname'] : '') +
          (x[0]['admissions']['patients']['lastname'] != null ? ' ' + x[0]['admissions']['patients']['lastname'] : '') +
          (x[0]['admissions']['patients']['middlelastname'] != null ? ' ' + x[0]['admissions']['patients']['middlelastname'] : '')
          ;
        this.show_info = true;
      }
    });
  }


  RefreshData() {
    this.total_billing = 0;
    this.count_billing = 0;
    this.table.refresh();
  }

  ConfirmAction(data, Managemen?) {
    // var closeOnBackdropClick = false;
    // this.dialogFormService.open(FormObservationComponent, {
    //   closeOnBackdropClick,
    //   context: {
    //     data: data,
    //     Managemen: Managemen,
    //     saved: this.RefreshData.bind(this),
    //   },
    // });
  }

  ShowPreBilling(dialog: TemplateRef<any>) {
    this.total_pre_billing = 0;
    this.total_already_billing = 0;
    this.total_pendding_billing = 0;
    this.total_pendding_auth = 0;
    this.dialog = this.dialogFormService.open(dialog);
  }

  closeDialog() {
    this.dialog.close();
  }

  ShowPackageContent(data, route) {
    this.dialogFormService.open(FormBillingPadComponent, {
      context: {
        title: 'Contenido de Paquete',
        data: data,
        route: route,
        billing_id: this.billing_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  eventSelections(row) {
    this.selectedOptions = [];
    row.forEach(element => {
      var q = 1;
      if (element.quantity) {
        q = element.quantity;
      }
      var add = {
        id: element.id,
        quantity: q,
        location_id: element.location_id,
        created_at: element.created_at,
        location: element.location_id ? {
          entry_date: element.location.entry_date,
          discharge_date: element.location.discharge_date,
        } : null,
        services_briefcase: {
          value: (element.services_briefcase.value * q),
          manual_price: {
            homologous_id: element.services_briefcase.manual_price.homologous_id,
            name: element.services_briefcase.manual_price.name,
          },
        },
        supplies_com: element.supplies_com != undefined ? {
          code_cum: element.supplies_com.code_cum,
        } : null,
        product_com: element.product_com != undefined ? {
          code_cum: element.product_com.code_cum,
        } : null,
        fixed_add_id: element.fixed_add_id != undefined ? {
          code_cum: element.fixed_add_id.observation,
        } : null,
        assigned_management_plan: element.assigned_management_plan != undefined ? {
          execution_date: element.assigned_management_plan.execution_date,
          user: {
            firstname: element.assigned_management_plan.user.firstname,
            lastname: element.assigned_management_plan.user.lastname,
          },
        } : null,
      }
      this.selectedOptions.push(add);
    });

  }

  goBack() {
    this.location.back();
  }

  SaveBilling() {
    if (this.selectedOptions.length > 0) {
      this.loading = true;
      this.isSubmitted = true;
      this.messageError = null;
      this.BillingPadS.Update({
        id: this.billing_id,
        authorizations: JSON.stringify(this.selectedOptions),
        user_id: this.user_id,
      }).then(x => {
        this.loading = false;
        this.closeDialog();
        this.goBack();
        this.toastS.success('', x.message);
        this.selectedOptions = [];
        this.RefreshData();
      }).catch(x => {
        this.loading = false;
        this.messageError = x;
      });
    } else {
      this.toastS.warning('Seleccione al menos un procedimiento', 'Aviso');
    }

  }



  generatePdf() {
    this.BillingPadS.GeneratePdf({
      id: this.billing_id,
      billing_type: 'PREFACTURA',
      selected_procedures: JSON.stringify(this.selectedOptions)
    }).then(x => {
      this.toastS.success('Archivo generado con exito', 'Exito');
      window.open(x['url'], '_blank');
    }).catch(x => {
      this.toastS.danger('Error al generar archivo: ' + x, 'Error');
    });
  }




}
