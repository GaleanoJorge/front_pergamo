import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../../components/status-field/status-field.component';
import { Actions2Component } from './actions.component';
import { CurrencyPipe } from '@angular/common';
import { FormAccountReceivableComponent } from './form-account-receivable/form-account-receivable.component';
import { AccountReceivableService } from '../../../business-controller/account-receivable.service';


@Component({
  selector: 'ngx-account-receivable-list',
  templateUrl: './account-receivable-list.component.html',
  styleUrls: ['./account-receivable-list.component.scss']
})
export class AccountReceivableListComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Ambito de Glosas';
  public subtitle: string = 'Ambito';
  public headerFields: any[] = [ 'CC', 'NOMBRE', 'SEDE', 'AMBITO', 'VALOR', 'ESTADO'];
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
          };
        },
        renderComponent: Actions2Component,
      },
      identification: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.user.identification;
        },
      },
      user: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.firstname + ' ' + value.lastname;
        },
      },
      campus: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      gloss_ambit: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      total_value_activities: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      }, 
      status_bill: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Ambito de glosas',
      route: '../../setting/account-receivable',
    },
  ];

  constructor(
    private AccountReceivableS: AccountReceivableService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private currency: CurrencyPipe,
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
        title: 'Crear nuevo ambito de glosa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAccountReceivable(data) {
    this.dialogFormService.open(FormAccountReceivableComponent, {
      context: {
        title: 'Editar ambito de glosa',
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
