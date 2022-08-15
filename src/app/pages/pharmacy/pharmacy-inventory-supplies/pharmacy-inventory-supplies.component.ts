import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPharmacyInventorySuppliesComponent } from './form-pharmacy-inventory-supplies/form-pharmacy-inventory-supplies.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { ActionsInvSupComponent } from './actionsInv.component';
import { FormPharmaInvSupPersonComponent } from './form-pharma-inv-sup-person/form-pharma-inv-sup-person.component';
import { PharmacyStockService } from '../../../business-controller/pharmacy-stock.service';
import { UserPharmacyStockService } from '../../../business-controller/user-pharmacy-stock.service';

@Component({
  selector: 'ngx-pharmacy-inventory-supplies',
  templateUrl: './pharmacy-inventory-supplies.component.html',
  styleUrls: ['./pharmacy-inventory-supplies.component.scss']
})
export class PharmacyInventorySuppliesComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'INVENTARIO';
  public subtitle: string = '';
  public headerFields: any[] = ['INSUMO - INSUMO GENERICO', 'FABRICANTE', 'CANTIDAD INICIAL', 'CANTIDAD ACTUAL', 'LOTE', 'FECHA DE VENCIMIENTO'];
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
        renderComponent: ActionsInvSupComponent,
      },
      product_supplies_com: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing_stock.product_supplies_com.name + " - "+row.billing_stock.product_supplies_com.product_supplies.description;

        },
      },
      factory: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing_stock.product_supplies_com.factory.name;
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
    private permisoPharmaS: UserPharmacyStockService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_pharmacy_id = x[0].id;
        this.entity = 'pharmacy_lot_stock?pharmacy_stock_id=' + x[0].id + '& product='+ false;
        this.title = 'INVENTARIO DE ' + x[0]['name'];
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

  reloadForm(tab) {
    if (tab.tabTitle == 'INSUMOS EN STOCK') {
      this.showdiv = 1;
    } else {
      this.showdiv = 2;
    }
  }
  ChangePharmacy(pharmacy) {
    if(pharmacy==0){
      this.table.changeEntity('pharmacy_lot_stock?pharmacy_stock_id=' + this.my_pharmacy_id + '& product=' + false, 'pharmacy_lot_stock');

    }else{
      this.pharmacy = pharmacy;
      this.table.changeEntity('pharmacy_lot_stock?pharmacy_stock_id=' + this.pharmacy + '& product=' + false, 'pharmacy_lot_stock');
    }
    // this.RefreshData();
  }

  EditInv(data) {
    this.dialogFormService.open(FormPharmacyInventorySuppliesComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'ENVIAR INSUMO',
        data: data,
        my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditInvPerdon(data) {
    this.dialogFormService.open(FormPharmaInvSupPersonComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'ENVIAR INSUMO',
        data: data,
        my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  NewDev(data) {
    this.dialogFormService.open(FormPharmacyInventorySuppliesComponent, {
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
