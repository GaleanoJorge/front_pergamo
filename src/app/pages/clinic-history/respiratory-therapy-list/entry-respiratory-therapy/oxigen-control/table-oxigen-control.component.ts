import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PharmacyProductRequestService } from '../../../../../business-controller/pharmacy-product-request.service';
import { UserChangeService } from '../../../../../business-controller/user-change.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';



@Component({
  selector: 'ngx-table-oxigen-control',
  templateUrl: './table-oxigen-control.component.html',
  styleUrls: ['./table-oxigen-control.component.scss']
})
export class TableOxigenControlComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() record_id: any;
  @Input() type_record_id;
  @Input() admissions;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public pharmacy_product_request;
  public nameForm: String;
  public headerFields: any[] = [
    /*00*/'FECHA',
    /*01*/'SISTEMA DE ADMINISTRACIÓN',
    /*02*/'CAUDAL',
    /*03*/'TIMPO DE ADMINISTRACIÓN (min)',
  ];

  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;
  public show: boolean = false;

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

      oxigen_administration_way:
      {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value.name;
          } else {
            return 'N.A.';
          }
        },
      },

      oxigen_flow:
      {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value + ' l/min';
          } else {
            return 'N.A.';
          }
        },
      },

      duration_minutes:
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

    },

  };

  constructor(
    public userChangeS: UserChangeService,
    public datePipe: DateFormatPipe,
    public PharmacyProductRequestS: PharmacyProductRequestService,

  ) {
  }

  async ngOnInit() {
    this.PharmacyProductRequestS.GetForUse({
      pagination: false,
      admissions: this.admissions.id,
      type: 1,
      is_oxigen: true,
    }).then(x => {
      this.pharmacy_product_request = x;
      if (this.pharmacy_product_request && this.pharmacy_product_request.length > 0) {
        this.show = true;
      }
    });
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

