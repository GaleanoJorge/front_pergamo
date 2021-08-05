import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-summary-transport',
  templateUrl: './summary-transport.component.html',
  styleUrls: ['./summary-transport.component.scss'],
})
export class SummaryTransportComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;

  public routes = [
    {
      name: 'Reporte resumen transporte',
      route: '/pages/budget/reports/summary-transporte',
    },
  ];

  public settings = {
    columns: {
      nombre_completo: {
        title: 'Coordinador',
      },
      city: {
        title: 'Sede',
      },
      program: {
        title: 'Programa',
      },
      subprogram: {
        title: 'Sub programa',
      },
      name: {
        title: 'Nombre del acto académico',
      },
      initial_date: {
        title: 'Fecha inicio',
      },
      final_date: {
        title: 'Fecha final',
      },
      summoned_participants: {
        title: '# discentes proyectados',
      },
      executed_budget: {
        title: 'Valor ejecutado',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
    },
  };

  constructor(
    private currency: CurrencyPipe,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  getParams() {
    const params: any = {};
    const subprogram_id = this.route.snapshot.queryParamMap.get('subprogram_id');
    if (subprogram_id) {
      params.subprogram_id = subprogram_id;
    }
    return params;
  }

}
