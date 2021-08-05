import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-create-preliminary-budget',
  templateUrl: './create-preliminary-budget.component.html',
  styleUrls: ['./create-preliminary-budget.component.scss'],
})
export class CreatePreliminaryBudgetComponent implements OnInit {
  public title = 'Crear presupuesto preliminar';

  public routes = [
    {
      name: 'Presupuesto preliminar',
      route: '/pages/budget/preliminary',
    },
    {
      name: 'Crear',
      route: '/pages/budget/preliminary/create',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
