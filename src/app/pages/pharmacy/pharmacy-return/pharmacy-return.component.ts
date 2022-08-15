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
  @Input() data: any = [];
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'ACEPTAR DEVOLUCIONES DE MEDICAMENTOS';
  public subtitle: string = '';
  public headerFields: any[] = ['CONSECUTIVO', 'MEDICAMENTO DEVUELTO POR', 'PRODUCTO GENERICO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public validator;
  public user;
  public my_pharmacy_id;
  public most: boolean = false;
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
            // 'delete': this.DeletePharInventary.bind(this),
          };
        },
        renderComponent: ActionsReturnComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      request_pharmacy_stock: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value.name + ' - ' + row.request_pharmacy_stock.campus.name;
          } else {
            return row.user_request_pad.firstname + " " + row.user_request_pad.lastname;
          }
        },
      },
      product_generic: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.product_generic_id == null) {
            if (row.services_briefcase) {
              return row.services_briefcase.manual_price.name;
            } else {
              return row.product_supplies.description;
            }
          } else {
            return row.product_generic.description;
          }

        },
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
    this.validator = this.parentData;
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_pharmacy_id = x[0].id;
        this.entity = 'pharmacy_product_request?product=' + 1 + '& status=ENVIADO' + '&own_pharmacy_stock_id=' + x[0].id;
        this.title = 'MEDICAMENTOS DEVUELTOS A:  ' + x[0]['name'];
      }
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
      closeOnBackdropClick: false,
      context: {
        title: 'Aceptar Medicamento',
        data: data,
        my_pharmacy_id: this.my_pharmacy_id,
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
