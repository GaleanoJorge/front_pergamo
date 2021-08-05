import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-create-origin',
  templateUrl: './create-origin.component.html',
  styleUrls: ['./create-origin.component.scss'],
})
export class CreateOriginComponent implements OnInit {
  public title = 'Crear plan de formación';
  public routes = [
    {
      name: 'Plan de formación',
      route: '/pages/educationalconfiguration/origin',
    },
    {
      name: 'Crear',
      route: '/pages/educationalconfiguration/origin/create',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
