import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingService } from '../../../business-controller/billing.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPharmacyBulkLoadComponent } from './form-pharmacy-bulk-load/form-pharmacy-bulk-load.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';


@Component({
  selector: 'ngx-pharmacy-bulk-load',
  templateUrl: './pharmacy-bulk-load.component.html',
  styleUrls: ['./pharmacy-bulk-load.component.scss']
})
export class PharmacyBulkLoadComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Solicitudes a compras';
  public subtitle: string = '';
  public headerFields: any[] = ['Producto enviado', 'Cantidad','Enviado a'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public my_pharmacy_id;
  public pharmacy;
  public user;
  public entity;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      product_generic: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.product_generic_id == null) {
            return row.product_supplies.description;
          } else {
            return row.product_generic.description;
          }
        },
      },
      request_amount: {
        title: this.headerFields[1],
        type: 'string',
      },
      request_pharmacy_stock_id: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.request_pharmacy_stock.name + ' - ' + row.request_pharmacy_stock.campus.name;
        },
      },
    },
  };

  constructor(
    private BillingS: BillingService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private authService: AuthService,
    private toastService: NbToastrService,
    private invS: PharmacyLotStockService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_pharmacy_id = x[0].id;
        this.entity = 'pharmacy_product_request?own_pharmacy_stock_id=' + x[0].id + '&status=ENVIADO FARMACIA';
        this.title = 'ELEMENTOS ENVIADOS POR ' + x[0]['name'];
      } else {
        this.toastService.info('Usuario sin farmacias asociadas', 'Información');
      }
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  NewBilling() {
    this.dialogFormService.open(FormPharmacyBulkLoadComponent, {
      context: {
        title: 'Crear despacho masivo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditBilling(data) {
    this.dialogFormService.open(FormPharmacyBulkLoadComponent, {
      context: {
        title: 'Editar solicitud de compra',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmBilling(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBilling.bind(this),
      },
    });
  }

  DeleteBilling(data) {
    return this.BillingS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
