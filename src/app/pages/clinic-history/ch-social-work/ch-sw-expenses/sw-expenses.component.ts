
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { CurrencyPipe } from '@angular/common';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sw-expenses',
  templateUrl: './sw-expenses.component.html',
  styleUrls: ['./sw-expenses.component.scss'],
})
export class ChSwExpensesComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Alimentación ', 'Gas', 'Luz', 'Acueducto/Agua', 'Renta/Arriendo',
    'Transporte', 'Recreación', 'Educación', 'Gastos médicos', 'Teléfono celular', 'Teléfono fijo', 'Total'];
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
          return this.datePipe.transform4(value);
        },
      },
      feeding: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      gas: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      light: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      aqueduct: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      rent: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      transportation: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      recreation: {
        title: this.headerFields[7],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      education: {
        title: this.headerFields[8],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      medical: {
        title: this.headerFields[9],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      cell_phone: {
        title: this.headerFields[10],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      landline: {
        title: this.headerFields[11],
        width: 'string',
        valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
      },
      total: {
        title: this.headerFields[12],
        width: 'string', valuePrepareFunction: (value, data) => {
          if (value != 0) {
            return this.currency.transform(value);
          } else {
            return 'No aplica'
          }
        },
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