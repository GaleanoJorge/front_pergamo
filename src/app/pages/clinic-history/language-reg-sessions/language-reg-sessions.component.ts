import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

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
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
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

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
  ) {}

  async ngOnInit() {
    // console.log(this.type_record);
  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}
