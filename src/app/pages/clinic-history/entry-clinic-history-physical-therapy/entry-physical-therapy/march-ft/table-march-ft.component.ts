import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-march-ft',
  templateUrl: './table-march-ft.component.html',
  styleUrls: ['./table-march-ft.component.scss']
})
export class TableMarchFTComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['INDEPENDIENTE',
                                'CLAUDICANTE CON AYUDA',
                                'ATAXICAS',
                                'SE EVIDENCIA CONTACTO INICIAL',
                                'SE EVIDENCIA RESPUESTA A LA CARGA',
                                'SE EVIDENCIA SOPORTE MEDIO',
                                'SE EVIDENCIA SOPORTE TERMINAL',
                                'CUELLO DE PIE, DEDOS IZQUIERDO',
                                'PREBALANCEO',
                                'BALANCEO MEDIO',
                                'BALANCEO TERMINAL',
                                'OBSERVACIONES',];


  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns:
    {
     
      independent:
      {
        title: this.headerFields[0],
        width: 'string',
      },

      help:
      {
        title: this.headerFields[1],
        width: 'string',
      },

      spastic:
      {
        title: this.headerFields[2],
        width: 'string',
      },

      ataxic:
      {
        title: this.headerFields[3],
        width: 'string',
      },

      contact:
      {
        title: this.headerFields[4],
        width: 'string',
      },

      response:
      {
        title: this.headerFields[5],
        width: 'string',
      },

      support_init:
      {
        title: this.headerFields[6],
        width: 'string',
      },

      support_finish:
      {
        title: this.headerFields[7],
        width: 'string',
      },

      prebalance:
      {
        title: this.headerFields[8],
        width: 'string',
      },

      medium_balance:
      {
        title: this.headerFields[9],
        width: 'string',
      },

      finish_balance:
      {
        title: this.headerFields[10],
        width: 'string',
      },

      observation:
      {
        title: this.headerFields[11],
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

