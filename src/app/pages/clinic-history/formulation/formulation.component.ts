import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActionsFormulationComponent } from './actions.component';

@Component({
  selector: 'ngx-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.scss'],
})
export class FormulationComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
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

      product_id: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return row.product_generic.description;
        },

      dose: {
        title: this.headerFields[2],
        width: 'string',
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
          return 'CADA ' +value.value + '-' + row.hourly_frequency.name;
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
    public datePipe: DateFormatPipe
    ) {}

  async ngOnInit() {}

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

 
}
