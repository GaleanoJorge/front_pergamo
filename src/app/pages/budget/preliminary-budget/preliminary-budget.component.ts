import {Component, OnInit} from '@angular/core';
import {ActionsPreliminaryBudgetComponent} from './actions-preliminary-budget.component';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'ngx-preliminary-budget',
  templateUrl: './preliminary-budget.component.html',
  styleUrls: ['./preliminary-budget.component.scss'],
})
export class PreliminaryBudgetComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Presupuesto preliminar';
  public subtitle: string = 'Presupuesto';

  public routes = [
    {
      name: 'Presupuesto preliminar',
      route: '/pages/budget/preliminary',
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
            // 'delete': this.DeleteConfirm.bind(this),
          };
        },
        renderComponent: ActionsPreliminaryBudgetComponent,
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
      total: {
        title: 'Total',
        valuePrepareFunction: (value) => {
          return this.currency.transform(value);
        },
      },
      nombre_completo: {
        title: 'Coordinador',
      },
      status: {
        title: 'Estado',
      },
      approved_date: {
        title: 'Fecha de aprobación',
      },
    },
  };

  constructor(
    private currency: CurrencyPipe,
  ) {
  }

  ngOnInit(): void {
  }

}
