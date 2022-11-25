import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';



@Component({
  selector: 'ngx-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['Fecha','Lista', 'Revisión', 'Observación'];

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
      ch_type_background: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'No Aplica';
          }
        },
      },
      revision: {
        title: this.headerFields[2],
        width: 'string',
      },
      observation: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value;
          } else {
            return 'NO APLICA'
          }
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
    if (this.type_record_id == 1) {
      this.messageEvent.emit($event);
    }
    if ($event == true) {
      this.RefreshData();
      
    }
  }
}

