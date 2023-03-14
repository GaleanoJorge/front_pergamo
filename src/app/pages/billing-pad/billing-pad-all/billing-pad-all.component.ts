import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionsStatusAllComponent } from './actions-status-all.component';
import { BillingPadService } from '../../../business-controller/billing-pad.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { CurrencyPipe } from '@angular/common';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../../services/auth.service';
import { ActionsSemaphoreAllComponent } from './actions-semaphore-all.component';
import { CompanyService } from '../../../business-controller/company.service';

@Component({
  selector: 'ngx-billing-pad-all',
  templateUrl: './billing-pad-all.component.html',
  styleUrls: ['./billing-pad-all.component.scss'],
})
export class BillingPadAllComponent implements OnInit {


  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'FACTURAS EXISTENTES';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
    /*00*/'MES', 
    /*01*/'VALOR', 
    /*02*/'ESTADO', 
    /*03*/'NÚMERO DE FACTURA', 
    /*04*/'FACTURA REFERENCIA',
    /*05*/'FECHA FACTURACIÓN',
    /*06*/'FACTURADOR',
    /*07*/'CONTRATO',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;
  public entity;
  public role_permisos = [];
  public company: any[] = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;


  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      semaphore: {
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
          };
        },
        renderComponent: ActionsSemaphoreAllComponent,
      },
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'role_permisos': this.role_permisos,
            'show': this.ShowBillingAdmission.bind(this),
            'show_mu': this.ShowBillingMu.bind(this),
            'resend': this.resend.bind(this),
            'cancel': this.DeleteConfirmCompany.bind(this),
            'cancel_pgp': this.DeleteConfirmCompanyPgp.bind(this),
            // 'delete': this.DeleteConfirmBillingAdmission.bind(this),
          };
        },
        renderComponent: ActionsStatusAllComponent,
      },
      consecutive: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_pad_consecutive != null) {
            return row.billing_pad_prefix.name + row.consecutive;
          } else {
            return '-';
          }
        }
      },
      month: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.getMonthPretty(row.created_at);
        }
      },
      value: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(row.total_value);
        }
      },
      status: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing_pad_status.name;
        }
      },
      facturation_date: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value;
        }
      },
      its_credit_note: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.its_credit_note != null) {
            return row.its_credit_note.billing_pad_prefix.name + row.its_credit_note.consecutive;
          } else if (row.billing_pad_mu != null) {
            return row.billing_pad_mu.billing_pad_prefix.name + row.billing_pad_mu.consecutive;
          } else {
            return '--';
          }
        }
      },
      facturator: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.nombre_completo) {
            return row.nombre_completo;
          } else {
            return '--';
          }
        }
      },
      contract_name: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.contract_name) {
            return row.contract_name;
          } else {
            return '--';
          }
        }
      },
    },
  };

  public routes = [
    {
      name: 'Autorizaciones',
      route: './',
    },
  ];

  constructor(
    public datePipe: DateFormatPipe,
    private currency: CurrencyPipe,
    private BillingPadS: BillingPadService,
    private toastrService: NbToastrService,
    private deleteConfirmService: NbDialogService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private CompanyS: CompanyService,
  ) {
  }
  public form: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;




  async ngOnInit() {
    

    var permisos = JSON.parse(localStorage.getItem('permissions'));
    permisos.forEach(x => {
      if (x.item_id == 267) {
        this.role_permisos.push(x.permission_id);
      }
    });

    this.CompanyS.GetCollection({
      eps: true
    }).then(x => {
      this.company = x;
    });

    var b = new Date().getFullYear() + '-' + (+((new Date().getMonth() + 1)) >= 10 ? (new Date().getMonth() + 1) : ('0'+(new Date().getMonth() + 1))) + '-' + ('01');
    var c = new Date().getFullYear() + '-' + (+((new Date().getMonth() + 1)) >= 10 ? (new Date().getMonth() + 1) : ('0'+(new Date().getMonth() + 1))) + '-' + (new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate());

    this.form = this.formBuilder.group({
      company_id: ['', []],
      start_date: [b, []],
      finish_date: [c, []],
    });

    this.entity = 'billing_pad/getAllBillings/0' + '?' +
    'start_date=' + this.form.controls.start_date.value + 
    '&finish_date=' + this.form.controls.finish_date.value + 
    '&company_id=' + this.form.controls.company_id.value;

    this.form.get('company_id').valueChanges.subscribe(val => {
      this.changeEntity();
    });
    this.form.get('start_date').valueChanges.subscribe(val => {
      this.changeEntity();
    });
    this.form.get('finish_date').valueChanges.subscribe(val => {
      this.changeEntity();
    });
  }

  changeEntity() {
    this.table.changeEntity('billing_pad/getAllBillings/0' + '?' +
    'start_date=' + this.form.controls.start_date.value + 
    '&finish_date=' + this.form.controls.finish_date.value + 
    '&company_id=' + this.form.controls.company_id.value, 'billing_pad')
  }

  RefreshData() {
    this.table.refresh();
  }

  ShowBillingAdmission(data) {
    this.BillingPadS.GeneratePdf({
      id: data.id,
      billing_type: 'FACTURA',
      billing_id: data.id,
      show: true,
      admission_id: data.admissions_id
    }).then(x => {
      this.toastrService.success('Archivo generado con exito', 'Exito');
      window.open(x['url'], '_blank');
    }).catch(x => {
      this.toastrService.danger('Error al generar archivo: ' + x, 'Error');
    });
  }

  ShowBillingMu(data) {
    this.BillingPadS.GeneratePdfMu({
      id: data.id,
      billing_type: 'FACTURA',
      billing_id: data.id,
      show: true,
    }).then(x => {
      this.toastrService.success('Archivo generado con exito', 'Exito');
      window.open(x['url'], '_blank');
    }).catch(x => {
      this.toastrService.danger('Error al generar archivo: ' + x, 'Error');
    });
  }

  resend(billing_type, data) {
    this.BillingPadS.GenerateFile(billing_type, data.id).then(x => {
      this.toastrService.success('Archivo plano .Dat reenviado exitosamente', 'Exito');
    }).catch(x => {
      this.toastrService.danger('Error al enviar archivo: ' + x, 'Error');
    });
  }

  DeleteConfirmCompany(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        title: 'Cancelar factura',
        textConfirm: 'Cancelar',
        name: data.billing_pad_prefix.name + data.consecutive,
        data: data,
        delete: this.cancelBilling.bind(this),
      },
    });
  }

  cancelBilling(data) {
    return this.BillingPadS.CancelBillingNoPgp({
      id: data.id,
      user_id: this.authService.GetUser().id,
    }).then(x => {
      this.RefreshData();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw ('Error al cancelar la factura: ' + x);
    });
  }

  DeleteConfirmCompanyPgp(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        title: 'Cancelar factura',
        textConfirm: 'Cancelar',
        name: data.billing_pad_prefix.name + data.consecutive,
        data: data,
        delete: this.cancelBillingPgp.bind(this),
      },
    });
  }

  cancelBillingPgp(data) {
    return this.BillingPadS.CancelBillingPgp({
      id: data.id,
      user_id : this.authService.GetUser().id,
    }).then(x => {
      this.RefreshData();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw ('Error al cancelar la factura: ' + x);
    });
  }

}
