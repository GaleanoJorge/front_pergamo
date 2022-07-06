import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-language-reg-sessions',
  templateUrl: './language-reg-sessions.component.html',
  styleUrls: ['./language-reg-sessions.component.scss'],
})
export class LanguageRegSessionsComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = [
    'Fecha',
    'Sesiones Mensuales',
    'Intensidad Semanal',
    'Recomendaciones/Educación',
 
  ];
  
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  

  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      created_at: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },

      monthly_sessions: {
        title: this.headerFields[1],
        width: 'string',
      },
      weekly_intensity: {
        title: this.headerFields[2],
        width: 'string',
       
      },
      recomendations: {
        title: this.headerFields[3],
        width: 'string',
      },
      
    },
  };
  datePipe: any;

  constructor(public userChangeS: UserChangeService) {}

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
