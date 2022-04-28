import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPharmacyInventoryComponent } from './form-pharmacy-inventory/form-pharmacy-inventory.component';
import { ActionsInvComponent } from './actionsInv.component';
import { PharmacyInventoryService } from '../../../business-controller/pharmacy-inventory.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'ngx-pharmacy-inventory',
  templateUrl: './pharmacy-inventory.component.html',
  styleUrls: ['./pharmacy-inventory.component.scss']
})
export class PharmacyInventoryComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'INVENTARIO';
  public subtitle: string = '';
  public headerFields: any[] = ['PRODUCTO Y FABRICANTE', 'CANTIDAD INICIAL', 'CANTIDAD ACTUAL', 'LOTE', 'FECHA DE VENCIMIENTO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity;
  public user;
  public my_pharmacy_id;

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
            'edit': this.EditInv.bind(this),
          };
        },
        renderComponent: ActionsInvComponent,
      },
      product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.pharmacy_lot.billing_stock.product.name + ' - ' + row.pharmacy_lot.billing_stock.product.factory.name;
        },
      },
      enter_amount: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.pharmacy_lot.enter_amount;
        },
      },
      actual_amount: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value;
        },
      },
      lot: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.pharmacy_lot.lot;
        },
      },
      expiration_date: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.pharmacy_lot.expiration_date;
        },
      }
    },

  };

  public routes = [
    {
      name: 'Inventario',
      route: '../../setting/pharmacy-inventory',
    },
  ];

  constructor(
    private dialogFormService: NbDialogService,
    private invS: PharmacyInventoryService,
    private authService: AuthService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      this.my_pharmacy_id = x[0].id;
      this.entity = 'pharmacy_inventory?pharmacy_stock_id=' + x[0].id;
      this.title = 'INVENTARIO DE ' + x[0]['name'];
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  EditInv(data) {
    this.dialogFormService.open(FormPharmacyInventoryComponent, {
      context: {
        title: 'Enviar Medicamento',
        data: data,
        my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }
}
