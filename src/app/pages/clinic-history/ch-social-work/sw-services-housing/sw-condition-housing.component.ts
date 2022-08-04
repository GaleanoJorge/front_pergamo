
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sw-condition-housing',
  templateUrl: './sw-condition-housing.component.html',
  styleUrls: ['./sw-condition-housing.component.scss'],
})
export class ChSwConditionHousingComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Servicios', 'Número de habitaciones', 'Personas por habitaciones', 'Habitaciones','Sala',
  'Comedor','Cocina','Baño',
  ];
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
      water: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.water != null ? row.water + '  ' : "")
            + (row.sewerage != null ? row.sewerage + '  ' : "")
            + (row.home != null ? row.home + '  ' : "")
            + (row.light != null ? row.light : "")
            + (row.telephone != null ? row.telephone : "")
            ;
        },
      },
      num_rooms: {
        title: this.headerFields[2],
        width: 'string',
      },
      persons_rooms: {
        title: this.headerFields[3],
        width: 'string',
      },
      rooms: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value==1) {
            return 'Si';
          } else {
            return 'No'
          }
        },
      },
      living_room: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value==1) {
            return 'Si';
          } else {
            return 'No'
          }
        },
      },
      dinning_room: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value==1) {
            return 'Si';
          } else {
            return 'No'
          }
        },
      },
      kitchen: {
        title: this.headerFields[7],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value==1) {
            return 'Si';
          } else {
            return 'No'
          }
        },
      },
      bath: {
        title: this.headerFields[8],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value==1) {
            return 'Si';
          } else {
            return 'No'
          }
        },
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