import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FormPharmacyLotComponent } from './form-pharmacy-lot/form-pharmacy-lot.component';



@Component({
  selector: 'ngx-pharmacy-lot',
  templateUrl: './pharmacy-lot.component.html',
  styleUrls: ['./pharmacy-lot.component.scss']
})
export class PharmacyLotComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'LOTES INGRESADOS EN ALMACEN';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'PRODUCTO','FABRICANTE', 'CANTIDAD INGRESADA', '10%', 'LOTE', 'FECHA DE VENCIDO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
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

  constructor(
    private pharmacyS: PharmacyLotStockService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  EditPharmacy(data) {
    this.dialogFormService.open(FormPharmacyLotComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Editar factura',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmPharmacy(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePharmacy.bind(this),
      },
    });
  }

  DeletePharmacy(data) {
    return this.pharmacyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
