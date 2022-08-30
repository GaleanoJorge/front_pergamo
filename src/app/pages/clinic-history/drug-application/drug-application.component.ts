import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActionsAplicationsComponent } from './actions.component';
import { NbDialogService } from '@nebular/theme';
import { FormDrugApplicationComponent } from './form-drug-application/form-drug-application.component';
import { FormDrugReturnedComponent } from '../../setting/assistance-stock/form-drug-returned/form-drug-returned.component';

@Component({
  selector: 'ngx-drug-application',
  templateUrl: './drug-application.component.html',
  styleUrls: ['./drug-application.component.scss'],
})
export class DrugApplicationComponent implements OnInit {
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
  public headerFields: any[] = ['DESCRIPCIÓN', 'CONTRAINDICACIONES', 'INDICACIONES', 'REFRIGERACIÓN', 'DIAS DE TRATAMIENTO', 'CANT. SOLICITADA', 'OBSERVACIONES', 'PRODUCTO', 'DOSIS'];
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
            // 'returned': this.Returned.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsAplicationsComponent,
      },
      'pharmacy_request_shipping.pharmacy_lot_stock.billing_stock': {
        title: this.headerFields[7],
        type: 'string',
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
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product) {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product.product_generic.description;
          } else {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_supplies_com.product_supplies.description;
          }
        },
      },
      'administration_route': {
        title: this.headerFields[2],
        type: 'string',
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
        type: 'string',
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
        type: 'string',
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
        type: 'string',
      },
      Usadas: {
        title: 'APLICADAS',
        type: 'string',
      },
      dañadas: {
        title: 'DAÑADAS',
        type: 'string',
      },
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
      this.entity = "pharmacy_product_request_for_use?" + 'patient=' + this.record_id + '&product=' + true;
      this.title = 'MEDICAMENTOS DISPONIBLES PARA PACIENTE'
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

  // Returned(data) {
  //   console.log('dañado');
  //   this.dialog = this.dialogFormService.open(FormDrugReturnedComponent, {
  //     context: {
  //       title: 'DEVOLVER ELEMENTO',
  //       data: data,
  //       record_id: this.record_id,
  //       type_record_id: this.type_record_id,
  //       // close: this.close.bind(this),
  //       saved: this.RefreshData.bind(this),
  //     },
  //   });
  // }

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
