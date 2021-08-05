import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-create-concept-base',
  templateUrl: './create-concept-base.component.html',
  styleUrls: ['./create-concept-base.component.scss'],
})
export class CreateConceptBaseComponent implements OnInit {
  public title = 'Crear concepto';

  public routes = [
    {
      name: 'Conceptos',
      route: '/pages/budget/concepts',
    },
    {
      name: 'Crear',
      route: '/pages/budget/concepts/create',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
