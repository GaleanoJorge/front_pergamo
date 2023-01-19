
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-ps-intellective',
  templateUrl: './ps-intellective.component.html',
  styleUrls: ['./ps-intellective.component.scss'],
})
export class PsIntellectiveComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Atención', 'Obs',  'Memoria', 'Obs', 'Sensipercepción',  'Obs.',  'Desorientación autopsíquica o de persona', 'Desorientación alopsíquica o temporal' , 'Desorientación Espacial' ];
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
      ch_ps_attention: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value.name;
          } else {
            return 'NO APLICA'
          }
        }       
      },
      att_observations: {
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
      memory: {
        title: this.headerFields[3],
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
      me_observations: {
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
      perception: {
        title: this.headerFields[5],
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
      per_observations: {
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
      autopsychic: {
        title: this.headerFields[7],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value;
          } else {
            return 'NO APLICA'
          }
        }       
      },
      allopsychic: {
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
      space: {
        title: this.headerFields[9],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value;
          } else {
            return 'NO APLICA'
          }
        }       
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
      this.messageEvent.emit(true);
    }
  }
}