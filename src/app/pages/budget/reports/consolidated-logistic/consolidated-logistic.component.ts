import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {LinkSubprogramsComponent} from '../link-subprograms.component';

@Component({
  selector: 'ngx-consolidated-logistic',
  templateUrl: './consolidated-logistic.component.html',
  styleUrls: ['./consolidated-logistic.component.scss'],
})
export class ConsolidatedLogisticComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;

  public routes = [
    {
      name: 'Reporte consolidado logístico',
      route: '/pages/budget/reports/consolidated-logistic',
    },
  ];

  public settings = {
    columns: {
      program: {
        title: 'Programa',
      },
      subprogram: {
        title: 'Sub programa',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'type': 'logistic',
          };
        },
        renderComponent: LinkSubprogramsComponent,
      },
      planned_budget: {
        title: 'Recursos asignados',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      executed_budget: {
        title: 'Compromisos',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      saldo: {
        title: 'Saldo por ejecutar',
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
