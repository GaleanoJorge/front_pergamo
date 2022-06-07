import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthStatusService } from '../../../business-controller/auth-status.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormAuthStatusComponent } from './form-auth-status/form-auth-status.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: ['./auth-status.component.scss']
})
export class AuthStatusComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Estados de autorizaciones';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Nombre','Código'];
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
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditAuthStatus.bind(this),
            'delete': this.DeleteConfirmAuthStatus.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      code: {
        title: this.headerFields[2],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Estados del contrato',
      route: '../../setting/contract-status',
    },
  ];

  constructor(
    private AuthStatusS: AuthStatusService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewAuthStatus() {
    this.dialogFormService.open(FormAuthStatusComponent, {
      context: {
        title: 'Crear nueva estado de autorización',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAuthStatus(data) {
    this.dialogFormService.open(FormAuthStatusComponent, {
      context: {
        title: 'Editar estado de autorización',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmAuthStatus(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAuthStatus.bind(this),
      },
    });
  }

  DeleteAuthStatus(data) {
    return this.AuthStatusS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
