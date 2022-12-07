import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-parenteral-nutrition',
  templateUrl: './table-parenteral-nutrition.component.html',
  styleUrls: ['./table-parenteral-nutrition.component.scss']
})
export class TableParenteralNutritionComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() weight: any = null;
  @Input() route: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public nameForm: String;
  public headerFields: any[] = ['FEHCA',
    'APORTES DE PROTEINA',
    'APORTES DE CARBOHIDRATOS',
    'APORTES DE LÍPIDOS',
    'VOLUMEN DE AMINOÁCIDOS',
    'VOLUMEN DE DEXTROSA',
    'VALOMEN DE LÍPIDOS',
    'GRAMOS TOTALES DE PROTEINA',
    'GRAMOS DE NITROGENO',
    'CARBOHIDRATOS TOTALES',
    'GRAMOS TOTALES DE LIPIDOS',
    'TOTAL VOLUMEN DE AMINOACIDOS',
    'TOTAL VOLUMEN DE DEXTROSA',
    'TOTAL VOLUMEN LIPIDO',
    'TOTAL CALORIAS',
    'CE_SE',
  ];

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
          return this.datePipe.transform4(value);
        },
      },

      protein_contributions:
      {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      carbohydrate_contribution:
      {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      lipid_contribution:
      {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },


      amino_acid_volume:
      {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      dextrose_volume:
      {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      lipid_volume:
      {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      total_grams_of_protein:
      {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      grams_of_nitrogen:
      {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      total_carbohydrates:
      {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      total_grams_of_lipids:
      {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      total_amino_acid_volume:
      {
        title: this.headerFields[11],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      total_dextrose_volume:
      {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      total_lipid_volume:
      {
        title: this.headerFields[13],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      total_calories:
      {
        title: this.headerFields[14],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
      },

      ce_se:
      {
        title: this.headerFields[15],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 'N.A.';
          }
        },
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

