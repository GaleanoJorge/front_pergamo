import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-r-n-valoration-ot',
  templateUrl: './r-n-valoration-ot.component.html',
  styleUrls: ['./r-n-valoration-ot.component.scss']
})
export class RNValorationOtComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Observación', 'Nota'];

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
      ch_diagnosis: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      patient_state: {
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

