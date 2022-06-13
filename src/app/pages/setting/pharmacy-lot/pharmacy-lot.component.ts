import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FormPharmacyLotComponent } from './form-pharmacy-lot/form-pharmacy-lot.component';



@Component({
  selector: 'ngx-pharmacy-lot',
  templateUrl: './pharmacy-lot.component.html',
  styleUrls: ['./pharmacy-lot.component.scss']
})
export class PharmacyLotComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'LOTES INGRESADOS EN ALMACEN';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'PRODUCTO - FABRICANTE', 'CANTIDAD REAL', 'LOTE', 'FECHA DE VENCIMIENTO'];
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
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      product: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_stock.product_id == null) {
            return row.billing_stock.product_supplies_com.name + " - "+row.billing_stock.product_supplies_com.product_supplies.description;
          } else {
            return row.billing_stock.product.name + ' - ' + row.billing_stock.product.factory.name;
          }
        },
      },

      actual_amount: {
        title: this.headerFields[2],
        type: 'string',
      },
      lot: {
        title: this.headerFields[3],
        type: 'string',
      },
      expiration_date: {
        title: this.headerFields[4],
        type: 'string',
      }
    },
  };

  constructor(
    private pharmacyS: PharmacyLotStockService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    console.log('algo');
  }

  RefreshData() {
    this.table.refresh();
  }

  NewPharmacy() {
    this.dialogFormService.open(FormPharmacyLotComponent, {
      context: {
        title: 'Crear nuevo lote',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  EditPharmacy(data) {
    this.dialogFormService.open(FormPharmacyLotComponent, {
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
