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
    
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },

      strengthen: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.strengthen != null ? row.strengthen  + ' - ' : "") 
          + (row.promote != null ?  row.promote  + ' -  ' : "")
          + (row.title != null ?  row.title  + ' -  ' : "")
          + (row.streimprovegthen != null ?  row.streimprovegthen  + ' - ' : "")
          + (row.re_education != null ?  row.re_education  + ' - ' : "")
          + (row.hold != null ?  row.hold  + ' - ' : "")
          + (row.check != null ?  row.check  + ' - ' : "")
          + (row.train != null ?  row.train  + ' - ': "")
          + (row.headline != null ?  row.headline  + ' - ': "")
          + (row.look_out != null ?  row.look_out: "")
          ;
        },
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