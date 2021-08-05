import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LmsIntegrationBusinessService} from '../../../business-controller/lms-integration-business.service';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';
import {ActionsTableLmsIntegrationComponent} from '../components/actions-table/actions-table-lms-integration.component';

@Component({
  selector: 'ngx-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss'],
})
export class ProcessDetailComponent implements OnInit {
  title = 'Detalle del proceso';
  subtitle = 'Integración LMS';
  messageError = null;
  routes = [
    {
      name: 'Procesos',
      route: '/pages/lms-integration',
    },
    {
      name: 'Detalle del proceso',
      route: this.router.url,
    },
  ];

  process_id;

  processData: any = [
    {label: 'Proceso', value: ''},
    {label: 'Usuario que ejecuto', value: ''},
    {label: 'Estado', value: ''},
    {label: 'Message', value: ''},
    {label: 'Fecha de creación', value: ''},
  ];

  public settings = {
    columns: {
      group: {
        title: 'Grupo',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value.name}`;
        },
      },
      user: {
        title: 'Discente',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value.firstname} ${value.lastname}`;
        },
      },
      actions: {
        title: 'Detalle',
        type: 'custom',
        sort: false,
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'btndetail': true,
            'detail': this.viewActivity.bind(this),
            'titleDetail': 'Actividades',
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
    this.process_id = this.route.snapshot.paramMap.get('id');
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
      process_id: this.process_id,
    };
  }

  viewActivity(data) {
    this.router.navigateByUrl(`/pages/lms-integration/process/${this.process_id}/detail/${data.id}/activities`);
  }

  onBack() {
    this.router.navigateByUrl(`/pages/lms-integration`);
  }

}
