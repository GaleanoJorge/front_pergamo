import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-objectives-therapy',
  templateUrl: './objectives-therapy.component.html',
  styleUrls: ['./objectives-therapy.component.scss'],
})
export class ObjectivesTherapyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;

  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Objetivos'];
  public routes = [];
  public data = [];
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;
  public all_changes: any[];
  public saveEntry: any = 0;


  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },

    columnss: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      strengthen: {
        title: this.headerFields[1],
        width: 'string',
      },
    },

    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      // strengthen: {
      //   title: this.headerFields[1],
      //   width: 'string',
      // },
      promote: {
        title: this.headerFields[1],
        width: 'string',
      },
      title: {
        title: this.headerFields[1],
        width: 'string',
      },
      streimprovegthen: {
        title: this.headerFields[1],
        width: 'string',
      },
      re_education: {
        title: this.headerFields[1],
        width: 'string',
      },
      hold: {
        title: this.headerFields[1],
        width: 'string',
      },
      check: {
        title: this.headerFields[1],
        width: 'string',
      },
      train: {
        title: this.headerFields[1],
        width: 'string',
      },
      headline: {
        title: this.headerFields[1],
        width: 'string',
      },
      look_out: {
        title: this.headerFields[1],
        width: 'string',
      },
    },
  };


  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
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