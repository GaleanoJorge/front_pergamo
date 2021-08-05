import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LmsIntegrationBusinessService} from '../../../business-controller/lms-integration-business.service';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-process-detail',
  templateUrl: './process-detail-enroll.component.html',
  styleUrls: ['./process-detail-enroll.component.scss'],
})
export class ProcessDetailEnrollComponent implements OnInit {
  title = 'Detalle del proceso';
  subtitle = 'Integración LMS';
  messageError = null;
  routes = [];

  process_id;
  process_detail_ids;

  processData: any = [
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
      process_detail_type: {
        title: 'Tipo',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value.name}`;
        },
      },
      process_detail_state: {
        title: 'Estado',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value.name}`;
        },

      },
      group: {
        title: 'Grupo',
        filter: false,
        valuePrepareFunction: (value) => {
          if (!value) return '';

          return `${value.name}`;
        },
      },
      user: {
        title: 'Discente',
        filter: false,
        valuePrepareFunction: (value) => {
          if (!value) return '';

          return `${value.firstname} ${value.lastname}`;
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
    this.process_detail_ids = this.route.snapshot.queryParams.process_detail_ids;

    this.routes = [
      {
        name: 'Procesos',
        route: '/pages/lms-integration',
      },
      {
        name: 'Enrolamiento',
        route: `/pages/lms-integration/process/${this.process_id}/enroll`,
      },
      {
        name: 'Detalle enrolamiento',
        route: this.router.url,
      },
    ];

    this._serviceLmsIntegration.get('process', this.process_id).then((response: any) => {
      const process = response.data.process;
      this.processData = [
        {label: 'Proceso', value: process.id},
        {label: 'Tipo', value: process.process_type.name},
        {
          label: 'Usuario que ejecuto el proceso',
          value: `${process.user.firstname} ${process.user.lastname}`,
        },
        {label: 'Estado', value: process.state.name},
        {label: 'Message', value: ''},
        {label: 'Fecha de creación', value: this.datepipe.transform(process.created_at)},
      ];
    });
  }

  get queryParams() {
    return {
      process_detail_ids: this.process_detail_ids,
    };
  }

  onBack() {
    this.router.navigateByUrl(`/pages/lms-integration/process/${this.process_id}/enroll`);
  }

}
