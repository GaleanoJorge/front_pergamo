import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-sys-integumentary-ft',
  templateUrl: './table-sys-integumentary-ft.component.html',
  styleUrls: ['./table-sys-integumentary-ft.component.scss']
})
export class TableSysIntegumentaryComponent implements OnInit {
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
  public headerFields: any[] = ['COLABORACION',
                                'INTEGRIDAD',
                                'TEXTURA',
                                'SUDORACION',
                                'ELASTICIDAD',
                                'EXTENSIBILIDAD',
                                'MOVILIDAD',
                                'CICATRIZ',
                                'ESCARAS',
                                'UBICACIÓN',];

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
     
      colaboration:
      {
        title: this.headerFields[0],
        width: 'string',
      },

      integrity:
      {
        title: this.headerFields[1],
        width: 'string',
      },

      texture:
      {
        title: this.headerFields[2],
        width: 'string',
      },

      sweating:
      {
        title: this.headerFields[3],
        width: 'string',
      },

      elasticity:
      {
        title: this.headerFields[4],
        width: 'string',
      },

      extensibility:
      {
        title: this.headerFields[5],
        width: 'string',
      },

      mobility:
      {
        title: this.headerFields[6],
        width: 'string',
      },

      scar:
      {
        title: this.headerFields[7],
        width: 'string',
      },

      bedsores:
      {
        title: this.headerFields[8],
        width: 'string',
      },

      location:
      {
        title: this.headerFields[9],
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

