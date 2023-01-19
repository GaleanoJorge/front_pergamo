
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-nursing-procedure',
  templateUrl: './nursing-procedure.component.html',
  styleUrls: ['./nursing-procedure.component.scss'],
})
export class NursingProcedureComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id;
  @Input() type_record_id;

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'FECHA',
    'PROCEDIMIENTO', 'OBSERVACIÓN',

  ];

  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
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
      nursing_procedure: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      observation: {
        title: this.headerFields[2],
        type: 'string',
      }
    },
  };

  constructor(
    public datePipe: DateFormatPipe
  ) {

  }

  async ngOnInit() { }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }


}
