import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-ther-goals-ft',
  templateUrl: './table-ther-goals-ft.component.html',
  styleUrls: ['./table-ther-goals-ft.component.scss']
})
export class TableTherGoalsFTComponent implements OnInit {
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
  public headerFields: any[] = ['Fecha','Objetivo1', 'Objetivo2', 'Objetivo3', 'Objetivo4', 'Objetivo5', 'Objetivo5', 'Objetivo7', 'Objetivo8', 'Objetivo9', 'Objetivo10'];

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
      check1_hold: {
        title: this.headerFields[1],
        width: 'string',

      },
      
      check2_improve: {
        title: this.headerFields[2],
        width: 'string',

      },
      check3_structure: {
        title: this.headerFields[3],
        width: 'string',
      },
   
      check4_promote: {
        title: this.headerFields[4],
        width: 'string',

      },
      check5_strengthen: {
        title: this.headerFields[5],
        width: 'string',
      },
      
      check6_promote_2: {
        title: this.headerFields[6],
        width: 'string',

      },
      check7_develop: {
        title: this.headerFields[7],
        width: 'string',
      },
    
      check8_strengthen_2: {
        title: this.headerFields[8],
        width: 'string',

      },
      check9_favor: {
        title: this.headerFields[9],
        width: 'string',
      },
      check10_functionality: {
        title: this.headerFields[10],
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

