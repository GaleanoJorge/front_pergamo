
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { Actions25Component } from './actions25.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.scss'],
})
export class FailedComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id;
  @Output() messageEvent = new EventEmitter<any>();
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Fecha', 'Motivo', 'Descripción', 'Evidencia',

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
          return this.datePipe.transform2(value);
        },
        },
     
      ch_reason: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      descriptions: {
        title: this.headerFields[2],
        type: 'string',
      },

      file_evidence: {
        title: this.headerFields[3],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: Actions25Component,
      }
    }
  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe
  ) {

  }

  async ngOnInit() { }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event) {
      if ($event.refresh == true) {
        this.RefreshData();
      }
      this.messageEvent.emit({ is_failed: true });
    }
  }

}
