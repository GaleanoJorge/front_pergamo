import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingService } from '../../../business-controller/billing.service';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBillingRequestPharmacyComponent } from './form-billing-request-pharmacy/form-billing-request-pharmacy.component';


@Component({
  selector: 'ngx-billing-request-pharmacy',
  templateUrl: './billing-request-pharmacy.component.html',
  styleUrls: ['./billing-request-pharmacy.component.scss']
})
export class BillingRequestPharmacyComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Solicitudes a compras';
  public subtitle: string = '';
  public headerFields: any[] = ['Consecutivo', 'Producto solicitado', 'Cantidad'];
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
        // renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      product_generic: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.product_generic_id == null) {
            return row.product_supplies.description;
          } else {
            return row.product_generic.description;
          }
        },
      },
      amount: {
        title: this.headerFields[2],
        type: 'string',
      },
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
    this.dialogFormService.open(FormBillingRequestPharmacyComponent, {
      context: {
        title: 'Crear solicitud de compra',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditBilling(data) {
    this.dialogFormService.open(FormBillingRequestPharmacyComponent, {
      context: {
        title: 'Editar solicitud de compra',
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
