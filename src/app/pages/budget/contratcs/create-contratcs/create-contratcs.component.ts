import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-create-contratcs',
  templateUrl: './create-contratcs.component.html',
  styleUrls: ['./create-contratcs.component.scss'],
})
export class CreateContratcsComponent implements OnInit {
  public title = 'Crear contrato';

  public routes = [
    {
      name: 'Contratos',
      route: '/pages/budget/contracts',
    },
    {
      name: 'Crear',
      route: '/pages/budget/contracts/create',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
