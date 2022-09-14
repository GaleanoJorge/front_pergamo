import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-pain-ft',
  templateUrl: './table-pain-ft.component.html',
  styleUrls: ['./table-pain-ft.component.scss']
})
export class TablePainFTComponent implements OnInit {
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
  public headerFields: any[] = [
    'FECHA',
    'TIPO',
    'IRRADIADO',
    'LOCALIZADO',
    'INTENSIDAD',
    'FACTORES QUE EXACERVAN',
    'FACTORES QUE DISMINUYEN',];

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
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
        },

      burning:
      {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.burning != null ? row.burning  + ' ' : "") 
          + (row.stinging != null ?  row.stinging  + ' ' : "")
          + (row.locatedi != null ?  row.locatedi  + ' ' : "")
          + (row.oppressive != null ?  row.oppressive  :  "")
          ;
        },
      },
     
      irradiated:
      {
        title: this.headerFields[2],
        width: 'string',
      },

      located:
      {
        title: this.headerFields[3],
        width: 'string',
      },

      intensity:
      {
        title: this.headerFields[4],
        width: 'string',
      },

      exaccervating:
      {
        title: this.headerFields[5],
        width: 'string',
      },

      decreated:
      {
        title: this.headerFields[6],
        width: 'string',
      },
    },

  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe
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
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}

