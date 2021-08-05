import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LmsIntegrationBusinessService} from '../../../business-controller/lms-integration-business.service';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';
import {ActionsTableLmsIntegrationComponent} from '../components/actions-table/actions-table-lms-integration.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-data-integration',
  templateUrl: './data-integration.component.html',
  styleUrls: ['./data-integration.component.scss'],
})
export class DataIntegrationComponent implements OnInit {
  title = 'Procesos ejecutados';
  subtitle = 'Integración LMS';
  messageError = null;
  routes = [
    {
      name: 'Procesos',
      route: '/pages/lms-integration',
    },
  ];

  public loading: boolean = false;
  public selectedItem;
  public user: any;

  public settings = {
    columns: {
      process_type: {
        title: 'Tipo',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value.name}`;
        },
      },
      user: {
        title: 'Usuario que ejecuto',
        filter: false,
        valuePrepareFunction: (value) => {
          return `${value.firstname} ${value.lastname}`;
        },
      },
      state: {
        title: 'Estado',
        filter: false,
      },
      message: {
        title: 'Mensaje',
        filter: false,
      },
      created_at: {
        title: 'Fecha de creación',
        filter: false,
        valuePrepareFunction: ((value) => {
          return this.datepipe.transform(value);
        }).bind(this),
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
            'titleDetail': 'Detalle del proceso',
          };
        },
        renderComponent: ActionsTableLmsIntegrationComponent,
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private _serviceLmsIntegration: LmsIntegrationBusinessService,
    private router: Router,
    private datepipe: DateFormatPipe,
    private _toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  RefreshTable() {
    this.table.refresh(this.queryParams);
  }

  changeType($event) {
    this.RefreshTable();
  }

  get queryParams() {
    const data: any = {};
    if (this.selectedItem) {
      data.process_type_id = this.selectedItem;
    }
    return data;
  }

  getEnrolllment() {
    this.loading = true;
    this._serviceLmsIntegration.getAll('lms-enrollment', this.user.id).then(
      (response: any) => {
        this.RefreshTable();
        this.loading = false;
      },
    );
  }

  getRatings() {
    this.loading = true;
    this._serviceLmsIntegration.getAll('lms-ratings', this.user.id).then(
      (response: any) => {
        this.RefreshTable();
        this.loading = false;
      },
    );
  }

  viewDetail(data) {
    if (data.process_type_id === 1) {
      this.router.navigateByUrl(`/pages/lms-integration/process/${data.id}/enroll`);
    } else {
      this.router.navigateByUrl(`/pages/lms-integration/process/${data.id}/detail`);
    }
  }

  handleData() {
    switch (this.selectedItem) {
      case '1':
        this.getEnrolllment();
        break;
      case '2':
        this.getRatings();
        break;
      default:
        this._toastService.warning('', 'Seleccione un tipo de proceso a ejecutar');
    }
  }

}
