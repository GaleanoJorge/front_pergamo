import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActionsInterconsultationComponent } from './actions.component';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';

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
    /*00*/ 'Fecha',
    /*01*/ 'Orden Ambulatoria',
    /*02*/ 'Tipo de atención',
    /*03*/ 'Especialidad',
    /*04*/ 'Procedimiento',
    /*05*/ 'Cantidad',
    /*06*/ 'Frecuencia',
    /*07*/ 'Observaciones',
    /*08*/ 'Médico que ordena',
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
          return this.datePipe.transform4(value);
        },
      },
      ambulatory_medical_order: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value != null) {
            return value;
          } else {
            return 'No'
          }
        },
      },
      type_of_attention: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'N.A.';
          }
         
        },
      },
      specialty: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.id + '-' + value.name;
          } else {
            return 'N.A.';
          }
         
        },
      },
      
      procedure: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          return (row.procedure != null ? row.procedure.name : row.services_briefcase != null ? row.services_briefcase.manual_price.procedure.name : "No Aplica") ;
        }
      },  
      amount: {
        title: this.headerFields[5],
        width: 'string',
      },   
      frequency: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'N.A.';
          }
        },
      },
      observations: {
        title: this.headerFields[7],
        width: 'string',
      },
      user: {
        title: this.headerFields[8],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (row.ch_record) {
            return (row.ch_record.user.firstname ? row.ch_record.user.firstname : '') + ' ' + (row.ch_record.user.middlefirstname ? row.ch_record.user.middlefirstname : '') + ' ' + (row.ch_record.user.lastname ? row.ch_record.user.lastname : '') + ' ' + (row.ch_record.user.middlelastname ? row.ch_record.user.middlelastname : '');
          } else {
            return 'N.A.';
          }
        },
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