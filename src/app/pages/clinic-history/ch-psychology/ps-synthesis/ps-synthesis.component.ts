
import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-ps-synthesis',
  templateUrl: './ps-synthesis.component.html',
  styleUrls: ['./ps-synthesis.component.scss'],
})
export class PsSynthesisComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Psicomotricidad', 'Obs', 'Introspección', 'Obs', '  Juicio y raciocinio', 'Obs', 'Prospección', 'Obs', 'Inteligencia', 'Obs', ];
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
  
    psychomotricity: {
      title: this.headerFields[1],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          var a =  value.replace(/[["]+/g, '');
            var b = a.replace(/]+/g,'');
            return (b.replace(/,+/g,', '));
        } else {
          return 'NO APLICA'
        }
      }
    },
    observations_psy: {
      title: this.headerFields[2],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value;
        } else {
          return 'NO APLICA'
        }
      }
    },
    introspection: {
      title: this.headerFields[3],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value;
        } else {
          return 'NO APLICA'
        }
      }
    },
    observations_in: {
      title: this.headerFields[4],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value;
        } else {
          return 'NO APLICA'
        }
      }
    },
    
    ch_ps_judgment: {
      title: this.headerFields[5],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value.name;
        } else {
          return 'NO APLICA'
        }
      }
    },
    observations_jud: {
      title: this.headerFields[6],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value;
        } else {
          return 'NO APLICA'
        }
      }
    },
    ch_ps_prospecting: {
      title: this.headerFields[7],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value.name;
        } else {
          return 'NO APLICA'
        }
      }
    },
    observations_pros: {
      title: this.headerFields[8],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value;
        } else {
          return 'NO APLICA'
        }
      }
    },
    ch_ps_intelligence: {
      title: this.headerFields[9],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value.name;
        } else {
          return 'NO APLICA'
        }
      }
    },
    observations_inte: {
      title: this.headerFields[10],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value;
        } else {
          return 'NO APLICA'
        }
      }
    },
  }
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
      this.messageEvent.emit(true);
    }
  }
}