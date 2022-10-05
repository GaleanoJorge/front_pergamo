
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActionsInabilityComponent } from './actions.component';

@Component({
  selector: 'ngx-ch-inability',
  templateUrl: './ch-inability.component.html',
  styleUrls: ['./ch-inability.component.scss'],
})
export class ChInabilityComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Fecha','Prorroga', 'Codigo de Contingencia', 'Fecha de Inicio', 'Fecha Final', 'Cant de Días','Diagnostico', 'Tipo de Incapacidad', 'Tipo de Procedimiento', 'Observación',
    
  ];

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
        renderComponent: ActionsInabilityComponent,
      },
      
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
        },
      extension: {
        title: this.headerFields[1],
        type: 'string',
        },
      ch_contingency_code: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      
        initial_date: {
        title: this.headerFields[3],
        width: 'string',
        
      },
      final_date: {
        title: this.headerFields[4],
        width: 'string',
        
       },
       total_days: {
        title: this.headerFields[5],
        type: 'string',
        },
       diagnosis: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      ch_type_inability: {
        title: this.headerFields[7],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      ch_type_procedure: {
        title: this.headerFields[8],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      observation: {
        title: this.headerFields[9],
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
    ) {
      
    }

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
