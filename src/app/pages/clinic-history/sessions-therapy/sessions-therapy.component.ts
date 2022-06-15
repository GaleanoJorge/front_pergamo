import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';



@Component({
  selector: 'ngx-sessions-therapy',
  templateUrl: './sessions-therapy.component.html',
  styleUrls: ['./sessions-therapy.component.scss'],
})
export class SessionsTherapyComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  linearMode = false;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha','Sesiones mensuales', 'Intensidad Semanal','Recomendaciones'];

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
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      
      month: {
        title: this.headerFields[2],
        width: 'string',
      },
      week: {
        title: this.headerFields[3],
        width: 'string',
      },
      recommendations: {
        title: this.headerFields[3],
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
    if($event==true){
      this.RefreshData();
    }
  }
}

