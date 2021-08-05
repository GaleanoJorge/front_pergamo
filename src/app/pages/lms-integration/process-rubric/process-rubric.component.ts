import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LmsIntegrationBusinessService} from '../../../business-controller/lms-integration-business.service';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';
import {ActionsTableLmsIntegrationComponent} from '../components/actions-table/actions-table-lms-integration.component';

@Component({
  selector: 'ngx-process-rubric',
  templateUrl: './process-rubric.component.html',
  styleUrls: ['./process-rubric.component.scss'],
})
export class ProcessRubricComponent implements OnInit {
  title = 'Competencias';
  subtitle = 'Integración LMS';
  messageError = null;
  process_id;
  process_detail_id;
  activity_id;
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
      rubric: {
        title: 'Actividad',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value.activity_lms.name}`;
        },
      },
      grade: {
        title: 'Calificación',
        filter: false,
      },
      observation: {
        title: 'Observación',
        filter: false,
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
        name: 'Rúbricas',
        route: this.router.url,
      },
    ];

    this._serviceLmsIntegration.get('process-details-activity-competences', this.activity_id).then((response: any) => {

      const competences = response.data.process_details_activity_competence;

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
      process_d_a_id: this.activity_id,
    };
  }

  onBack() {
    this.router.navigateByUrl(`/pages/lms-integration/process/${this.process_id}/detail/${this.process_detail_id}/activities`);
  }

}
