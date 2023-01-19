
import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-ps-sphere',
  templateUrl: './ps-sphere.component.html',
  styleUrls: ['./ps-sphere.component.scss'],
})
export class PsSphereComponent implements OnInit {

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
  public headerFields: any[] = ['Fecha', 'Eutimia', 'Tristeza', 'Alegria', 'Temor o miedo', 'Ira', 'Insuficiencias', 'Varios', 'Observaciones'];
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
  
      euthymia: {
      title: this.headerFields[1],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value == 1) {
          return 'Si';
        } else {
          return 'No'
        }
      }
    },
    ch_ps_sadness: {
      title: this.headerFields[2],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value.name;
        } else {
          return 'NO APLICA'
        }
      }
    },
    ch_ps_joy: {
      title: this.headerFields[3],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value.name;
        } else {
          return 'NO APLICA'
        }
      }
    },
    ch_ps_fear: {
      title: this.headerFields[4],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value.name;
        } else {
          return 'NO APLICA'
        }
      }
    },
    ch_ps_anger: {
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
    ch_ps_insufficiency: {
      title: this.headerFields[6],
      width: 'string',
      valuePrepareFunction(value, row) {
        if (value) {
          return value.name;
        } else {
          return 'NO APLICA'
        }
      }
    },
    ch_ps_several: {
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
    
    observations: {
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