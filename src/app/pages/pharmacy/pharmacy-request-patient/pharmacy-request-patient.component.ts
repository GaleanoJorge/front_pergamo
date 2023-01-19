import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { UserPharmacyStockService } from '../../../business-controller/user-pharmacy-stock.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsSendPatientComponent } from './actions.component';
import { FormElementDeniedComponent } from './form-element-denied/form-element-denied.component';
import { FormPharmacyRequestPatientComponent } from './form-pharmacy-request-patient/form-pharmacy-request-patient.component';

@Component({
  selector: 'ngx-pharmacy-request-patient',
  templateUrl: './pharmacy-request-patient.component.html',
  styleUrls: ['./pharmacy-request-patient.component.scss']
})
export class PharmacyRequestPatientComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'MEDICAMENTOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['CONSECUTIVO', 'SOLICITANTE', 'NOMBRE PACIENTE', 'DOCUMENTO PACIENTE', 'PRODUCTO', 'CANTIDAD', 'FECHA DE SOLICITUD'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[1]},${this.headerFields[2]},${this.headerFields[3]},${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public user;
  public my_pharmacy_id;
  public entity;
  public pharmacy_stock;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {

    pager: {
      display: true,
      perPage: 15,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditInv.bind(this),
            //   'delete': this.DeletePharInventary.bind(this),
            'returned': this.Returned.bind(this),

          };
        },
        renderComponent: ActionsSendPatientComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      user_request_pad: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value != null) {
            return value.firstname + ' ' + value.lastname;
          }
        },
      },
      admissions: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.patients.nombre_completo;
        },
      },
      identification: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.identification;
        },
      },
      services_briefcase: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value != null) {
            return value.manual_price.name;
          } else if (row.product_supplies == null) {
            return row.product_generic.description;
          } else {
            return row.product_supplies.description;
          }
        },
      },
      request_amount: {
        title: this.headerFields[5],
        type: 'string',
      },

      created_at: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform4(value);
        },
      },
    },
  };

  constructor(
    private dialogFormService: NbDialogService,
    private requesS: PharmacyProductRequestService,
    private invS: PharmacyLotStockService,
    private authService: AuthService,
    private permisoPharmaS: UserPharmacyStockService,
    public datePipe: DateFormatPipe,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      this.my_pharmacy_id = x[0].id;
      this.entity = 'pharmacy_product_request?status=PATIENT' + '&own_pharmacy_stock_id=' + x[0].id;
      this.title = 'SOLICITUDES DE MEDICAMENTOS A:  ' + x[0]['name'];

    });

    await this.permisoPharmaS.GetPharmacyUserId(this.user.id).then(x => {
      this.pharmacy_stock = x;
    });
  }



  ChangePharmacy(pharmacy) {
    if (pharmacy == 0) {
      this.table.changeEntity('pharmacy_product_request?status=PATIENT' + '&own_pharmacy_stock_id=' + this.my_pharmacy_id, 'pharmacy_product_request');

    } else {

      this.table.changeEntity('pharmacy_product_request?status=PATIENT' + '&own_pharmacy_stock_id=' + pharmacy, 'pharmacy_product_request');
    }
    // this.RefreshData();
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
    this.dialogFormService.open(FormPharmacyRequestPatientComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Enviar Medicamento',
        data: data,
        user: this.user,
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




  Returned(data) {
    this.dialogFormService.open(FormElementDeniedComponent, {
      context: {
        title: 'ELIMINAR ELEMENTO',
        data2: data,
        status: 'RECHAZADO',
        saved: this.RefreshData.bind(this),
      },
    });
  }
}
