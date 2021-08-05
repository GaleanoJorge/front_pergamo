import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {LinkSubprogramsComponent} from '../link-subprograms.component';

@Component({
  selector: 'ngx-consolidated-transport',
  templateUrl: './consolidated-transport.component.html',
  styleUrls: ['./consolidated-transport.component.scss'],
})
export class ConsolidatedTransportComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;

  public routes = [
    {
      name: 'Reporte consolidado transporte',
      route: '/pages/budget/reports/consolidated-transport',
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
            'type': 'transport',
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
