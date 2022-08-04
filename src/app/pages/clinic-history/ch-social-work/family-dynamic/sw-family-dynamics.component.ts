
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sw-family-dynamics',
  templateUrl: './sw-family-dynamics.component.html',
  styleUrls: ['./sw-family-dynamics.component.scss'],
})
export class SwFamilyDynamicsComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Comunicación', 'Observaciones', 'Decisiones en el hogar', 
  'Autoridad del paciente', 'Expresión del paciente',];
  public routes = [];
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;
  public all_changes: any[];
  public saveEntry: any = 0;


  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },

    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },

      ch_sw_communications: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'NO APLICA'
          }

        },
      },
      observations: {
        title: this.headerFields[2],
        width: 'string',
      },
      decisions: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.relationship;
          } else {
            return 'NO APLICA'
          }
        }
      },
      authority: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value;
          } else {
            return 'NO APLICA'
          }

        },
      },
  
      ch_sw_expression: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'NO APLICA'
          }
        },
      },
    },
  }



  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
  ) {
  }

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