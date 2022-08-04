
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-occupational-history',
  templateUrl: './occupational-history.component.html',
  styleUrls: ['./occupational-history.component.scss'],
})
export class OccupationalHistoryComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Actividades que desempeñaba', 'Ocupación', 'Antigüedad en la empresa', 'Horario de trabajo',
    'Realiza turnos', 'Observaciones'];
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
      worked: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.worked != null ? row.worked + '  ' : "")
            + (row.study != null ? row.study + '  ' : "")
            + (row.home != null ? row.home + '  ' : "")
            + (row.none != null ? row.none : "")
            ;
        },
      },
      ch_sw_occupation: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'NO APLICA'
          }

        },
      },
      ch_sw_seniority: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'NO APLICA'
          }

        },
      },
      ch_sw_hours: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'NO APLICA'
          }
        },
      },
      ch_sw_turn: {
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
      observations: {
        title: this.headerFields[6],
        width: 'string',
      },
    },
  };


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