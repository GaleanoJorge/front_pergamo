import {Component, OnInit} from '@angular/core';
import {ActionsListComponent} from './actions-list.component';

@Component({
  selector: 'ngx-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.scss'],
})
export class MySurveysComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Mis Encuestas';
  public headerFields: any[] = ['Tipo', 'Encuesta', 'Disponibilidad', 'Secciones'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            /*'success': () => this.router.navigate(['/pages/survey/summary-surveys/' + btoa(row.id)]),
            'missing': () => this.router.navigate(['/pages/survey/surveys/' + btoa(row.id)]),*/
          };
        },
        renderComponent: ActionsListComponent,
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
      },
      survey_instance: {
        title: 'Encuesta',
        type: 'string',
        valuePrepareFunction(value) {
          return value?.description;
        },
      },
      available: {
        title: 'Disponibilidad',
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.survey_instance?.disponibilidad;
        },
      },
      secciones: {
        title: 'Secciones',
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Encuestas',
      route: '../surveys/list-surveys',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
