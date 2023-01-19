import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-r-n-intervention-ot',
  templateUrl: './table-r-n-intervention-ot.component.html',
  styleUrls: ['./table-r-n-intervention-ot.component.scss']
})
export class TableRNInterventionOTComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild(BaseTableComponent) table2: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha','Intervención'];

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
      

      occupational_con: {
        title: this.headerFields[1],
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

  RefreshData2() {
    this.table2.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
      this.RefreshData2();
    }
  }
}

