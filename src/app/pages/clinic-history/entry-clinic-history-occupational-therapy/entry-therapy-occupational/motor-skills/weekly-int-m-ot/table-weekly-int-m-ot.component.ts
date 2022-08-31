import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-weekly-int-m-ot',
  templateUrl: './table-weekly-int-m-ot.component.html',
  styleUrls: ['./table-weekly-int-m-ot.component.scss']
})
export class TableWeeklyInMOTComponent implements OnInit {
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
  public headerFields: any[] = ['SESIONES MENSUALES', 
                                'INTENSIDAD SEMANAL',
                                'RECOMENDACIONES',];

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

      monthly_sessions: {
        title: this.headerFields[0],
        width: 'string',
      },

      weekly_intensity: {
        title: this.headerFields[1],
        width: 'string',
      },

      recommendations: {
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

