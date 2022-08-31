import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-component-m-ot',
  templateUrl: './table-component-m-ot.component.html',
  styleUrls: ['./table-component-m-ot.component.scss']
})
export class TableComponentMOTComponent implements OnInit {
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
  public headerFields: any[] = ['PRESENTA ALTERACION EN EL EQUILIBRIO DINAMICO', 
                                'PRESENTA ALTERACION EN EL EQUILIBRIO ESTATICO',
                                'OBSERVACIONES', ];

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

      dynamic_balance: {
        title: this.headerFields[0],
        width: 'string',
      },

      static_balance: {
        title: this.headerFields[1],
        width: 'string',
      },

      observation_component: {
        title: this.headerFields[2],
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

