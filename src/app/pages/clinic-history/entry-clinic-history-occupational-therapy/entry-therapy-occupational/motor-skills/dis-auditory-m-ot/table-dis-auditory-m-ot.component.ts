import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-dis-auditory-m-ot',
  templateUrl: './table-dis-auditory-m-ot.component.html',
  styleUrls: ['./table-dis-auditory-m-ot.component.scss']
})
export class TableDisAuditoryMOTComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['REALIZA BUSQUEDA DE FUENTES SONORAS', 
                                'PRESENTA HIPERSENSIBILIDAD AUDITIVA',
                                'PRESENTA HIPOSENSIBILIDAD AUDITIVA', 
                                'PRESENTA RESPUESTA AUDITIVA FRENTE A LOS DIFERENTES ESTIMULOS AUDITIVOS',
                                'LOGRA DISCIMINACION AUDITIVA',];

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

      sound_sources: {
        title: this.headerFields[0],
        width: 'string',
      },

      auditory_hyposensitivity: {
        title: this.headerFields[1],
        width: 'string',
      },

      auditory_hypersensitivity: {
        title: this.headerFields[2],
        width: 'string',
      },

      auditory_stimuli: {
        title: this.headerFields[3],
        width: 'string',
      },

      auditive_discrimination: {
        title: this.headerFields[4],
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
    }
  }
}