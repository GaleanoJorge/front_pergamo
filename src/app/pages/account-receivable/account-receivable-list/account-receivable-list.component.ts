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
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { AuthService } from '../../../services/auth.service';
import { FormRentReliefComponent } from './form-rent-relief/form-rent-relief.component';


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
  public headerFields: any[] = [ 'IDENTIFICACIÓN','NOMBRE','MES', 'VALOR', 'ESTADO', 'CÁLCULO PAGO SALUD-PENSIÓN'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public roles = [];
  public entity;
  public user;
  public currentRole;

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
            'rent': this.RentAccountReceivable.bind(this),
            'view': this.ViewSourceRetention.bind(this),
          };
        },
        renderComponent: Actions2Component,
      },
      'user.identification': {
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
          return value.firstname + value.lastname;
        },
      },
      created_at: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.getMonthPretty(value);
        },
      },
      gross_value_activities: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
        
      },
      status_bill: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      payment: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          var result = 0;
          if(row.gross_value_activities >= row.minimum_salary.value && row.gross_value_activities*0.4 <= row.minimum_salary.value) {
            var result = row.minimum_salary.value*0.295;
          } else if (row.gross_value_activities*0.4 > row.minimum_salary.value) {
           result = row.gross_value_activities*0.4*0.295; 
          }
          return this.currency.transform(result);
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
    public roleBS: RoleBusinessService,
    private deleteConfirmService: NbDialogService,
    private authService: AuthService,

  
  ) {
  }

 async ngOnInit() {
    this.user = this.authService.GetUser();
    this.currentRole = this.authService.GetRole();
    await this.roleBS.GetCollection({ id: this.currentRole }).then(x => {
      this.roles = x;
    }).catch(x => { });
   if( this.roles[0].role_type_id == 2){
    this.entity='account_receivable/byUser/' + this.user.id;
   }else{
    this.entity='account_receivable/byUser/0';

   }

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

  RentAccountReceivable(data) {
    this.dialogFormService.open(FormRentReliefComponent, {
      context: {
        title: 'Alivios de renta cuenta de cobro',
        data,
        procedence: 0,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ViewSourceRetention(data) {
    this.dialogFormService.open(FormRentReliefComponent, {
      context: {
        title: 'Soportes de cuenta de cobro',
        data,
        procedence: 1,
        saved: this.RefreshData.bind(this),
      },
    });
  }
}
