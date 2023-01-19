import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-ass-therapy-respiratory',
  templateUrl: './ass-therapy-respiratory.component.html',
  styleUrls: ['./ass-therapy-respiratory.component.scss'],
})
export class AssTherapyRespiratoryComponent implements OnInit {
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
  public headerFields: any[] = ['Fecha', 'Patron respiratorio', 'Ritmo Respiración', 'Frecuencia respiratoria',
    'Modo ventilatorio', 'Tos', 'Tipo de Torax', 'Simetría Torax'];
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
          return this.datePipe.transform4(value);
        },
      },
      ch_ass_pattern: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      ch_ass_swing: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },

      },
      ch_ass_frequency: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      ch_ass_mode: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      ch_ass_cough: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      ch_ass_chest_type: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction(value) {
          return value.name;
        },
      },
      ch_ass_chest_symmetry: {
        title: this.headerFields[7],
        width: 'string',
        valuePrepareFunction(value) {
          return value.name;
        }
      }
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
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}