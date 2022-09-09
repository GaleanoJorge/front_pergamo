
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-sw-nursing',
  templateUrl: './sw-nursing.component.html',
  styleUrls: ['./sw-nursing.component.scss'],
})
export class SwNursingComponent implements OnInit {

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
  public headerFields: any[] = ['Fecha', 'Servicio de enfermeria', 'Nombre', 'Apellidos', 'Número de contacto'];
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

      service: {
        title: this.headerFields[1],
        width: 'string', valuePrepareFunction(value, row) {
          if (value == 1) {
            return 'Si';
          } else {
            return 'No'
          }

        },
      },
      firstname: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return (row.firstname != null ? row.firstname + ' ' : "")
              + (row.middlefirstname != null ? row.middlefirstname : "");
          } else {
            return 'NO APLICA'
          }
        }
      },
      lastname: {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
          return (row.lastname != null ? row.lastname + ' ' : "")
            + (row.middlelastname != null ? row.middlelastname : "");
          } else {
            return 'NO APLICA'
          }
        },
      },
      phone: {
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