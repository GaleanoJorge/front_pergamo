import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-sensibility-ft',
  templateUrl: './table-sensibility-ft.component.html',
  styleUrls: ['./table-sensibility-ft.component.scss']
})
export class TableSensibilityFTComponent implements OnInit {
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
                                'PROFUNDA',
                                'SUPREFICIAL',
                                'CORTICAL',
                                'OBSERVACION',];

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
     
      deep:
      {
        title: this.headerFields[1],
        width: 'string',
      },

      superficial:
      {
        title: this.headerFields[2],
        width: 'string',
      },

      cortical:
      {
        title: this.headerFields[3],
        width: 'string',
      },

      observation:
      {
        title: this.headerFields[4],
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

