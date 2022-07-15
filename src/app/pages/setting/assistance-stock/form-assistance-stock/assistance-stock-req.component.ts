import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormAssistanceStockComponent } from './form-assistance-stock.component'; 
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { AuthService } from '../../../../services/auth.service'; 
import { ActionsStockComponent } from '../actions.component';
import { FormPharmacyIncomeComponent } from '../../pharmacy-income/form-pharmacy-income/form-pharmacy-income.component';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';


@Component({
  selector: 'ngx-assistance-stock-req',
  templateUrl: './assistance-stock-req.component.html',
  styleUrls: ['./assistance-stock-req.component.scss']
})
export class AssistanceStockReqComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'LISTA DE ELEMENTOS EN POSECIÓN';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'ESTADO', 'DESPACHA', 'PRODUCTO', 'DESCRIPCIÓN'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public entity: string = null;
  public user_id;
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
            'edit': this.EditInv.bind(this),
            // 'delete': this.DeleteConfirmPharmacyStock.bind(this),
          };
        },
        renderComponent: ActionsStockComponent,
      },
      request_pharmacy_stock: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name + ' - ' + row.request_pharmacy_stock.campus.name;
        },
      },
      product_generic: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.product_generic_id == null) {
            return row.product_supplies.description;
          } else {
            return row.product_generic.description;
          }

        },
      },
      cantidad_enviada: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'PharmacyStock',
      route: '../../setting/assistance-stock',
    },
  ];

  constructor(
    private PharmacyStockS: PharmacyStockService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private AuthS: AuthService,
    private requesS: PharmacyProductRequestService,
  ) {
  }

  ngOnInit(): void {
    this.user_id = this.AuthS.GetUser().id;
    if (this.user_id) {
      this.entity = 'pharmacy_product_request/?pagination=true&user_id=' + this.user_id + '&status=ENVIADO';
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
        type: data.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_id ? true : false,
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

}
