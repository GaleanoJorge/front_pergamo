import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-gastrointestinal',
  templateUrl: './table-gastrointestinal.component.html',
  styleUrls: ['./table-gastrointestinal.component.scss']
})
export class TableGastrointestinalComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() route: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['HABITO INTESTINAL',
                                '¿ HA PRESENTADO VOMITO ?',
                                '¿ HA PRESENTADO NUSEAS ?',
                                'OBSERVACIONES',];

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
      bowel_habit:
      {
        title: this.headerFields[0],
        width: 'string',
      },

      vomit:
      {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value,row) {
          if (value == 0) {
            return 'SI';           
          } else {
            return 'NO';

          }
        }
      },

      nausea:
      {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value,row) {
          if (value == 0) {
            return 'SI';           
          } else {
            return 'NO';

          }
        }
      },

      observations:
      {
        title: this.headerFields[3],
        width: 'string',
      },


    },

  };

  constructor(
    public userChangeS: UserChangeService,
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

