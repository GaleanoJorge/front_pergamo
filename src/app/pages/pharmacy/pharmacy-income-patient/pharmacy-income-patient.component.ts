import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { reorderBegin } from '@syncfusion/ej2/grids';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { UserPharmacyStockService } from '../../../business-controller/user-pharmacy-stock.service';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FormPharmacyIncomeComponent } from '../pharmacy-income/form-pharmacy-income/form-pharmacy-income.component';
import { ActionsPatientComponent } from './actions.component';
import { FormPharmacyIncomePatientComponent } from './form-pharmacy-income-patient/form-pharmacy-income-patient.component';

@Component({
  selector: 'ngx-pharmacy-income-patient',
  templateUrl: './pharmacy-income-patient.component.html',
  styleUrls: ['./pharmacy-income-patient.component.scss']
})
export class PharmacyIncomePatientComponent implements OnInit {
  @Input() parentData: any;
  @Input() data: any = [];
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'ACEPTAR DEVOLUCIONES DE MEDICAMENTOS';
  public subtitle: string = '';
  public headerFields: any[] = ['CONSECUTIVO', 'MEDICAMENTO DEVUELTO POR', 'PRODUCTO GENERICO', 'NOMBRE PACIENTE', 'DOCUMENTO PACIENTE', 'CANTIDAD'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[1]},${this.headerFields[2]},${this.headerFields[3]},${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public validator;
  public user;
  public my_pharmacy_id;
  public most: boolean = false;
  public entity;
  public pharmacy_stock;

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
        renderComponent: ActionsPatientComponent,
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
      admissions: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.patients.firstname + ' ' + value.patients.lastname;
        },
      },
      identification: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.patients.identification;
        },
      },
      request_amount: {
        title: this.headerFields[5],
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
    this.validator = this.parentData;
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_pharmacy_id = x[0].id;
        this.entity = 'pharmacy_product_request?product=' + 1 + '& status=DEVUELTO' + '&own_pharmacy_stock_id=' + x[0].id;
        this.title = 'MEDICAMENTOS DEVUELTOS A:  ' + x[0]['name'];
      }
    });
    await this.permisoPharmaS.GetPharmacyUserId(this.user.id).then(x => {
      this.pharmacy_stock = x;
    });



  }

  RefreshData() {
    this.table.refresh();
  }

  ChangePharmacy(pharmacy) {
    if (pharmacy == 0) {
      this.table.changeEntity('pharmacy_product_request?product=' + 1 + '& status=DEVUELTO' + '&own_pharmacy_stock_id=' + this.my_pharmacy_id, 'pharmacy_product_request');

    } else {

      this.table.changeEntity('pharmacy_product_request?product=' + 1 + '& status=DEVUELTO' + '&own_pharmacy_stock_id=' + pharmacy, 'pharmacy_product_request');
    }
    // this.RefreshData();
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
