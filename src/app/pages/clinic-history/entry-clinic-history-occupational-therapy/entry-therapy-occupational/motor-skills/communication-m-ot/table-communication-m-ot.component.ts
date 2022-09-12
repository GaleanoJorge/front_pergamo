import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-communication-m-ot',
  templateUrl: './table-communication-m-ot.component.html',
  styleUrls: ['./table-communication-m-ot.component.scss']
})
export class TableCommunicationMOTComponent implements OnInit {
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
  public headerFields: any[] = ['COMUNIDAD', 
                                'FAMILIARES',
                                'COMPAÑEROS Y AMIGOS', 
                                'CUIDADO DE LA PROPIA SALUD',
                                'COMPRAS', 
                                'PREPARACION DE ALIMENTOS',
                                'BAÑARSE', 
                                'VESTIRSE',
                                'CUIDADO DE LOS ANIMALES', ];

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

      community: {
        title: this.headerFields[0],
        width: 'string',
      },

      relatives: {
        title: this.headerFields[1],
        width: 'string',
      },

      friends: {
        title: this.headerFields[2],
        width: 'string',
      },
      health: {
        title: this.headerFields[3],
        width: 'string',
      },

      shopping: {
        title: this.headerFields[4],
        width: 'string',
      },
      foods: {
        title: this.headerFields[5],
        width: 'string',
      },

      bathe: {
        title: this.headerFields[6],
        width: 'string',
      },
      dress: {
        title: this.headerFields[7],
        width: 'string',
      },

      animals: {
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

