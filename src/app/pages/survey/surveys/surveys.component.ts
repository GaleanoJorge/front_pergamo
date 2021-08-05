import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionsComponent} from './actions.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {NbDialogService} from '@nebular/theme';
import {SurveyBusinessService} from '../../../business-controller/survey-business.service';
import {BaseTableComponent} from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
})
export class SurveysComponent implements OnInit {
  public data: any[] = [];
  public messageError: string = null;
  public dialog;
  public headerFields: any[] = ['Tipo', 'Nombre', 'Secciones', 'Asignaciones'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]} , ${this.headerFields[3]}`;
  public title = 'Plantillas';
  public subtitle = '';

  public routes = [
    {
      name: 'Plantillas',
      route: '/pages/survey/surveys',
    },
  ];

  public settings = {

    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'delete': this.DeleteConfirmSurvey.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      /*id: {
        title: 'ID',
      },*/
      type: {
        title: this.headerFields[0],
      },
      name: {
        title: this.headerFields[1],
      },
      n_sections: {
        title: `# ${this.headerFields[2]}`,
      },
      n_assigs: {
        title: `# ${this.headerFields[3]}`,
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private deleteConfirmService: NbDialogService,
    private surveyBS: SurveyBusinessService,
  ) {
  }

  ngOnInit(): void {
  }

  DeleteConfirmSurvey(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSurvey.bind(this),
      },
    });
  }

  DeleteSurvey(data) {
    return this.surveyBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
