import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionsExecutedBudgetComponent} from './actions-executed-budget.component';
import {EventBusinessService} from '../../../../business-controller/event-business.service';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {NbDialogService} from '@nebular/theme';
import {BaseTableComponent} from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-executed-budget-list',
  templateUrl: './executed-budget-list.component.html',
  styleUrls: ['./executed-budget-list.component.scss'],
})
export class ExecutedBudgetListComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Presupuesto ejecutado';
  public subtitle: string = 'Presupuesto';

  public routes = [
    {
      name: 'Presupuesto ejecutado',
      route: '/pages/budget/executed/list',
    },
  ];

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            closeBudget: this.closeBudget.bind(this),
          };
        },
        renderComponent: ActionsExecutedBudgetComponent,
      },
      city: {
        title: 'Ciudad',
      },
      name: {
        title: 'Actividad',
      },
      program: {
        title: 'Programa',
      },
      subprogram: {
        title: 'Sub programa',
      },
      nombre_completo: {
        title: 'Coordinador',
      },
      n_logistic: {
        title: 'Logísticos',
      },
      n_transport: {
        title: 'Transportes',
      },
      n_extras: {
        title: 'Extras',
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private eventBS: EventBusinessService,
    private dialogFormService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  closeBudget(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        title: 'Cerrar evento',
        textConfirm: 'Cerrar',
        name: data.name,
        data: data,
        delete: this.closeEvent.bind(this),
      },
    });
  }

  closeEvent(data) {
    return this.eventBS.CloseEvent(data.id).then((x) => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
