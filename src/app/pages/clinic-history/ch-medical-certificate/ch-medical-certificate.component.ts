import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActionsCertificateComponent } from './actions.component';

@Component({
  selector: 'ngx-ch-medical-certificate',
  templateUrl: './ch-medical-certificate.component.html',
  styleUrls: ['./ch-medical-certificate.component.scss'],
})
export class ChMedicalCertificateComponent implements OnInit {
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
    'Certificado Medico',
    
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
        renderComponent: ActionsCertificateComponent,
      },
      

      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
        },

      description: {
        title: this.headerFields[1],
        width: 'string',
      },
      
     
    },
  };

  showButtom: boolean;
  assigned_management_plan: any;
  users: any;

  constructor(public userChangeS: UserChangeService,
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
