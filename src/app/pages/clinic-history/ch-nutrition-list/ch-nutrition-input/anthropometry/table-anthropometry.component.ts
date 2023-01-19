import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-anthropometry',
  templateUrl: './table-anthropometry.component.html',
  styleUrls: ['./table-anthropometry.component.scss']
})
export class TableAnthropometryComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() route: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  @Output() messageEvent2 = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['FECHA',
    'PACIENTE FUNCIONAL',
    'PESO',
    'TALLA',
    'CIRCUNFERENCIA DE BRAZO',
    'CIRCUNFERENCIA DE PANTORRILA',
    'ALTURA DE RODILLA',
    'PERIMETRO ADOMINAL',
    'PERIMETRO DE CADERA',
    'IMC',
    'OBESIDAD',
    'PESO ESTIMADO',
    'TALLA ESTIMADA',
    'CALCULO DE GASTOS ENERGETICOS TOTAL',];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns:
    {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform4(value);
        },
      },

      is_functional:
      {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      weight:
      {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      size:
      {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      arm_circunferency:
      {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      calf_circumference:
      {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      knee_height:
      {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      abdominal_perimeter:
      {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      hip_perimeter:
      {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      geteratedIMC:
      {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      classification:
      {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      estimated_weight:
      {
        title: this.headerFields[11],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      estimated_size:
      {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      total_energy_expenditure:
      {
        title: this.headerFields[13],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
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

  receiveWeight($event) {
    this.messageEvent2.emit($event);
  }
}

