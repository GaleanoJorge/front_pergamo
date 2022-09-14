import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-int-pat-m-ot',
  templateUrl: './table-int-pat-m-ot.component.html',
  styleUrls: ['./table-int-pat-m-ot.component.scss']
})
export class TableIntPatMOTComponent implements OnInit {
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
                                'ALCANCE-ARRIBA-DERECHA', 
                                'ALCANCE-ARRIBA-IZQUIERDA',
                                'ALCANCE-AL-LADO-DERECHA', 
                                'ALCANCE-AL-LADO-IZQUIERDA',
                                'ALCANCE-ATRAS-DERECHA', 
                                'ALCANCE-ATRAS-IZQUIERDA',
                                'ALCANCE-AL-FRENTE-DERECHA', 
                                'ALCANCE-AL-FRENTE-IZQUIERDA',
                                'ALCANCE-ABAJO-DERECHA', 
                                'ALCANCE-ABAJO-IZQUIERDA',
                                'AGARRE-A-MANO-LLENA-DERECHA', 
                                'AGARRE-A-MANO-LLENA-IZQUIERDA',
                                'AGARRE-CILINDRICO-DERECHA', 
                                'AGARRE-CILINDRICO-IZQUIERDA',
                                'AGARRE-ENGANCHE-DERECHA', 
                                'AGARRE-ENGANCHE-IZQUIERDA',
                                'PINZA-FINA-DERECHA', 
                                'PINZA-FINA-IZQUIERDA',
                                'PINZA-TRIPODE-DERECHA', 
                                'PINZA-TRIPODE-IZQUIERDA',
                                'OPOSICION-DERECHA', 
                                'OPOSICION-IZQUIERDA',
                                'ENRROSCAR-DERECHA', 
                                'ENRROSCAR-IZQUIERDA',];

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
     

      up_right: {
        title: this.headerFields[1],
        width: 'string',
      },

      up_left: {
        title: this.headerFields[2],
        width: 'string',
      },

      side_right: {
        title: this.headerFields[3],
        width: 'string',
      },
      side_left: {
        title: this.headerFields[4],
        width: 'string',
      },

      backend_right: {
        title: this.headerFields[5],
        width: 'string',
      },
      backend_left: {
        title: this.headerFields[6],
        width: 'string',
      },

      frontend_right: {
        title: this.headerFields[7],
        width: 'string',
      },
      frontend_left: {
        title: this.headerFields[8],
        width: 'string',
      },

      down_right: {
        title: this.headerFields[9],
        width: 'string',
      },

      down_left: {
        title: this.headerFields[10],
        width: 'string',
      },
      full_hand_right: {
        title: this.headerFields[11],
        width: 'string',
      },

      full_hand_left: {
        title: this.headerFields[12],
        width: 'string',
      },
      cylindric_right: {
        title: this.headerFields[13],
        width: 'string',
      },

      cylindric_left: {
        title: this.headerFields[14],
        width: 'string',
      },

      hooking_right: {
        title: this.headerFields[15],
        width: 'string',
      },
      hooking_left: {
        title: this.headerFields[16],
        width: 'string',
      },

      fine_clamp_right: {
        title: this.headerFields[17],
        width: 'string',
      },
      fine_clamp_left: {
        title: this.headerFields[18],
        width: 'string',
      },

      tripod_right: {
        title: this.headerFields[19],
        width: 'string',
      },

      tripod_left: {
        title: this.headerFields[20],
        width: 'string',
      },
      opposition_right: {
        title: this.headerFields[21],
        width: 'string',
      },

      opposition_left: {
        title: this.headerFields[22],
        width: 'string',
      },
      coil_right: {
        title: this.headerFields[23],
        width: 'string',
      },

      coil_left: {
        title: this.headerFields[24],
        width: 'string',
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

