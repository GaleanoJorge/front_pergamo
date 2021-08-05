import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-create-scales',
  templateUrl: './create-scales.component.html',
  styleUrls: ['./create-scales.component.scss'],
})
export class CreateScalesComponent implements OnInit {
  public title = 'Crear escala';
  public routeBack = '/pages/pollconfiguration/scales';
  public routes = [
    {
      name: 'Escalas',
      route: '/pages/pollconfiguration/scales',
    },
    {
      name: 'Crear',
      route: '/pages/pollconfiguration/scales/create',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
