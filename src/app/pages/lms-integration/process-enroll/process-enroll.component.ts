import { Component, OnInit } from '@angular/core';
import {ActionsTableLmsIntegrationComponent} from '../components/actions-table/actions-table-lms-integration.component';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {LmsIntegrationBusinessService} from '../../../business-controller/lms-integration-business.service';

@Component({
  selector: 'ngx-process-enroll',
  templateUrl: './process-enroll.component.html',
  styleUrls: ['./process-enroll.component.scss'],
})
export class ProcessEnrollComponent implements OnInit {
  title = 'Detalle del proceso';
  subtitle = 'Integración LMS';
  messageError = null;
  routes = [
    {
      name: 'Procesos',
      route: '/pages/lms-integration',
    },
    {
      name: 'Enrolamiento',
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
      name: {
        title: 'Tipo',
        filter: false,
      },
      cantidad_creado: {
        title: 'Cantidad creados',
        filter: false,
      },
      cantidad_actualizado: {
        title: 'Cantidad actualizados',
        filter: false,
      },
      cantidad_error: {
        title: 'Cantidad errores',
        filter: false,
      },
      actions: {
        title: 'Detalle',
        type: 'custom',
        sort: false,
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'btndetail': true,
            'detail': this.viewDetail.bind(this),
            'titleDetail': 'Detalle enrolamiento',
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
  ) { }

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

  viewDetail(data) {
    this.router.navigate([`/pages/lms-integration/process/${this.process_id}/enroll/detail`], {
      queryParams: {
        process_detail_ids: data.process_detail_ids,
      },
    });
  }

  onBack() {
    this.router.navigateByUrl(`/pages/lms-integration`);
  }
}
