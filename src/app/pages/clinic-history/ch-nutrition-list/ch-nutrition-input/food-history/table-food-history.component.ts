import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-food-history',
  templateUrl: './table-food-history.component.html',
  styleUrls: ['./table-food-history.component.scss']
})
export class TableFoodHistoryComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() route: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['FECHA',
                                'DESCRIPCION',
                                '¿ ES ALÉRGICO E INTOLERANTE A ALGÚN ALIMENTO?',
                                '¿CUÁL?:',
                                'APETITO',
                                'INGESTA',
                                'DEGLUCIÓN',
                                'TIPO DE DIETA',
                                'APETITO',
                                'NUTRICION PARENTAL',
                                'CONTROL INGESTA',];

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
      created_at: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
        },

      description:
      {
        title: this.headerFields[1],
        width: 'string',
      },

      is_allergic:
      {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value,row) {
          if (value == 0) {
            return 'SI';           
          } else {
            return 'NO';

          }
        }
      },

      allergy:
      {
        title: this.headerFields[3],
        width: 'string',
      },


      appetite:
      {
        title: this.headerFields[4],
        width: 'string',
      },

      intake:
      {
        title: this.headerFields[5],
        width: 'string',
      },

      swallowing:
      {
        title: this.headerFields[6],
        width: 'string',
      },

      diet_type:
      {
        title: this.headerFields[7],
        width: 'string',
      },

      parenteral_nutrition:
      {
        title: this.headerFields[8],
        width: 'string',
      },

      intake_control:
      {
        title: this.headerFields[9],
        width: 'string',
      },


    },

  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe
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

