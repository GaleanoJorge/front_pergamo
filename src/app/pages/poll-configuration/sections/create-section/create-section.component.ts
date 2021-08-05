import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss'],
})
export class CreateSectionComponent implements OnInit {
  public title = 'Crear sección';
  public routes = [
    {
      name: 'Secciones',
      route: '/pages/pollconfiguration/sections',
    },
    {
      name: 'Crear',
      route: '/pages/pollconfiguration/sections/create',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
