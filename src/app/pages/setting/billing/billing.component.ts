import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingService } from '../../../business-controller/billing.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBillingComponent } from './form-billing/form-billing.component';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'ngx-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Facturas';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'Proveedor', 'Num factura', 'Cantidad', 'Valor total'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]},${this.headerFields[2]},${this.headerFields[3]},${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditBilling.bind(this),
            'delete': this.DeleteConfirmBilling.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      provider_name: {
        title: this.headerFields[1],
        type: 'string',
      },
      num_evidence: {
        title: this.headerFields[2],
        type: 'string',
      },
      ordered_quantity: {
        title: this.headerFields[3],
        type: 'string',
      },
      invoice_value: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, data) => {
          return this.currency.transform(value);
        },
      },
    },
  };

  public routes = [
    {
      name: 'Factura',
      route: '../../setting/billing',
    },
  ];

  constructor(
    private BillingS: BillingService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private currency: CurrencyPipe,

  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewBilling() {
    this.dialogFormService.open(FormBillingComponent, {
      context: {
        title: 'Crear factura',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditBilling(data) {
    this.dialogFormService.open(FormBillingComponent, {
      context: {
        title: 'Editar factura',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmBilling(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBilling.bind(this),
      },
    });
  }

  DeleteBilling(data) {
    return this.BillingS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
