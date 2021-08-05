import {Component, OnInit} from '@angular/core';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {LmsIntegrationBusinessService} from '../../../business-controller/lms-integration-business.service';

@Component({
  selector: 'ngx-competences-activity',
  templateUrl: './competences-activity.component.html',
  styleUrls: ['./competences-activity.component.scss'],
})
export class CompetencesActivityComponent implements OnInit {
  title = 'Competencias Actividades';
  subtitle = 'Integración LMS';
  messageError = null;
  process_id;
  process_detail_id;
  activity_id;
  competence_id;
  routes = [];

  public processData: any = [
    {label: 'Proceso', value: ''},
    {label: 'Usuario que ejecuto', value: ''},
    {label: 'Estado', value: ''},
    {label: 'Message', value: ''},
    {label: 'Fecha de creación', value: ''},
  ];

  public settings = {
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
    this.process_id = this.route.snapshot.paramMap.get('process_id');
    this.process_detail_id = this.route.snapshot.paramMap.get('process_detail_id');
    this.activity_id = this.route.snapshot.paramMap.get('activity_id');
    this.competence_id = this.route.snapshot.paramMap.get('competence_id');

    this.routes = [
      {
        name: 'Procesos',
        route: '/pages/lms-integration',
      },
      {
        name: 'Detalle del proceso',
        route: `/pages/lms-integration/process/${this.process_id}/detail`,
      },
      {
        name: 'Actividades',
        route: `/pages/lms-integration/process/${this.process_id}/detail/${this.process_detail_id}/activities`,
      },
      {
        name: 'Competencias',
        route: `/pages/lms-integration/process/${this.process_id}/detail/${this.process_detail_id}/activities/${this.activity_id}/competences`,
      },
      {
        name: 'Competencias actividad',
        route: this.router.url,
      },
    ];

    this._serviceLmsIntegration.get('competition-activity', this.competence_id).then((response: any) => {
      const competition_activity = response.data.competition_activity;
      const competences = competition_activity.process_detail_activity_competence;

      this.processData = [
        {label: 'Proceso', value: competences.process_activity.process_detail.process.id},
        {label: 'Tipo', value: competences.process_activity.process_detail.process.process_type.name},
        {
          label: 'Usuario que ejecuto el proceso',
          value: `${competences.process_activity.process_detail.process.user.firstname} ${competences.process_activity.process_detail.process.user.lastname}`,
        },
        {
          label: 'Discente',
          value: `${competences.process_activity.process_detail.user.firstname} ${competences.process_activity.process_detail.user.lastname}`,
        },
        {label: 'Estado', value: competences.process_activity.process_detail.process.state.name},
        {label: 'Message', value: ''},
        {
          label: 'Fecha de creación',
          value: this.datepipe.transform(competences.process_activity.process_detail.process.created_at),
        },
      ];
    });
  }

  get queryParams() {
    return {
      process_d_a_c_id: this.competence_id,
    };
  }

  onBack() {
    this.router.navigateByUrl(`process/${this.process_id}/detail/${this.process_detail_id}/activities/${this.activity_id}/competences`);
  }

}
