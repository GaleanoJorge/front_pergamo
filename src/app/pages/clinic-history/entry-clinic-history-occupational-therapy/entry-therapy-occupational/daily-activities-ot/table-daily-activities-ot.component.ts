import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-daily-activities-ot',
  templateUrl: './table-daily-activities-ot.component.html',
  styleUrls: ['./table-daily-activities-ot.component.scss']
})
export class TableDailyActivitiesOTComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['FECHA',
                                'COCINAR', 
                                'CUIDAR NIÑOS',
                                'LEER', 
                                'JUEGOS DE AZAR',
                                'PLANCHAR', 
                                'CAMINAR',
                                'ASEAR',
                                'PRACTICAR DEPORTE',
                                'DECORAR', 
                                'REUNIONES SOCIALES',
                                'REALIZAR ACTIVIDADES DE FLORISTERIA',
                                'VISITAR AMIGOS', 
                                'LEER',
                                'PRACTICAR GRUPOS POLITICOS',
                                'VER TELEVISION',
                                'PRACTICAR GRUPOS RELIGIOSOS',
                                'ESCRIBIR',
                                'CUIDAR Y JUGAR CON HIJOS Y NIETOS',
                                'ARREGLAR ELECTRODOMESTICOS', 
                                'IR DE PASEO CON LA FAMILIA',
                                'OBSERVACIONES',
                                'EXAMEN MUZCULAR',
                                'OBSERVACIONES GENERALES',];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
        },

      cook: {
        title: this.headerFields[1],
        width: 'string',
      },

      kids: {
        title: this.headerFields[2],
        width: 'string',
      },

      wash: {
        title: this.headerFields[3],
        width: 'string',
      },
      game: {
        title: this.headerFields[4],
        width: 'string',
      },

      ironing: {
        title: this.headerFields[5],
        width: 'string',
      },
      walk: {
        title: this.headerFields[6],
        width: 'string',
      },

      clean: {
        title: this.headerFields[7],
        width: 'string',
      },
      sport: {
        title: this.headerFields[8],
        width: 'string',
      },

      decorate: {
        title: this.headerFields[9],
        width: 'string',
      },

      social: {
        title: this.headerFields[10],
        width: 'string',
      },
      act_floristry: {
        title: this.headerFields[11],
        width: 'string',
      },

      friends: {
        title: this.headerFields[12],
        width: 'string',
      },
      read: {
        title: this.headerFields[13],
        width: 'string',
      },

      politic: {
        title: this.headerFields[14],
        width: 'string',
      },
      view_tv: {
        title: this.headerFields[15],
        width: 'string',
      },

      religion: {
        title: this.headerFields[16],
        width: 'string',
      },

      write: {
        title: this.headerFields[17],
        width: 'string',
      },

      look: {
        title: this.headerFields[18],
        width: 'string',
      },
      arrange: {
        title: this.headerFields[19],
        width: 'string',
      },

      travel: {
        title: this.headerFields[20],
        width: 'string',
      },
      observation_activity: {
        title: this.headerFields[21],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'SIN OBSERVACIÓN';
          }
        },
      },

      test: {
        title: this.headerFields[22],
        width: 'string',
      },
      observation_test: {
        title: this.headerFields[23],
        width: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'SIN OBSERVACIÓN';
          }
        },
      },

    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe

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
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}

