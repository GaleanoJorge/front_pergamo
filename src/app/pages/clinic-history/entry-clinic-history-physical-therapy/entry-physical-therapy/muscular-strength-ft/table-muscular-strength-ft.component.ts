import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-muscular-strength-ft',
  templateUrl: './table-muscular-strength-ft.component.html',
  styleUrls: ['./table-muscular-strength-ft.component.scss']
})
export class TableMuscularStrengthFTComponent implements OnInit {
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
  public headerFields: any[] = ['CABEZA Y CUELLO',
                                'MIEMBRO SUPERIOR IZQUIERDO',
                                'MANO, MUÑECA, DEDOS IZQUIERDO',
                                'MIEMBRO SUPERIOR DERECHO',
                                'MANO, MUÑECA, DEDOS  DERECHO',
                                'TRONCO',
                                'MIEMBRO INFERIOR IZQUIERDO',
                                'CUELLO DE PIE, DEDOS IZQUIERDO',
                                'MIEMBRO INFERIOR DERCHO',
                                'CUELLO DE PIE, DEDOS DERECHO',];

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
     
      head:
      {
        title: this.headerFields[0],
        width: 'string',
      },

      sup_left:
      {
        title: this.headerFields[1],
        width: 'string',
      },

      hand_left:
      {
        title: this.headerFields[2],
        width: 'string',
      },

      sup_right:
      {
        title: this.headerFields[3],
        width: 'string',
      },

      hand:
      {
        title: this.headerFields[4],
        width: 'string',
      },

      trunk:
      {
        title: this.headerFields[5],
        width: 'string',
      },

      inf_left:
      {
        title: this.headerFields[6],
        width: 'string',
      },

      left_foot:
      {
        title: this.headerFields[7],
        width: 'string',
      },

      inf_right:
      {
        title: this.headerFields[8],
        width: 'string',
      },

      right_foot:
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

