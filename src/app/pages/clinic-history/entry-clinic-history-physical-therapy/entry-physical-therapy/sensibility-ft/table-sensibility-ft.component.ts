import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
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
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['PROFUNDA',
                                'SUPREFICIAL',
                                'CORNICAL',
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
     
      deep:
      {
        title: this.headerFields[0],
        width: 'string',
      },

      superficial:
      {
        title: this.headerFields[1],
        width: 'string',
      },

      cortical:
      {
        title: this.headerFields[2],
        width: 'string',
      },

      observation:
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
    }
  }
}

