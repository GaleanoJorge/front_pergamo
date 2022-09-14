import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-fun-pat-m-ot',
  templateUrl: './table-fun-pat-m-ot.component.html',
  styleUrls: ['./table-fun-pat-m-ot.component.scss']
})
export class TableFunPatMOTComponent implements OnInit {
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
                                'MANO-CABEZA-DERECHA', 
                                'MANO-CABEZA-IZQUIERDA',
                                'MANO-BOCA-DERECHA', 
                                'MANO-BOCA-IZQUIERDA',
                                'MANO-HOMBRO-DERECHA', 
                                'MANO-HOMBRO-IZQUIERDA',
                                'MANO-ESPALDA-DERECHA', 
                                'MANO-ESPALDA-IZQUIERDA',
                                'MANO-CINTURA-DERECHA', 
                                'MANO-CINTURA-IZQUIERDA',
                                'MANO-RODILLA-DERECHA', 
                                'MANO-RODILLA-IZQUIERDA',
                                'MANO-PIE-DERECHA', 
                                'MANO-PIE-IZQUIERDA',];

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
     
      

      head_right: {
        title: this.headerFields[1],
        width: 'string',
      },

      head_left: {
        title: this.headerFields[2],
        width: 'string',
      },

      mouth_right: {
        title: this.headerFields[3],
        width: 'string',
      },
      mouth_left: {
        title: this.headerFields[4],
        width: 'string',
      },

      shoulder_right: {
        title: this.headerFields[5],
        width: 'string',
      },
      shoulder_left: {
        title: this.headerFields[6],
        width: 'string',
      },

      back_right: {
        title: this.headerFields[7],
        width: 'string',
      },
      back_left: {
        title: this.headerFields[8],
        width: 'string',
      },

      waist_right: {
        title: this.headerFields[9],
        width: 'string',
      },

      waist_left: {
        title: this.headerFields[10],
        width: 'string',
      },
      knee_right: {
        title: this.headerFields[11],
        width: 'string',
      },

      knee_left: {
        title: this.headerFields[12],
        width: 'string',
      },
      foot_right: {
        title: this.headerFields[13],
        width: 'string',
      },

      foot_left: {
        title: this.headerFields[14],
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

