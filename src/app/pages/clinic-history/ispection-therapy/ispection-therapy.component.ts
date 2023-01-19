import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-ispection-therapy',
  templateUrl: './ispection-therapy.component.html',
  styleUrls: ['./ispection-therapy.component.scss'],
})
export class IspectionTherapyComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id;
  @Input() type_record: any = null;
  @Input() type_record_id: any = null;
  @Input() data: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  


  linearMode = true;
  public messageError = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha', 'Expansión toráxica','Masas','Observación Masas','Crepitaciones','Fracturas','Observación Fracturas','Via Aerea artificial'];
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
      expansion: {
        title: this.headerFields[1],
        width: 'string',
      },
      masses: {
        title: this.headerFields[2],
        width: 'string',
      },
      detail_masses: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction: (value, row) => {
        if (value != null) {
          return value;
        } else {
          return 'NO APLICA'
        }
      },
      },
      crepitations: {
        title: this.headerFields[4],
        width: 'string',
      },
      fracturues: {
        title: this.headerFields[5],
        width: 'string',
      },
      detail_fracturues: {
        title: this.headerFields[6],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          if (value != null) {
            return value;
          } else {
            return 'NO APLICA'
          }
        },
      },
      airway: {
        title: this.headerFields[7],
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
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }
}