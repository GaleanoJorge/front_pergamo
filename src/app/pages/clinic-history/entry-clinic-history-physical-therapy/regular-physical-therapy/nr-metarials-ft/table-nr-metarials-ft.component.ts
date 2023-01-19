import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-nr-metarials-ft',
  templateUrl: './table-nr-metarials-ft.component.html',
  styleUrls: ['./table-nr-metarials-ft.component.scss']
})
export class TableNRMaterialsFTComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha','Material 1', 'Material 2', 'Material 3', 'Material 4', 'Material 5', 'Material 6', 'Material 7', 'Material 8', 'Material 9', 'Material 10',
                                'Material 11', 'Material 12', 'Material 13', 'Material 14', 'Material 15', 'Material 16', 'Material 17', 'Material 18', 'Material 19', 'Material 20',
                                'Material 21', 'Material 22', 'Material 23', 'Material 24', 'Material 25', 'Material 26', 'Material 27', 'Material 28', 'Material 29',];

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

      Material_1: {
        title: this.headerFields[1],
        width: 'string',

      },
      
      Material_2: {
        title: this.headerFields[2],
        width: 'string',

      },
      Material_3: {
        title: this.headerFields[3],
        width: 'string',
      },
   
      Material_4: {
        title: this.headerFields[4],
        width: 'string',

      },
      Material_5: {
        title: this.headerFields[5],
        width: 'string',
      },
      
      Material_6: {
        title: this.headerFields[6],
        width: 'string',

      },
      Material_7: {
        title: this.headerFields[7],
        width: 'string',
      },
    
      Material_8: {
        title: this.headerFields[8],
        width: 'string',

      },
      Material_9: {
        title: this.headerFields[9],
        width: 'string',
      },
      Material_10: {
        title: this.headerFields[10],
        width: 'string',
      },

      Material_11: {
        title: this.headerFields[11],
        width: 'string',

      },
      
      Material_12: {
        title: this.headerFields[12],
        width: 'string',

      },
      Material_13: {
        title: this.headerFields[13],
        width: 'string',
      },
   
      Material_14: {
        title: this.headerFields[14],
        width: 'string',

      },
      Material_15: {
        title: this.headerFields[15],
        width: 'string',
      },
      
      Material_16: {
        title: this.headerFields[16],
        width: 'string',

      },
      Material_17: {
        title: this.headerFields[17],
        width: 'string',
      },
    
      Material_18: {
        title: this.headerFields[18],
        width: 'string',

      },
      Material_19: {
        title: this.headerFields[19],
        width: 'string',
      },
      Material_20: {
        title: this.headerFields[20],
        width: 'string',
      },
      Material_21: {
        title: this.headerFields[21],
        width: 'string',

      },
      
      Material_22: {
        title: this.headerFields[22],
        width: 'string',

      },
      Material_23: {
        title: this.headerFields[23],
        width: 'string',
      },
   
      Material_24: {
        title: this.headerFields[24],
        width: 'string',

      },
      Material_25: {
        title: this.headerFields[25],
        width: 'string',
      },
      
      Material_26: {
        title: this.headerFields[26],
        width: 'string',

      },
      Material_27: {
        title: this.headerFields[27],
        width: 'string',
      },
    
      Material_28: {
        title: this.headerFields[28],
        width: 'string',

      },
      Material_29: {
        title: this.headerFields[29],
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
    }
  }
}

