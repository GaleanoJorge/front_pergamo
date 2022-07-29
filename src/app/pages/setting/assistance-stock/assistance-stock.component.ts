import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormAssistanceStockComponent } from './form-assistance-stock/form-assistance-stock.component';
import { PharmacyStockService } from '../../../business-controller/pharmacy-stock.service';
import { AuthService } from '../../../services/auth.service';
import { ActionsStockComponent } from './actions.component';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { ActivatedRoute } from '@angular/router';
import { FormPharmacyIncomeComponent } from '../../pharmacy/pharmacy-income/form-pharmacy-income/form-pharmacy-income.component';


@Component({
  selector: 'ngx-assistance-stock',
  templateUrl: './assistance-stock.component.html',
  styleUrls: ['./assistance-stock.component.scss']
})
export class AssistanceStockComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'LISTA DE ELEMENTOS A CARGO';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'ESTADO', 'DESPACHA', 'RECIBIDOS', 'DESCRIPCIÓN', 'DAÑADOS', 'ENVIADOS'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public entity: string = null;
  public user_id;
  public data = [];
  public routes;
  public show;

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
            // 'delete': this.DeleteConfirmPharmacyStock.bind(this),
          };
        },
        renderComponent: ActionsStockComponent,
      },
      status: {
        title: this.headerFields[1],
        type: 'string',
      },
      pharmacy_request_shipping: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value?.pharmacy_lot_stock.billing_stock.product) {
            return value?.pharmacy_lot_stock.billing_stock.product.name;
          } else {
            return value?.pharmacy_lot_stock.billing_stock.product_supplies_com.name;
          }
        }
      },
      'product_generic': {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.product_generic) { 
            return row.product_generic.description;
          } else {
            return row.product_supplies.description;
          }
        }
      },
      'pharmacy_request_shipping.amount': {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.pharmacy_request_shipping?.amount;
        },
      },
      'pharmacy_request_shipping.amount_damaged': {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.pharmacy_request_shipping?.amount_damaged;
        },
      },
      'pharmacy_request_shipping.amount_provition': {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.pharmacy_request_shipping.amount_provition;
        },
      },
      request_pharmacy_stock: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name + ': ' + value.campus.name;
        }
      },
    },
  };



  constructor(
    private PharmacyStockS: PharmacyStockService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private AuthS: AuthService,
    private requesS: PharmacyProductRequestService,
    private route: ActivatedRoute,


  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.unit) {
      this.routes = [
        {
          name: 'Anterior',
          route: this.route.snapshot.queryParams.unit,
        },
        {
          name: 'Mi inventario',
          route: '../../setting/assistance-stock',
        },
      ];
    } else {
      this.routes = [
        {
          name: 'Mi inventario',
          route: '../../setting/assistance-stock',
        },
      ];
    }

    this.user_id = this.AuthS.GetUser().id;
    if (this.user_id) {
      this.entity = 'pharmacy_product_request/?pagination=true&user_id=' + this.user_id + '&status=ACEPTADO';
    }
  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  EditInv(data) {
    this.dialogFormService.open(FormPharmacyIncomeComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Aceptar Medicamento',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeletePharInventary(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      closeOnBackdropClick: false,
      context: {
        name: data.firstname,
        data: data,
        delete: this.DeleteInventary.bind(this),
      },
    });
  }

  DeleteInventary(data) {
    return this.requesS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  tablock(e) {
    // console.log(e.tabTitle);
    switch (e.tabTitle) {
      case "RECIBIDOS": {
        this.show = 1;
        break;
      }
      case "POR ACEPTAR": {
        this.show = 2;
        break;
      }
      case "SOLICITUDES": {
        this.show = 3;
        break;
      }
    }
  }

}
