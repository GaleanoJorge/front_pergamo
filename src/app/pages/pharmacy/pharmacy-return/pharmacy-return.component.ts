import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsReturnComponent } from './actions-return.component';
import { FormPharmacyReturnComponent } from './form-pharmacy-return/form-pharmacy-return.component';

@Component({
  selector: 'ngx-pharmacy-return',
  templateUrl: './pharmacy-return.component.html',
  styleUrls: ['./pharmacy-return.component.scss']
})
export class PharmacyReturnComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'MEDICAMENTOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['IDENTIFICADOR', 'DEVUELVE NOMBRE-SEDE', 'PRODUCTO', 'CANTIDAD'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
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
          return {
            'data': row,
            'edit': this.EditInv.bind(this),
          };
        },
        renderComponent: ActionsReturnComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      own_pharmacy_stock: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name + ' - ' + row.own_pharmacy_stock.campus.name;
        },
      },
      product_generic: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.description;
        },
      },
      request_amount: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  constructor(
    private dialogFormService: NbDialogService,
    private requesS: PharmacyProductRequestService,
    private invS: PharmacyLotStockService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      this.my_pharmacy_id = x[0].id;
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

  EditInv(data) {
    this.dialogFormService.open(FormPharmacyReturnComponent, {
      context: {
        title: '',
        data: data,
        my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeletePharInventary(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
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
