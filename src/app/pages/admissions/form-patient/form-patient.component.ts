import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss'],
})
export class FormPatientComponent implements OnInit {

  public routes = [
    {
      name: 'Pacientes',
      route: '../../../admissions/list',
    },
    {
      name: 'Crear',
      route: '../../../admissions/patient/create',
    },
  ];

  public title = 'Crear Paciente';

  constructor() {
  }

  ngOnInit(): void {
  }
}
