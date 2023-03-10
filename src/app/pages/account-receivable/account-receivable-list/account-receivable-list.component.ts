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
import { FormLocationCapacityComponent } from '../../setting/location-capacity/sigle-location-capacity/form-location-capacity/form-location-capacity.component';
import { FormConfirmPayComponent } from './form-confirm-pay/form-confirm-pay.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractTypeService } from '../../../business-controller/contract-type.service';
import { ActionsSemaphoreComponent } from './actions-semaphore.component';

@Component({
  selector: 'ngx-account-receivable-list',
  templateUrl: './account-receivable-list.component.html',
  styleUrls: ['./account-receivable-list.component.scss']
})
export class AccountReceivableListComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'CUENTAS DE COBRO';
  public subtitle: string = 'Historial';
  public headerFields: any[] = ['IDENTIFICACIÓN', 'NOMBRE', 'MES', 'VALOR BRUTO', 'VALOR NETO', 'ESTADO', 'CÁLCULO SEGURIDAD SOCIAL SUGERIDO DEL PRÓXIMO MES', 'OBSERVACIÓN', 'TIPO DE IDENTIFICACIÓN'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public roles = [];
  public entity;
  public contract_type;
  public user;
  public currentRole;
  public settings;
  public campus_id;
  public done = false;
  public show_back = true;
  public form: FormGroup;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings1 = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'role_type': this.currentRole.role_type_id,
            'edit': this.EditAccountReceivable.bind(this),
            'pay': this.PayAccountReceivable.bind(this),
            'rent': this.RentAccountReceivable.bind(this),
            'view': this.ViewSourceRetention.bind(this),
            'generate_file': this.GenerateFile.bind(this),
            'group': false,
          };
        },
        renderComponent: Actions2Component,
      },
      semaphore: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionsSemaphoreComponent,
      },
      created_at: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.title += ' DE: ' + row.user.firstname + ' ' + row.user.lastname;
            this.done = true;
          }
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
      net_value_activities: {
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
      payment: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          var result = 0;
          if (row.gross_value_activities >= row.minimum_salary.value && row.gross_value_activities * 0.4 <= row.minimum_salary.value) {
            var result = row.minimum_salary.value * 0.295;
          } else if (row.gross_value_activities * 0.4 > row.minimum_salary.value) {
            result = row.gross_value_activities * 0.4 * 0.295;
          }
          return this.currency.transform(result);
        },
      },
      observation: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction(value) {
          return value != null ? value : '';
        }
      },
    },
  };

  public settings2 = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'role_type': this.currentRole.role_type_id,
            'edit': this.EditAccountReceivable.bind(this),
            'pay': this.PayAccountReceivable.bind(this),
            'rent': this.RentAccountReceivable.bind(this),
            'view': this.ViewSourceRetention.bind(this),
            'generate_file': this.GenerateFile.bind(this),
            'group': true,
          };
        },
        renderComponent: Actions2Component,
      },
      semaphore: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionsSemaphoreComponent,
      },
      'user.identification_type': {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.user.identification_type.name;
        },
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
          return value.firstname + ' ' + value.lastname;
        },
      },
      observation: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction(value) {
          return value != null ? value : '';
        }
      },
    },
  };

  public routes = [
    {
      name: 'Cuentas de Cobro',
      route: '/pages/account-receivable/list',
    },
  ];

  constructor(
    private AccountReceivableS: AccountReceivableService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private currency: CurrencyPipe,
    public datePipe: DateFormatPipe,
    public roleBS: RoleBusinessService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private ContractTypeS: ContractTypeService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.campus_id = +localStorage.getItem('campus');
    var curr = this.authService.GetRole();
    this.currentRole = this.user.roles.find(x => {
      return x.id == curr;
    });
    await this.roleBS.GetCollection({ id: this.currentRole.id }).then(x => {
      this.roles = x;
    }).catch(x => { });
    if (this.currentRole.role_type_id == 2) {
      this.entity = 'account_receivable/byUser/' + this.user.id;
      this.settings = this.settings1;
    } else {
      if (this.route.snapshot.params.id) {
        this.entity = 'account_receivable/byUser/' + this.route.snapshot.params.id;
        this.settings = this.settings1;
      } else {
        this.show_back = false;
        this.title = 'Personal Asistencial';
        this.subtitle = '';
        this.settings = this.settings2;
        this.entity = 'account_receivable/byUser/0?campus_id=' + this.campus_id;
      }
      // this.settings = this.settings2;
      // this.entity = 'account_receivable/byUser/0';

    }

    this.ContractTypeS.GetCollection().then(x => {
      this.contract_type = x;
    });


    this.form = this.formBuilder.group({
      contract_type_id: [''],
    });

    this.form.get('contract_type_id').valueChanges.subscribe(val => {
      this.changeEntity(val);
    });

  }

  back() {
    this.location.back();

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

  PayAccountReceivable(data) {
    this.dialogFormService.open(FormConfirmPayComponent, {
      context: {
        title: 'Pagar cuenta de cobro',
        data: data,
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
        capacity: this.NewSigleLocationCapacity.bind(this),
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

  GenerateFile(data) {
    this.AccountReceivableS.GenerateFile(data.id, { user_id: this.user.id }).then(x => {
      this.toastrService.success('Archivo generado con exito', 'Exito');
      window.open(x['url'], '_blank');
    }).catch(x => {
      this.toastrService.danger('Error al generar archivo: ' + x, 'Error');
    });
  }

  NewSigleLocationCapacity(data) {
    // var closeOnBackdropClick = false;
    this.dialogFormService.open(FormLocationCapacityComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Editar capacidad instalada',
        data: {
          id: data,
        },
        procedence: 2,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  changeEntity(val) {
    this.table.changeEntity(this.entity + '&contract_type_id=' + val , 'account_receivable');
  }
}
