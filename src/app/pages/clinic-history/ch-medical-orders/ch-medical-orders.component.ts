import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActionsMedicalOrderComponent } from './actions.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ChMedicalOrdersService } from '../../../business-controller/ch-medical-orders.service';

@Component({
  selector: 'ngx-ch-medical-orders',
  templateUrl: './ch-medical-orders.component.html',
  styleUrls: ['./ch-medical-orders.component.scss'],
})
export class ChMedicalOrdersComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() admission: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Fecha',
    'Orden Medica  Ambulatoria',
    'Procedimiento',
    'Cantidad',
    'Frecuencia',
    'Observaciones',

  ];
  
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;
  

  public settings = {
    pager: {
      display: true,
      perPage: 10,
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
            'delete': this.DeleteConfirmMedicalOrden.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsMedicalOrderComponent,
      },
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
        },
      ambulatory_medical_order: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value;
          } else {
            return 'No'
          }
        },
      },
      procedure: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      amount: {
        title: this.headerFields[3],
        width: 'string',
      },
      frequency: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      observations: {
        title: this.headerFields[5],
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
    private allOrdersS: ChRecordService,
    private toastService: NbToastrService,
    private medicalOrdersS: ChMedicalOrdersService,
    private deleteConfirmService: NbDialogService,
    ) {}

  async ngOnInit() {
  }

    Historic() {
      this.allOrdersS.ViewAllMedicalOrder(this.record_id).then(x => {
  
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

  DeleteConfirmMedicalOrden(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteMedicalOrden.bind(this),
      },
    });
  }

  DeleteMedicalOrden(data) {
    return this.medicalOrdersS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
