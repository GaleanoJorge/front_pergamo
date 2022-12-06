import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActionsInterconsultationComponent } from './actions.component';

@Component({
  selector: 'ngx-ch-interconsultation',
  templateUrl: './ch-interconsultation.component.html',
  styleUrls: ['./ch-interconsultation.component.scss'],
})
export class ChInterconsultationComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Fecha',
    'Especialidad',
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
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsInterconsultationComponent,
      },
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },
      specialty: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.id + '-' + row.specialty.name;
         
        },
      },
      amount: {
        title: this.headerFields[2],
        width: 'string',
      },
      frequency: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      observations: {
        title: this.headerFields[4],
        width: 'string',
      },
      
     
    },
  };

  showButtom: boolean;
  assigned_management_plan: any;
  users: any;

  
  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe) {}

  async ngOnInit() {

  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }
}
