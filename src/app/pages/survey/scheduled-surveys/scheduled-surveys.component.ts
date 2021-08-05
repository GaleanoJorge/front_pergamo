import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionsScheduledComponent} from './actions-scheduled.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {NbDialogService} from '@nebular/theme';
import {SurveyScheduledBusinessService} from '../../../business-controller/survey-scheduled-business.service';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {SurveyBusinessService} from '../../../business-controller/survey-business.service';

@Component({
  selector: 'ngx-scheduled-surveys',
  templateUrl: './scheduled-surveys.component.html',
  styleUrls: ['./scheduled-surveys.component.scss'],
})
export class ScheduledSurveysComponent implements OnInit {

  public survey_id = null;
  public messageError: string = null;
  public title = 'Encuestas programadas';
  public headerFields: any[] = ['Encuesta', 'Objetivo', 'Disponibilidad', 'Participantes'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;
  public subtitle = '';
  public survey = null;
  public routeBack = null;

  public routes = [
    {
      name: 'Encuestas programadas',
      route: '/pages/survey/scheduled-surveys',
    },
  ];

  public settings: any = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'delete': this.DeleteConfirmScheduled.bind(this),
          };
        },
        renderComponent: ActionsScheduledComponent,
      },
      survey_name: {
        title: this.headerFields[0],
      },
      objetivo: {
        title: this.headerFields[1],
      },
      disponibilidad: {
        title: this.headerFields[2],
        /*valuePrepareFunction: (value, row) => {
          let init_data = new Date(row.dt_init);
          let finish_date = new Date(row.dt_finish);
          return this.datepipe.convertoToAMPM(row.dt_init);
        },*/
      },
      participantes: {
        title: this.headerFields[3],
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private surveyBS: SurveyBusinessService,
    private surveyScheduledBS: SurveyScheduledBusinessService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.survey_id = this.route.snapshot.params.survey_id ?? null;

    if (this.survey_id) {
      delete this.settings.columns.survey_name;
      this.routes = [
        {
          name: 'Plantillas',
          route: '/pages/survey/surveys',
        },
      ];

      this.surveyBS.GetOne(this.survey_id).then(x => {
        this.survey = x;
        this.subtitle = 'Encuesta: ' + this.survey.name;
        this.routes.push({
          name: 'Encuestas programadas ' + this.survey.name,
          route: this.router.url,
        });
      });

      this.routeBack = '/pages/survey/surveys';
    }
  }

  get params() {
    const params: any = {};

    if (this.survey_id) {
      params.survey_id = this.survey_id;
    }

    return params;
  }

  DeleteConfirmScheduled(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteScheduled.bind(this),
      },
    });
  }

  DeleteScheduled(data) {
    return this.surveyScheduledBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
