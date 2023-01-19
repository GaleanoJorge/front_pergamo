import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingService } from '../../../business-controller/billing.service';
import { NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBillingComponent } from './form-billing/form-billing.component';


@Component({
  selector: 'ngx-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Orden de compra';
  public subtitle: string = '';
  public headerFields: any[] = ['Cantidad comprada', 'Valor unidad', 'Producto comercial', 'Comprado a', 'Consecutivo factura'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      // actions: {
      //   title: 'Acciones',
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     // DATA FROM HERE GOES TO renderComponent
      //     return {
      //       'data': row,
      //       // 'edit': this.EditBilling.bind(this),
      //       'delete': this.DeleteConfirmBilling.bind(this),
      //     };
      //   },
      //   renderComponent: ActionsComponent,
      // },
      amount: {
        title: this.headerFields[0],
        type: 'string',
      },
      amount_unit: {
        title: this.headerFields[1],
        type: 'string',
      },
      product_supplies_com: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value == null) {
            return row.product.name;
          } else {
            return row.product_supplies_com.name;
          }
        },
      },
      company: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing.company.name;

        }
      },
      billing: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing.id;

        }
      }

    },
  };

  constructor(
    private BillingS: BillingService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewBilling() {
    this.dialogFormService.open(FormBillingComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Crear orden de compra',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // EditBilling(data) {
  //   this.dialogFormService.open(FormBillingComponent, {
  //     context: {
  //       title: 'Editar orden de compra',
  //       data,
  //       saved: this.RefreshData.bind(this),
  //     },
  //   });
  // }

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
