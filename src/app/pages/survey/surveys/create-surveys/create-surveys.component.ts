import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-create-surveys',
  templateUrl: './create-surveys.component.html',
  styleUrls: ['./create-surveys.component.scss'],
})
export class CreateSurveysComponent implements OnInit {
  public title = 'Crear Plantilla';
  public routes = [
    {
      name: 'Plantillas',
      route: '/pages/survey/surveys',
    },
    {
      name: 'Crear',
      route: '/pages/survey/surveys/create',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
