import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormAssistanceStockComponent } from './form-assistance-stock/form-assistance-stock.component';
import { PharmacyStockService } from '../../../business-controller/pharmacy-stock.service';
import { AuthService } from '../../../services/auth.service';
import { ActionsStockComponent } from './actions.component';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { ActivatedRoute } from '@angular/router';
import { FormPharmacyIncomeComponent } from '../../pharmacy/pharmacy-income/form-pharmacy-income/form-pharmacy-income.component';
import { PatientService } from '../../../business-controller/patient.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormAssistanceReturnComponent } from './form-assistance-return/form-assistance-return.component';
import { FormDrugReturnedComponent } from './form-drug-returned/form-drug-returned.component';


@Component({
  selector: 'ngx-assistance-stock',
  templateUrl: './assistance-stock.component.html',
  styleUrls: ['./assistance-stock.component.scss']
})
export class AssistanceStockComponent implements OnInit {

  @Input() user: any = null;
  @Input() admissions_id: any = null;
  @Input() parentData: any = null;
  @Input() type;

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'LISTA DE ELEMENTOS DEL PACIENTE';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'ESTADO', 'PRODUCTO', 'DESCRIPCIÓN', 'INDICACIONES', 'CONTRAINDICACIONES', 'REFRIGERACIÓN', 'ADMINISTRACIONES DISPONIBLES', 'DESPACHADO POR FARMACIA'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public entity: string = null;
  public user_id;
  public data = [];
  public routes;
  public show;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'type': this.type,
            'edit': this.EditInv.bind(this),
            'returned': this.Returned.bind(this),
            // 'delete': this.DeleteConfirmPharmacyStock.bind(this),
          };
        },
        renderComponent: ActionsStockComponent,
      },
      status: {
        title: this.headerFields[1],
        type: 'string',
      },
      'pharmacy_request_shipping.pharmacy_lot_stock.billing_stock': {
        title: this.headerFields[2],
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
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product) {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product.product_generic.description;
          } else {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_supplies_com.product_supplies.description;
          }
        },
      },
      // 'pharmacy_request_shipping.amount': {
      //   title: this.headerFields[3],
      //   type: 'string',
      //   valuePrepareFunction: (value, row) => {
      //     return row.pharmacy_request_shipping?.amount;
      //   },
      // },
      'administration_route': {
        title: this.headerFields[4],
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
        title: this.headerFields[5],
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
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product) {
            return row.pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product.refrigeration == 1 ? 'REFRIGERAR' : 'NO REFRIGERAR';
          } else {
            return '--'
          }
        },
      },
      'pharmacy_product_request.pharmacy_request_shipping.amount_provition': {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.pharmacy_request_shipping.amount_provition;
        },
      },
      disponibles: {
        title: this.headerFields[7],
        type: 'string',
      },
      Usadas: {
        title: 'APLICADAS',
        type: 'string',
      },
    },
  };



  constructor(
    private PharmacyStockS: PharmacyStockService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private AuthS: AuthService,
    private requesS: PharmacyProductRequestService,
    private route: ActivatedRoute,
    private patienBS: PatientService,

  ) {
  }

  ngOnInit(): void {
    if (this.type == 1) {
      this.entity = 'pharmacy_product_request_for_use/?pagination=false&admissions=' + this.admissions_id + '&type=' + this.type;
    } else if (this.type == 2) {
      this.entity = 'pharmacy_product_request_for_use/?pagination=false&admissions=' + this.admissions_id + '&type=' + this.type;
    } else {
      this.entity = 'pharmacy_product_request_for_use/?pagination=false&admissions=' + this.admissions_id + '&type=' + this.type;
    }



  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  EditInv(data) {
    this.dialogFormService.open(FormPharmacyIncomeComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Aceptar Medicamento',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeletePharInventary(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      closeOnBackdropClick: false,
      context: {
        name: data.firstname,
        data: data,
        delete: this.DeleteInventary.bind(this),
      },
    });
  }

  DeleteInventary(data) {
    return this.requesS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  Returned(data) {
    // console.log('dañado');
    this.dialogFormService.open(FormDrugReturnedComponent, {
      context: {
        title: 'DEVOLVER ELEMENTO',
        data2: data,
        status: 'EN DEVOLUCIÓN',
        // record_id: this.record_id,
        // type_record_id: this.type_record_id,
        // close: this.close.bind(this),
        saved: this.RefreshData.bind(this),
      },
    });
  }

  tablock(e) {
    // console.log(e.tabTitle);
    switch (e.tabTitle) {
      case "RECIBIDOS": {
        this.show = 1;
        break;
      }
      case "POR ACEPTAR": {
        this.show = 2;
        break;
      }
      case "SOLICITUDES": {
        this.show = 3;
        break;
      }
    }
  }

}
