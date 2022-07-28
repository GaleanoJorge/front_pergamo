import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActionsInsumeComponent } from './actions.component';
import { NbDialogService } from '@nebular/theme';
import { FormDrugApplicationComponent } from '../drug-application/form-drug-application/form-drug-application.component';

@Component({
  selector: 'ngx-insume-application',
  templateUrl: './insume-application.component.html',
  styleUrls: ['./insume-application.component.scss'],
})
export class InsumeApplicationComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() record_id;
  @Input() type_record_id;
  @Input() user;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public entity;
  public dialog
  public nameForm: String;
  public headerFields: any[] = ['DESCRIPCIÓN', 'CONTRAINDICACIONES', 'INDICACIONES', 'REFRIGERACIÓN', 'Días De Tratamiento', 'Cant. Solic ', 'Observaciones', 'PRODUCTO', 'DOSIS'];
  public saveEntry: any = 0;
  public isSubmitted: boolean = false;
  public form: FormGroup;

  public loading: boolean = false;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'used': this.Aplication.bind(this),
            'damaged': this.Damaged.bind(this),
            'returned': this.Returned.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsInsumeComponent,
      },
      'pharmacy_request_shipping.pharmacy_lot_stock.billing_stock': {
        title: this.headerFields[7],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product) {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product.name;
          } else {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_supplies_com.name;
          }
        },

      },
      'description': {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (row.product_generic) {
            return row.product_generic.description;
          } else {
            return row.product_supplies.description;
          }
        },
      },
      'administration_route': {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product) {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product.indications;
          } else {
            return '--';
          }
        },
      },

      'pharmacy_product_request.pharmacy_request_shipping': {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product) {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product.contraindications;
          } else {
            return '--'
          }
        },
      },
      'pharmacy_product_request.pharmacy_request_shipping.pharmacy_lot_stock': {
        title: this.headerFields[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product) {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product.refrigeration == 1 ? 'REFRIGERAR' : 'NO REFRIGERAR';
          } else {
            return '--'
          }
        },
      },
      disponibles: {
        title: 'DISPONIBLES',
        width: 'string',
      },
      dañadas: {
        title: 'DAÑADAS',
        width: 'string',
      },
      // treatment_days: {
      //   title: this.headerFields[4],
      //   width: 'string',
      // },
      // outpatient_formulation: {
      //   title: this.headerFields[5],
      //   width: 'string',
      // },
      // observation: {
      //   title: this.headerFields[6],
      //   width: 'string',
      // },
    },
  };

  constructor(
    public userChangeS: UserChangeService,
    public AuthS: AuthService,
    private dialogFormService: NbDialogService,

  ) { }

  async ngOnInit() {
    this.user_id = this.AuthS.GetUser().id;
    if (this.user_id) {
      this.entity = "pharmacy_product_request_for_use?" + 'patient=' + this.record_id + '&product=' + false;
      this.title
    }
  }

  Aplication(data) {
    console.log('usado');
    this.dialog = this.dialogFormService.open(FormDrugApplicationComponent, {
      context: {
        title: 'REGISTRAR USO',
        data: data,
        record_id: this.record_id,
        type_record_id: this.type_record_id,
        status: 'USADO',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  Damaged(data) {
    console.log('dañado');
    this.dialog = this.dialogFormService.open(FormDrugApplicationComponent, {
      context: {
        title: 'REGISTRAR DAÑO EN ELEMENTO',
        data: data,
        status: 'DAÑADO',
        record_id: this.record_id,
        type_record_id: this.type_record_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  Returned(data) {
    console.log('dañado');
    this.dialog = this.dialogFormService.open(FormDrugApplicationComponent, {
      context: {
        title: 'DEVOLVER ELEMENTO',
        data: data,
        status: 'EN DEVOLUCIÓN',
        record_id: this.record_id,
        type_record_id: this.type_record_id,
        // close: this.close.bind(this),
        saved: this.RefreshData.bind(this),
      },
    });
  }

  close() {
    this.dialog.close();
  }

  RefreshData() {
    this.close()
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }


}