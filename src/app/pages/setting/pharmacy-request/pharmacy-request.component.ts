import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
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
  public headerFields: any[] = ['ID', 'NOMBRE-SEDE', 'PRODUCTO', 'CANTIDAD'];
  //public headerFields2: any[] = ['ID', 'SOLICITANTE','PACIENTE', 'PRODUCTO', 'CANTIDAD'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
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


  // public settings2 = {
  //   pager: {
  //     display: true,
  //     perPage: 10,
  //   },
  //   columns: {
  //     actions: {
  //       title: 'Acciones',
  //       type: 'custom',
  //       valuePrepareFunction: (value, row) => {
  //         return {
  //           'data': row,
  //           'edit': this.EditInv.bind(this),
  //         };
  //       },
  //       renderComponent: ActionsSendComponent,
  //     },
  //     id: {
  //       title: this.headerFields2[0],
  //       type: 'string',
  //     },
  //     users: {
  //       title: this.headerFields2[1],
  //       type: 'string',
  //       valuePrepareFunction: (value, row) => {
  //         if(value!=null){
  //         return value.firstname + ' ' + value.lastname;
  //         }
  //       },
  //     },
  //     admissions: {
  //       title: this.headerFields2[2],
  //       type: 'string',
  //       valuePrepareFunction: (value, row) => {
  //         return value.patients.firstname + ' ' + value.patients.lastname + ' - ' + value.patients.identification;
  //       },
  //     },
  //     services_briefcase: {
  //       title: this.headerFields2[3],
  //       type: 'string',
  //       valuePrepareFunction: (value, row) => {
  //         return value.manual_price.name;
  //       },
  //     },
  //     request_amount: {
  //       title: this.headerFields2[4],
  //       type: 'string',
  //     },
  //   },
  // };

  constructor(
    private dialogFormService: NbDialogService,
    private requesS: PharmacyProductRequestService,
  ) {
  }

  ngOnInit(): void {
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
    this.dialogFormService.open(FormPharmacyRequestComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Enviar Medicamento',
        data,
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
