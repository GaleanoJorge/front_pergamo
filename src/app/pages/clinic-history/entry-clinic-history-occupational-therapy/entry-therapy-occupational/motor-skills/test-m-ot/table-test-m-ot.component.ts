import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-test-m-ot',
  templateUrl: './table-test-m-ot.component.html',
  styleUrls: ['./table-test-m-ot.component.scss']
})
export class TableTestMOTComponent implements OnInit {
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
                                'APARIENCIA', 
                                'CONCIENCIA',
                                'ATENCION', 
                                'ESTADO DE HUMOR',
                                'LENGUAJE', 
                                'SENSOPERCEPCION',
                                'CURSO', 
                                'CONTENIDO',
                                'ORIENTACION', 
                                'SUEÑO',
                                'MEMORIA',];

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
      appearance: {
        title: this.headerFields[1],
        width: 'string',
      },

      consent: {
        title: this.headerFields[2],
        width: 'string',
      },

      Attention: {
        title: this.headerFields[3],
        width: 'string',
      },
      humor: {
        title: this.headerFields[4],
        width: 'string',
      },

      language: {
        title: this.headerFields[5],
        width: 'string',
      },
      sensory_perception: {
        title: this.headerFields[6],
        width: 'string',
      },

      grade: {
        title: this.headerFields[7],
        width: 'string',
      },
      contents: {
        title: this.headerFields[8],
        width: 'string',
      },

      orientation: {
        title: this.headerFields[9],
        width: 'string',
      },

      sleep: {
        title: this.headerFields[10],
        width: 'string',
      },
      memory: {
        title: this.headerFields[11],
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

