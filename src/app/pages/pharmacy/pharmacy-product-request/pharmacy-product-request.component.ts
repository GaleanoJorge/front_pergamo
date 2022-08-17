import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { AuthService } from '../../../services/auth.service';

import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsComponent } from '../../contract/briefcase/actions.component';
import { FormPharmacyProductRequestComponent } from './form-pharmacy-product-request/form-pharmacy-product-request.component';



@Component({
  selector: 'ngx-pharmacy-product-request',
  templateUrl: './pharmacy-product-request.component.html',
  styleUrls: ['./pharmacy-product-request.component.scss']
})
export class PharmacyProductRequestComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'LISTA DE MEDICAMENTOS O INSUMOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['CONSECUTIVO', 'PRODUCTO', 'CANTIDAD', 'SOLICITADO A'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public user;
  public my_pharmacy_id;
  public entity;

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
      product_generic: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value == null) {
            return row.product_supplies.description;
          } else {
            return row.product_generic.description;
          }
        },
      },
      request_amount: {
        title: this.headerFields[2],
        type: 'string',
      },
      request_pharmacy_stock: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name + ' - ' + row.request_pharmacy_stock.campus.name;
        },
      }
    },
  };

  constructor(
    private pharmacyS: PharmacyProductRequestService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private invS: PharmacyLotStockService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      this.my_pharmacy_id = x[0].id;
      this.entity= 'pharmacy_product_request/?pagination=true' + '&status=SOLICITADO' + '&own_pharmacy_stock_id='+x[0].id;
      this.title = 'SOLICITUDES REALIZADAS POR:  ' + x[0]['name'];

    });
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
    this.dialogFormService.open(FormPharmacyProductRequestComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Editar factura',
        data: data,
        my_pharmacy_id: this.my_pharmacy_id,
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
