import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LmsIntegrationBusinessService} from '../../../business-controller/lms-integration-business.service';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';
import {ActionsTableLmsIntegrationComponent} from '../components/actions-table/actions-table-lms-integration.component';

@Component({
  selector: 'ngx-process-detail-activity',
  templateUrl: './process-detail-activity.component.html',
  styleUrls: ['./process-detail-activity.component.scss'],
})
export class ProcessDetailActivityComponent implements OnInit {
  title = 'Actividades';
  subtitle = 'Integración LMS';
  messageError = null;
  process_id;
  process_detail_id;
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
      activity_lms: {
        title: 'Actividad',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value.name}`;
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
      actions: {
        title: 'Detalle',
        type: 'custom',
        sort: false,
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'btndetail': row.rubrics.length > 0 ? true : false,
            'titleDetailt': 'Rúbricas',
            'btnCompetence': row.competences.length > 0 ? true : false,
            'detail': this.viewRubrics.bind(this),
            'competences': this.viewCompetences.bind(this),
          };
        },
        renderComponent: ActionsTableLmsIntegrationComponent,
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
        route: this.router.url,
      },
    ];

    this._serviceLmsIntegration.get('process-details', this.process_detail_id).then((response: any) => {
      const process_detail = response.data.process_detail;
      this.processData = [
        {label: 'Proceso', value: process_detail.process.id},
        {label: 'Tipo', value: process_detail.process.process_type.name},
        {
          label: 'Usuario que ejecuto el proceso',
          value: `${process_detail.process.user.firstname} ${process_detail.process.user.lastname}`,
        },
        {
          label: 'Discente',
          value: `${process_detail.user.firstname} ${process_detail.user.lastname}`,
        },
        {label: 'Estado', value: process_detail.process.state.name},
        {label: 'Message', value: ''},
        {label: 'Fecha de creación', value: this.datepipe.transform(process_detail.process.created_at)},
      ];
    });
  }

  get queryParams() {
    return {
      process_detail_id: this.process_detail_id,
    };
  }

  viewRubrics(data) {
    this.router.navigateByUrl(`/pages/lms-integration/process/${this.process_id}/detail/${this.process_detail_id}/activities/${data.id}/rubrics`);
  }

  viewCompetences(data) {
    this.router.navigateByUrl(`/pages/lms-integration/process/${this.process_id}/detail/${this.process_detail_id}/activities/${data.id}/competences`);
  }

  onBack() {
    this.router.navigateByUrl(`/pages/lms-integration/process/${this.process_id}/detail`);
  }

}
