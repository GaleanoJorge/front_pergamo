import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../../components/status-field/status-field.component';
import { Actions2Component } from './actions.component';
import { CurrencyPipe } from '@angular/common';
import { FormAccountReceivableComponent } from './form-account-receivable/form-account-receivable.component';
import { AccountReceivableService } from '../../../business-controller/account-receivable.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';


@Component({
  selector: 'ngx-account-receivable-list',
  templateUrl: './account-receivable-list.component.html',
  styleUrls: ['./account-receivable-list.component.scss']
})
export class AccountReceivableListComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Cuentas de Cobro';
  public subtitle: string = 'Historial';
  public headerFields: any[] = [ 'MES', 'VALOR', 'ESTADO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
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
            'edit': this.EditAccountReceivable.bind(this),
            'response': this.ResponseAccountReceivable.bind(this),
          };
        },
        renderComponent: Actions2Component,
      },
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.getMonthPretty(value);
        },
      },
      total_value_activities: {
        title: this.headerFields[1],
        type: 'string',
      },
      status_bill: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Cuentas de Cobro',
      route: '../../setting/account-receivable',
    },
  ];

  constructor(
    private AccountReceivableS: AccountReceivableService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private currency: CurrencyPipe,
    public datePipe: DateFormatPipe,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewAccountReceivable() {
    this.dialogFormService.open(FormAccountReceivableComponent, {
      context: {
        title: 'Crear nueva cuenta de cobro',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAccountReceivable(data) {
    this.dialogFormService.open(FormAccountReceivableComponent, {
      context: {
        title: 'Editar cuenta de cobro',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }
  ResponseAccountReceivable(data) {
    this.dialogFormService.open(FormAccountReceivableComponent, {
      context: {
        title: 'Responder cuenta de cobro',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    // this.AccountReceivableS.ChangeStatus(data.id).then((x) => {
    //   this.toastrService.success('', x.message);
    //   this.RefreshData();
    // }).catch((x) => {
    //   // this.toastrService.danger(x.message);
    // });
  }

}
