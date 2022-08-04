import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { FixedAddService } from '../../../business-controller/fixed-add.service';

import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsAssReqComponent } from './actions.component';
import { FormFixedAssetsRequestsComponent } from './form-fixed-assets-requests/form-fixed-assets-requests.component';

@Component({
  selector: 'ngx-fixed-assets-requests',
  templateUrl: './fixed-assets-requests.component.html',
  styleUrls: ['./fixed-assets-requests.component.scss']
})
export class FixedAssetsRequestsComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'LISTA DE ACTIVOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['ELEMENTO', 'CANTIDAD', 'SOLICITADO POR'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public validator ;


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
            'edit': this.EditPharmacy.bind(this),
          };
        },
        renderComponent: ActionsAssReqComponent,
      },
      fixed_nom_product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      request_amount: {
        title: this.headerFields[1],
        type: 'string',
      },
      responsible_user: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.responsible_user.user.firstname + " - " + row.responsible_user.user.lastname;
        },
      },
    },
  };

  constructor(
    private FixedAddS: FixedAddService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.validator = this.parentData;
  }

  RefreshData() {
    this.table.refresh();
  }

  NewPharmacy() {
    this.dialogFormService.open(FormFixedAssetsRequestsComponent, {
      context: {
        title: 'Crear nueva Solicitud',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  EditPharmacy(data) {
    this.dialogFormService.open(FormFixedAssetsRequestsComponent, {
      context: {
        title: '',
        data,
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
    return this.FixedAddS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
