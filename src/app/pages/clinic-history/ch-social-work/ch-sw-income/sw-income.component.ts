
import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sw-income',
  templateUrl: './sw-income.component.html',
  styleUrls: ['./sw-income.component.scss'],
})
export class ChSwIncomeComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Salario ', 'Pensión', 'Donaciones', 'Renta', 'Ayuda Familiar',
    'Ninguno', 'Total'];
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
      none: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return 'No tiene ingresos';
          } else {
            return 'No aplica'
          }
        },
      },
      salary: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != null) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      pension: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != null) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      donations: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != null) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      rent: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != null) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      familiar_help: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != null) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },

      total: {
        title: this.headerFields[7],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != null) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
    },
  }


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