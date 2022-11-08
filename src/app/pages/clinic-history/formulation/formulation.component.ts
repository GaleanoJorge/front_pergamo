import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActionsFormulationComponent } from './actions.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ChFormulationService } from '../../../business-controller/ch-formulation.service';

@Component({
  selector: 'ngx-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.scss'],
})
export class FormulationComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() admission: any = null;
  @Input() record_id;
  @Input() user;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha','Descripción','Dosis','Vía De Administración','Frecuencia Horaria ','Días De Tratamiento','Cant. Solic ','Observaciones'];
  public saveEntry: any = 0;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];

  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'assigned': this.assigned_management_plan,
            'user': this.users,
            'delete': this.DeleteConfirmFormulation.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsFormulationComponent,
      },

      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },

      product_generic_id: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return row.product_generic.description;
          } else {
            return 'No aplica'
          }
        },

      },
      dose: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value + ' ' + (row.product_generic.multidose_concentration ? row.product_generic.multidose_concentration.name : row.product_generic.measurement_units.code);
        },
      },
      administration_route: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },

      },
      hourly_frequency: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          return 'CADA ' + value.value + ' ' + row.hourly_frequency.name;
        },
      },
      treatment_days: {
        title: this.headerFields[5],
        width: 'string',
      },
      outpatient_formulation: {
        title: this.headerFields[6],
        width: 'string',
      },
      observation: {
        title: this.headerFields[7],
        width: 'string',
      },
    },
  };
  showButtom: boolean;
  assigned_management_plan: any;
  users: any;

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
    private viewFormulationS: ChRecordService,
    private formulationS: ChFormulationService,
    private toastService: NbToastrService,
    private deleteConfirmService: NbDialogService,

    ) {}

  async ngOnInit() {}

  Historic() {
    this.viewFormulationS.ViewAllFormulation(this.record_id).then(x => {

      //this.loadingDownload = false;
      this.toastService.success('', x.message);
      window.open(x.url, '_blank');

    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  DeleteConfirmFormulation(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteFormulation.bind(this),
      },
    });
  }

  DeleteFormulation(data) {
    return this.formulationS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

 
}
