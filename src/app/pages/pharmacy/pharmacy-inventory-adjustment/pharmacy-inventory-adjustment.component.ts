import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { UserPharmacyStockService } from '../../../business-controller/user-pharmacy-stock.service';
import { ActionsInvAdjustComponent } from './actionsInvAdjust.component';
import { FormPharmacyInvAdjustComponent } from './form-pharmacy-inv-adjust/form-pharmacy-inv-adjust.component';

@Component({
  selector: 'ngx-pharmacy-inventory-adjustment',
  templateUrl: './pharmacy-inventory-adjustment.component.html',
  styleUrls: ['./pharmacy-inventory-adjustment.component.scss']
})
export class PharmacyInventoryAdjustmentComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'AJUSTES DE INVENTARIO';
  public subtitle: string = '';
  public headerFields: any[] = ['INSUMO - INSUMO GENERICO', 'FABRICANTE', 'CANTIDAD INICIAL', 'CANTIDAD ACTUAL', 'LOTE', 'FECHA DE VENCIMIENTO', 'FARMACIA - SEDE'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity;
  public user;
  public my_pharmacy_id;
  public pharmacy_stock;
  public pharmacy;
  public showdiv: Number = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 40,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditInv.bind(this),
          };
        },
        renderComponent: ActionsInvAdjustComponent,
      },
      product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_stock.product) {
            return row.billing_stock.product.name + ' - ' + row.billing_stock.product.product_generic.description;
          } else {
            return row.billing_stock.product_supplies_com.name + ' - ' + row.billing_stock.product_supplies_com.product_supplies.description;
          }
        },
      },
      factory: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.billing_stock.product_id != null) {
            return row.billing_stock.product.factory.name;
          } else {
            return row.billing_stock.product_supplies_com.factory.name;
          }
        },
      },
      amount_total: {
        title: this.headerFields[2],
        type: 'string',
      },
      actual_amount: {
        title: this.headerFields[3],
        type: 'string',
      },
      lot: {
        title: this.headerFields[4],
        type: 'string',
      },
      expiration_date: {
        title: this.headerFields[5],
        type: 'string',
      },
      pharmacy_stock: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.pharmacy_stock.name + ' - ' + row.pharmacy_stock.campus.name;
        },
      }
    },
  };

  constructor(
    private dialogFormService: NbDialogService,
    private invS: PharmacyLotStockService,
    private authService: AuthService,
    private toastService: NbToastrService,
    private permisoPharmaS: UserPharmacyStockService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_pharmacy_id = x[0].id;
        this.entity = 'pharmacy_lot_stock';
        this.title = 'AJUSTES DE INVENTARIO REALIZADO POR ' + x[0]['name'];
      } else {
        this.toastService.info('Usuario sin farmacias asociadas', 'Información');
      }
    });
    await this.permisoPharmaS.GetPharmacyUserId(this.user.id).then(x => {
      this.pharmacy_stock = x;
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  EditInv(data) {
    this.dialogFormService.open(FormPharmacyInvAdjustComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'AJUSTE DE INVENTARIO',
        data: data,
        saved: this.RefreshData.bind(this),
      },
    });
  }
}
