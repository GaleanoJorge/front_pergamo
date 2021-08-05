import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  tabs = [
    {
      title: 'Asignado vs proyectado vs ejecutado',
      route: '/pages/budget/reports/allocated-budget',
    },
    {
      title: 'Consolidado logístico',
      route: '/pages/budget/reports/consolidated-logistic',
    },
    {
      title: 'Consolidado transporte',
      route: '/pages/budget/reports/consolidated-transport',
    },
    {
      title: 'Resumen logístico',
      route: '/pages/budget/reports/summary-logistic',
    },
    {
      title: 'Resumen transporte',
      route: '/pages/budget/reports/summary-transport',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
