import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionsContractsComponent} from './actions-contracts.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {NbDialogService} from '@nebular/theme';
import {BudgetContractsBussinesService} from '../../../business-controller/budget-contracts-bussines.service';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'ngx-contratcs',
  templateUrl: './contratcs.component.html',
  styleUrls: ['./contratcs.component.scss'],
})
export class ContratcsComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Contratos';
  public subtitle: string = 'Presupuesto';

  public routes = [
    {
      name: 'Contratos',
      route: '/pages/budget/contracts',
    },
  ];

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'delete': this.DeleteConfirm.bind(this),
          };
        },
        renderComponent: ActionsContractsComponent,
      },
      code: {
        title: 'Código',
      },
      contract_value: {
        title: 'Valor del contrato',
        valuePrepareFunction: (value, data) => {
          return this.currency.transform(value);
        },
      },
      nombre_completo: {
        title: 'Proveedor',
      },
      value_payments: {
        title: 'Valor en pagos',
        valuePrepareFunction: (value, data) => {
          return this.currency.transform(value ?? 0);
        },
      },
      n_events: {
        title: '# Eventos',
      },
      n_payments: {
        title: '# Pagos',
      },
    },
  };

  constructor(
    private dialogFormService: NbDialogService,
    private contractBS: BudgetContractsBussinesService,
    private currency: CurrencyPipe,
  ) {
  }

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  ngOnInit(): void {
  }

  DeleteConfirm(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.code,
        data: data,
        delete: this.DeleteContract.bind(this),
      },
    });
  }

  refreshData() {
    this.table.refresh();
  }

  DeleteContract(data) {
    return this.contractBS.Delete(data.id).then(x => {
      this.refreshData();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
