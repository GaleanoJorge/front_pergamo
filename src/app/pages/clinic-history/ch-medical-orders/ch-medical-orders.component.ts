import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-ch-medical-orders',
  templateUrl: './ch-medical-orders.component.html',
  styleUrls: ['./ch-medical-orders.component.scss'],
})
export class ChMedicalOrdersComponent implements OnInit {
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
      ambulatory_medical_order: {
        title: this.headerFields[0],
        width: 'string',
      },
      procedure: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      amount: {
        title: this.headerFields[2],
        width: 'string',
      },
      hourly_frequency: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.value + '-' + row.hourly_frequency.name;
        },
      },
      observations: {
        title: this.headerFields[4],
        width: 'string',
      },
      
     
    },
  };

  constructor(public userChangeS: UserChangeService) {}

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
