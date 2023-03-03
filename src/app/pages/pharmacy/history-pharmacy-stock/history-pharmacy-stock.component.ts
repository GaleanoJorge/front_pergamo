import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-history-pharmacy-stock',
  templateUrl: './history-pharmacy-stock.component.html',
  styleUrls: ['./history-pharmacy-stock.component.scss']
})
export class HistoryPharmacyStockComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'LOTES INGRESADOS EN ALMACEN';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'PRODUCTO', 'FABRICANTE', 'CANTIDAD INGRESADA', '10%', 'LOTE', 'FECHA DE VENCIDO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 20,
    },
    columns: {
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      product: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_stock.product_id == null) {
            return row.billing_stock.product_supplies_com.name;
          } else {
            return row.billing_stock.product.name;
          }
        },
      },

      factory: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_stock.product_id == null) {
            return row.billing_stock.product_supplies_com.factory.name;
          } else {
            return row.billing_stock.product.factory.name;
          }
        },
      },

      actual_amount: {
        title: this.headerFields[3],
        type: 'string',
      },

      sample: {
        title: this.headerFields[4],
        type: 'string',
      },

      lot: {
        title: this.headerFields[5],
        type: 'string',
      },

      expiration_date: {
        title: this.headerFields[6],
        type: 'string',
      }
    },
  };

  constructor() {
  }

  ngOnInit(): void {
  }
}
