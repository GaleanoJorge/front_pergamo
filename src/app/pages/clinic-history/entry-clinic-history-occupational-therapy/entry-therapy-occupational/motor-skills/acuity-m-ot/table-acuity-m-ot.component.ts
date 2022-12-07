import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-acuity-m-ot',
  templateUrl: './table-acuity-m-ot.component.html',
  styleUrls: ['./table-acuity-m-ot.component.scss']
})
export class TableAcuityMOTComponent implements OnInit {
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
                                'LOGRA TACTO Y SEGUIMIENTO VISUAL', 
                                'IDENTIFICACIÓN DE OBJETOS',
                                'FIGURAS SUPERPUESTAS', 
                                'DISEÑO DE BLOQUES DE COLORES',
                                'CATEGORIZACIÓN', 
                                'RELÑACIÓN ESPECIAL ENTRE EL PACIENTE Y LOS OBJETOS DE ESPACIO',];

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
          return this.datePipe.transform4(value);
        },
        },
     

      follow_up: {
        title: this.headerFields[1],
        width: 'string',
          valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },

      object_identify: {
        title: this.headerFields[2],
        width: 'string',
          valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },

      figures: {
        title: this.headerFields[3],
        width: 'string',
          valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      color_design: {
        title: this.headerFields[4],
        width: 'string',
          valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },

      categorization: {
        title: this.headerFields[5],
        width: 'string',
          valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
          }
        },
      },
      special_relation: {
        title: this.headerFields[6],
        width: 'string',
          valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'No Aplica';
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

