import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-acuity-m-ot',
  templateUrl: './table-acuity-m-ot.component.html',
  styleUrls: ['./table-acuity-m-ot.component.scss']
})
export class TableAcuityMOTComponent implements OnInit {
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
  public headerFields: any[] = ['LOGRA TACTO Y SEGUIMIENTO VISUAL', 
                                'IDENTIFICACIÓN DE OBJETOS',
                                'FIGURAS SUPERPUESTAS', 
                                'DISEÑO DE BLOQUES DE COLORES',
                                'CATEGORIZACIÓN', 
                                'RELÑACIÓN ESPECIAL ENTRE EL PACIENTE Y LOS OBJETOS DE ESPACIO',];

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

      follow_up: {
        title: this.headerFields[0],
        width: 'string',
      },

      object_identify: {
        title: this.headerFields[1],
        width: 'string',
      },

      figures: {
        title: this.headerFields[2],
        width: 'string',
      },
      color_design: {
        title: this.headerFields[3],
        width: 'string',
      },

      categorization: {
        title: this.headerFields[4],
        width: 'string',
      },
      special_relation: {
        title: this.headerFields[5],
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

