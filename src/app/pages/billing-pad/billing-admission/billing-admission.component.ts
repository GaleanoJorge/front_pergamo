import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsBillingComponent } from './actions-billing.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActivatedRoute } from '@angular/router';
import { FormShowBillingPadComponent } from './form-show-billing-pad/form-show-billing-pad.component';
import { CurrencyPipe } from '@angular/common';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { BillingPadService } from '../../../business-controller/billing-pad.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-billing-admission',
  templateUrl: './billing-admission.component.html',
  styleUrls: ['./billing-admission.component.scss']
})
export class BillingAdmissionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'FACTURAS';
  public subtitle: string = 'GESTIÓN';
  public headerFields: any[] = ['MES', 'VALOR', 'ESTADO', 'NÚMERO DE FACTURA', 'FACTURA REFERENCIA'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public user: any;
  public admission_id;
  public done: boolean = false;
  public create_new_billing: boolean = true;
  public role_permisos = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            if (row.billing_pad_status_id == 2) {
              this.create_new_billing = true;
            } else {
              this.create_new_billing = false;
            }
            this.done = true;
          }
          return {
            'data': row,
            'role_permisos': this.role_permisos,
            'show': this.ShowBillingAdmission.bind(this),
            'resend': this.resend.bind(this),
            'cancel': this.DeleteConfirmCompany.bind(this),
            // 'delete': this.DeleteConfirmBillingAdmission.bind(this),
          };
        },
        renderComponent: ActionsBillingComponent,
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
      its_credit_note: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.its_credit_note != null) {
            return row.its_credit_note.billing_pad_prefix.name + row.its_credit_note.consecutive;
          } else if (row.billing_pad_mu != null) {
            return row.billing_pad_mu.billing_pad_prefix.name + row.billing_pad_mu.consecutive;
          } else {
            return '-';
          }
        }
      },
    },
  };

  public routes = [
    {
      name: 'Facturas',
      route: '../../setting/billing-admission',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public datePipe: DateFormatPipe,
    private currency: CurrencyPipe,
    private BillingPadS: BillingPadService,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private AdmissionsS: AdmissionsService,
    private location: Location,

  ) {
  }

  ngOnInit(): void {
    var permisos = JSON.parse(localStorage.getItem('permissions'));
    permisos.forEach(x => {
      if (x.item_id == 189) {
        this.role_permisos.push(x.permission_id);
      }
    });

    this.admission_id = this.route.snapshot.params.id;
    this.AdmissionsS.GetCollection({ admissions_id: this.admission_id }).then(x => {
      this.user = x[0]['patients'];
      this.user['nombre_completo'] = x[0]['nombre_completo'];
      this.title = 'FACTURAS DE: ' + x[0]['nombre_completo'];
    });
  }
  back() {
    this.location.back();

  }

  RefreshData() {

    this.table.refresh();
  }

  NewBillingAdmission() {
    this.BillingPadS.NewBilling({ admissions_id: this.admission_id }).then(x => {
      this.toastrService.success('', x.message);
      this.RefreshData();
      this.create_new_billing = false;
    });
  }

  ShowBillingAdmission(data) {
    // this.dialogFormService.open(FormShowBillingPadComponent, {
    //   context: {
    //     title: 'Servicios facturados',
    //     data,
    //     saved: this.RefreshData.bind(this),
    //   },
    // });
    this.BillingPadS.GeneratePdf({
      id: data.id,
      billing_type: 'FACTURA',
      billing_id: data.id,
      show: true,
      admission_id: this.admission_id
    }).then(x => {
      this.toastrService.success('Archivo generado con exito', 'Exito');
      window.open(x['url'], '_blank');
    }).catch(x => {
      this.toastrService.danger('Error al generar archivo: ' + x, 'Error');
    });
  }

  DeleteConfirmBillingAdmission(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBillingAdmission.bind(this),
      },
    });
  }

  DeleteBillingAdmission(data) {
    // return this.BillingAdmissionS.Delete(data.id).then(x => {
    //   this.table.refresh();
    //   return Promise.resolve(x.message);
    // }).catch(x => {
    //   throw x;
    // });
  }

  resend(data) {
    this.BillingPadS.GenerateFile(1, data.id).then(x => {
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

}
