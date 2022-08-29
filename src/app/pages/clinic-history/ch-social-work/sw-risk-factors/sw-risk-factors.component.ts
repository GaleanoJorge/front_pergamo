
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sw-risk-factors',
  templateUrl: './sw-risk-factors.component.html',
  styleUrls: ['./sw-risk-factors.component.scss'],
})
export class SwRiskFactorsComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;

  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Factores de riesgo','Observaciones'];
  public routes = [];
  public data = [];
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;
  public all_changes: any[];
  public saveEntry: any = 0;


  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    
    columns: {
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },

      net: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          return (row.net != null ? row.net  + ' - ' : "") 
          + (row.spa != null ?  ' -  ' + row.spa  : "")
          + (row.violence != null ? ' -  ' +  row.violence  : "")
          + (row.victim != null ? ' -  ' +  row.victim   : "")
          + (row.economic != null ?  ' -  ' + row.economic   : "")
          + (row.living != null ? ' -  ' +  row.living   : "")
          + (row.attention != null ? ' -  ' +  row.attention  : "")
          + (row.stigmatization != null ? ' -  ' +  row.stigmatization  : "")
          + (row.interference != null ? ' -  ' +  row.interference  : "")
          + (row.spaces != null ?  ' -  ' + row.spaces: "")
          ;
        },
    },
    observations: {
      title: this.headerFields[2],
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
    if ($event == true) {
      this.RefreshData();
    }
  }
}