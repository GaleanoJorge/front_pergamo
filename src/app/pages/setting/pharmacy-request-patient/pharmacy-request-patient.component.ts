import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsSendPatientComponent } from './actions.component';
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
  public headerFields: any[] = ['IDENTIFICADOR', 'SOLICITANTE','PACIENTE', 'PRODUCTO', 'CANTIDAD'];
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
          return value.patients.firstname + ' ' + value.patients.lastname + ' - ' + value.patients.identification;
        },
      },
      services_briefcase: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.manual_price.name;
        },
      },
      request_amount: {
        title: this.headerFields[4],
        type: 'string',
      },
    },
  };

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
    this.dialogFormService.open(FormPharmacyRequestPatientComponent, {
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
