import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-students',
  templateUrl: './form-students.component.html',
  styleUrls: ['./form-students.component.scss'],
})
export class FormStudentsComponent implements OnInit {

  public routes = [
    {
      name: 'Discentes',
      route: '../../../student/students',
    },
    {
      name: 'Crear',
      route: '../../../student/students/create',
    },
  ];

  public role = 5;
  public title = 'Crear discente';

  constructor() {
  }

  ngOnInit(): void {
  }
}
