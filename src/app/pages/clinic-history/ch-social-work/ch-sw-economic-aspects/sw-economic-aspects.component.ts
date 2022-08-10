
import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sw-economic-aspects',
  templateUrl: './sw-economic-aspects.component.html',
  styleUrls: ['./sw-economic-aspects.component.scss'],
})
export class ChSwEconomicAspectsComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Tiene Capacidad de Copago '];
  public routes = [];
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
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      copay: {
        title: this.headerFields[1],
        width: 'string',
      },
    },
  };


  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
    private currency: CurrencyPipe,
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