import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss'],
})
export class CreateTeacherComponent implements OnInit {

  public routes = [
    {
      name: 'Formadores',
      route: '../../../teacher/teachers',
    },
    {
      name: 'Crear',
      route: '../../../teacher/teachers/create',
    },
  ];

  public role = 4;
  public title = 'Crear formador';

  constructor() {
  }

  ngOnInit(): void {
  }

}
