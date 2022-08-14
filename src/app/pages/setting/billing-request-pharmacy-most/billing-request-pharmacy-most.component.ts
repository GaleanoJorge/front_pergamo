import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingService } from '../../../business-controller/billing.service';
import { NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-billing-request-pharmacy-most',
  templateUrl: './billing-request-pharmacy-most.component.html',
  styleUrls: ['./billing-request-pharmacy-most.component.scss']
})
export class BillingRequestPharmacyMostComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Solicitudes por Bodega Principal';
  public subtitle: string = '';
  public headerFields: any[] = ['consecutivo', 'Producto solicitado', 'Cantidad'];
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
      //     };
      //   },
      //   renderComponent: ActionsComponent,
      // },
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
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }
}
