import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-occupat-history-ot',
  templateUrl: './table-occupat-history-ot.component.html',
  styleUrls: ['./table-occupat-history-ot.component.scss']
})
export class TableOccupatHistoryOTComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['OCUPACION', 
                                'ANTIGÛEDAD EN LA EMPRESA-EMPLEADO',
                                'HORARIO DE TRABAJO-EMPLEADO', 
                                'REALIZAR TURNOS-EMPLEADO',
                                'OBSERVACION-EMPLEADO',
                                'HORARIO DE TRABAJO-INDEPENDIENTE', 
                                'REALIZAR TURNOS-INDEPENDIENTE',
                                'OBSERVACION-INDEPENDIENTE',
                                'OBSERVACION-DESEMPLEADO',];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {

      ocupation: {
        title: this.headerFields[0],
        width: 'string',
      },
      enterprice_employee: {
        title: this.headerFields[1],
        width: 'string',
      },

      work_employee: {
        title: this.headerFields[2],
        width: 'string',
      },
      shift_employee: {
        title: this.headerFields[3],
        width: 'string',
      },

      observation_employee: {
        title: this.headerFields[4],
        width: 'string',
      },
      work_independent: {
        title: this.headerFields[5],
        width: 'string',
      },

      shift_independent: {
        title: this.headerFields[6],
        width: 'string',
      },
      observation_independent: {
        title: this.headerFields[7],
        width: 'string',
      },

      observation_home: {
        title: this.headerFields[8],
        width: 'string',
      },

    },
  };

  constructor(
    public userChangeS: UserChangeService,
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

