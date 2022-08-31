import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-thermal-m-ot',
  templateUrl: './table-thermal-m-ot.component.html',
  styleUrls: ['./table-thermal-m-ot.component.scss']
})
export class TableThermalMOTComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['CALOR', 
                                'FRIO',];

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

      heat: {
        title: this.headerFields[0],
        width: 'string',
      },

      cold: {
        title: this.headerFields[1],
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

