import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
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
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['TIPO',
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
      burning:
      {
        title: this.headerFields[0],
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
        title: this.headerFields[1],
        width: 'string',
      },

      located:
      {
        title: this.headerFields[2],
        width: 'string',
      },

      intensity:
      {
        title: this.headerFields[3],
        width: 'string',
      },

      exaccervating:
      {
        title: this.headerFields[4],
        width: 'string',
      },

      decreated:
      {
        title: this.headerFields[4],
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

