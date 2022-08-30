import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { UserPharmacyStockService } from '../../../business-controller/user-pharmacy-stock.service';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsSendComponent } from './actions.component';
import { FormPharmacyRequestComponent } from './form-pharmacy-request/form-pharmacy-request.component';

@Component({
  selector: 'ngx-pharmacy-request',
  templateUrl: './pharmacy-request.component.html',
  styleUrls: ['./pharmacy-request.component.scss']
})
export class PharmacyRequestComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'MEDICAMENTOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['CONSECUTIVO', 'NOMBRE-SEDE', 'PRODUCTO', 'CANTIDAD'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public user;
  public my_pharmacy_id;
  public pharmacy_stock;
  public showdiv: Number = null;
  public entity;

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
        renderComponent: ActionsSendComponent,
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
          if (value == null) {
            return row.product_supplies.description;
          } else {
            return row.product_generic.description;
          }
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
    private permisoPharmaS: UserPharmacyStockService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      this.my_pharmacy_id = x[0].id;
      this.entity = 'pharmacy_product_request?status=SOLICITADO FARMACIA' + '&request_pharmacy_stock_id=' + x[0].id ;
      this.title = 'SOLICITUDES DE MEDICAMENTOS A:  ' + x[0]['name'];
    });
    await this.permisoPharmaS.GetPharmacyUserId(this.user.id).then(x => {
      this.pharmacy_stock = x;
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  ChangePharmacy(pharmacy) {
    if(pharmacy==0){
      this.table.changeEntity('pharmacy_product_request/?pagination=true&status=SOLICITADO FARMACIA'+'&request_pharmacy_stock_id='+this.my_pharmacy_id,'pharmacy_product_request');

    }else{

      this.table.changeEntity('pharmacy_product_request/?pagination=true&status=SOLICITADO FARMACIA'+'&request_pharmacy_stock_id='+pharmacy,'pharmacy_product_request');
    }
    // this.RefreshData();
  }

  reloadForm(tab) {
    if (tab.tabTitle == 'FARMACIA') {
      this.showdiv = 1;
    } else {
      this.showdiv = 2;
    }
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  EditInv(data) {
    this.dialogFormService.open(FormPharmacyRequestComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Enviar Medicamento',
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
