import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsBillingPgpComponent } from './actions-billing-pgp.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ContractService } from '../../../business-controller/contract.service';
import { FormShowBillingPgpComponent } from './form-show-billing-pgp/form-show-billing-pgp.component';
import { FormCreateBillingPgpComponent } from './form-create-billing-pgp/form-create-billing-pgp.component';
import { BillingAdmissionsPadListComponent } from '../billing-pad-admissions-list/billing-admissions-pad-list.component';
import { BillingPadService } from '../../../business-controller/billing-pad.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-billing-pgp',
  templateUrl: './billing-pgp.component.html',
  styleUrls: ['./billing-pgp.component.scss']
})
export class BillingPgpComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'FACTURAS DEL CONTRATO: ';
  public subtitle: string = 'GESTIÓN';
  public headerFields: any[] = ['MES', 'VALOR', 'ESTADO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public contract_id;

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
          return {
            'data': row,
            'show': this.ShowAdmissionsPgp.bind(this),
            'cancel': this.cancelBilling.bind(this),
            // 'delete': this.DeleteConfirmBillingPgp.bind(this),
          };
        },
        renderComponent: ActionsBillingPgpComponent,
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
    },
  };

  public routes = [
    {
      name: 'Facturas',
      route: '../../setting/billing-pgp',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public datePipe: DateFormatPipe,
    private currency: CurrencyPipe,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private ContractS: ContractService,
    private BillingPadS: BillingPadService,
  ) {
  }

  ngOnInit(): void {
    this.contract_id = this.route.snapshot.params.contract_id;
    this.ContractS.GetCollection({id: this.contract_id}).then(x => {
      this.title = 'FACTURAS DEL CONTRATO: ' + x[0]['name'];
    }).catch(x => {});
  }

  RefreshData() {

    this.table.refresh();
  }

  NewBillingAdmission() {
    this.dialogFormService.open(FormCreateBillingPgpComponent, {
      context: {
        data: {
          id: this.contract_id,
        },
        title: 'Crear nueva factura',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ShowBillingPgp(data) {
    this.dialogFormService.open(FormShowBillingPgpComponent, {
      context: {
        title: 'Servicios facturados',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ShowAdmissionsPgp(data) {
    this.dialogFormService.open(BillingAdmissionsPadListComponent, {
      context: {
        title: 'ADMISIONES PGP',
        is_pgp: true,
        route: 1,
        entity: 'billing_pad/getEnabledAdmissions/0',
        billing_pad_pgp_id: data.id,
      },
    });
  }

  DeleteConfirmBillingPgp(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBillingPgp.bind(this),
      },
    });
  }

  DeleteBillingPgp(data) {
    // return this.BillingPgpS.Delete(data.id).then(x => {
    //   this.table.refresh();
    //   return Promise.resolve(x.message);
    // }).catch(x => {
    //   throw x;
    // });
  }

  cancelBilling(data) {
    this.BillingPadS.CancelBillingPgp({
      id: data.id,
      user_id : this.authService.GetUser().id,
    }).then(x => {
      this.RefreshData();
    });
  }

}
