import {Component, OnInit} from '@angular/core';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {LmsIntegrationBusinessService} from '../../../business-controller/lms-integration-business.service';

@Component({
  selector: 'ngx-competences-activities',
  templateUrl: './competences-activities.component.html',
  styleUrls: ['./competences-activities.component.scss'],
})
export class CompetencesActivitiesComponent implements OnInit {
  public loading: boolean = false;
  public source = [];
  public selectedItem;
  public idProcessDetail;
  public processData: any = [
    {label: 'Proceso', value: ''},
    {label: 'Usuario que ejecuto', value: ''},
    {label: 'Estado', value: ''},
    {label: 'Message', value: ''},
    {label: 'Fecha de creación', value: ''},
  ];

  public settings = {
    actions: false,
    noDataMessage: 'No se ha encontrado información',
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      competition: {
        title: 'Competencia',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value.name}`;
        },
      },
      activity: {
        title: 'Actividad',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value ? value.name : ''}`;
        },
      },
      /*rate: {
        title: 'Calificación',
        filter: false,
      },
      rate_desc: {
        title: 'Descripción de la calificación',
        filter: false,
      },
      proficiency: {
        title: 'Competencia',
        filter: false,
      },
      proficiency_desc: {
        title: 'Descripción de la competencia',
        filter: false,
      },*/
      /*actions: {
        title: 'Detalle',
        type: 'custom',
        width: '5%',
        sort: false,
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'btndetail': row.competition_activities.length > 0 ? true : false,
            'titleDetail': 'Actividades',
            'detail': this.viewCompetenceActivity.bind(this),
          };
        },
        renderComponent: ActionsTableLmsIntegrationComponent,
      },*/
    },
  };

  constructor(
    private datepipe: DateFormatPipe,
    private route: ActivatedRoute,
    private router: Router,
    private _serviceLmsIntegration: LmsIntegrationBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.idProcessDetail = this.route.snapshot.paramMap.get('id');
    if (this.idProcessDetail) {
      this.getData();
    }
  }

  getData() {
    this.loading = true;
    this._serviceLmsIntegration.get('competition-activity-byCourse', this.idProcessDetail).then(
      (response: any) => {
        this.source = response.data;
        if (response.data.length) {
          this.processData = [
            {label: 'Proceso', value: response.data[0].process_detail_activity_competence.process_activity.id},
            {
              label: 'Usuario que ejecuto',
              value: `${response.data[0].process_detail_activity_competence.process_activity.process_detail.process.user.firstname}
              ${response.data[0].process_detail_activity_competence.process_activity.process_detail.process.user.lastname}`,
            },
            {
              label: 'Estado',
              value: response.data[0].process_detail_activity_competence.process_activity.process_detail.process.state.name,
            },
            {label: 'Message', value: ''},
            {
              label: 'Fecha de creación',
              value: this.datepipe.transform(
                response.data[0].process_detail_activity_competence.process_activity.process_detail.process.created_at,
              ),
            },
          ];
        }

        this.loading = false;
      },
    );
  }

  onBack() {
    this.router.navigateByUrl(`/pages/course/list`);
  }

}
