import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPharmacyInventoryComponent } from './form-pharmacy-inventory/form-pharmacy-inventory.component';
import { ActionsInvComponent } from './actionsInv.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { FormPharmacyReturnComponent } from '../pharmacy-return/form-pharmacy-return/form-pharmacy-return.component';
import { FormPharmaInvPersonComponent } from './form-pharma-inv-person/form-pharma-inv-person.component';

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
  public headerFields: any[] = ['PRODUCTO - PRODUCTO GENERICO', 'FABRICANTE', 'CANTIDAD INICIAL', 'CANTIDAD ACTUAL', 'LOTE', 'FECHA DE VENCIMIENTO'];
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
            'edit1': this.EditInvPerdon.bind(this),
          };
        },
        renderComponent: ActionsInvComponent,
      },
      product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing_stock.product.name + ' - ' + row.billing_stock.product.product_generic.description;
        },
      },
      factory: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing_stock.product.factory.name;
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
    private invS: PharmacyLotStockService,
    private authService: AuthService,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_pharmacy_id = x[0].id;
        this.entity = 'pharmacy_lot_stock?pharmacy_stock_id=' + x[0].id + '& product=' + true;
        this.title = 'INVENTARIO DE ' + x[0]['name'];
       } else {
        this.toastService.info('Usuario sin farmacias asociadas', 'Información');
       }
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  EditInv(data) {
    this.dialogFormService.open(FormPharmacyInventoryComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'ENVIAR MEDICAMENTO',
        data: data,
        my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }
  EditInvPerdon(data) {
    this.dialogFormService.open(FormPharmaInvPersonComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'ENVIAR MEDICAMENTO',
        data: data,
        my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }
  NewDev(data) {
    this.dialogFormService.open(FormPharmacyReturnComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'MEDICAMENTOS DEVUELTOS',
        data: data,
        //    my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }


}