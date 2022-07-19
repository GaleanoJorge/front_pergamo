import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { FixedAddService } from '../../../business-controller/fixed-add.service';

import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FormFixedRequestComponent } from './form-fixed-request/form-fixed-request.component';

@Component({
  selector: 'ngx-fixed-request',
  templateUrl: './fixed-request.component.html',
  styleUrls: ['./fixed-request.component.scss']
})
export class FixedRequestComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'LISTA DE ACTIVOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['IDENTIFICADOR', 'ELEMENTO', 'CANTIDAD', 'SOLICITADO A'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];


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
      fixed_assets: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value == null) {
            return row.fixed_accessories.name;
          } else {
            return row.fixed_assets.description;

          }
        },
      },
      request_amount: {
        title: this.headerFields[2],
        type: 'string',
      },
      fixed_accessories: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value == null) {  
            return row.fixed_assets.fixed_type.name;
          } else {
            return row.fixed_accessories.fixed_type.name;
          }
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
  }

  RefreshData() {
    this.table.refresh();
  }

  NewPharmacy() {
    this.dialogFormService.open(FormFixedRequestComponent, {
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
    this.dialogFormService.open(FormFixedRequestComponent, {
      context: {
        title: 'Editar Solicitud',
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
