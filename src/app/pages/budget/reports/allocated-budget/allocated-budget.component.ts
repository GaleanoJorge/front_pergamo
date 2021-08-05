import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'ngx-allocated-budget',
  templateUrl: './allocated-budget.component.html',
  styleUrls: ['./allocated-budget.component.scss'],
})
export class AllocatedBudgetComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;

  public routes = [
    {
      name: 'Presupuesto asignado',
      route: '/pages/budget/reports/allocated-budget',
    },
  ];

  public settings = {
    columns: {
      program: {
        title: 'Programa',
      },
      subprogram: {
        title: 'Sub programa',
      },
      allocated_budget: {
        title: 'Proyectado',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      planned_budget: {
        title: 'Planeado',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      executed_budget: {
        title: 'Ejecutado',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      diff: {
        title: 'Diferencia',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
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
