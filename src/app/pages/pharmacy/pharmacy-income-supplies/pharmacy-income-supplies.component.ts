import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component'; 
import { ActionsSupComponent } from './actions.component';
import { FormPharmacyIncomeSuppliesComponent } from './form-pharmacy-income-supplies/form-pharmacy-income-supplies.component';

@Component({
  selector: 'ngx-pharmacy-income-supplies',
  templateUrl: './pharmacy-income-supplies.component.html',
  styleUrls: ['./pharmacy-income-supplies.component.scss']
})
export class PharmacyIncomeSuppliesComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'ACEPTAR O DEVOLVER INSUMOS';
  public subtitle: string = '';
  public headerFields: any[] = ['IDENTIFICADOR', 'INSUMO ENVIADO POR', 'INSUMO GENERICO', 'CANTIDAD A RECIBIR'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public validator ;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditInv.bind(this),
          };
        },
        renderComponent: ActionsSupComponent,
      },
      id: { 
        title: this.headerFields[0],
        type: 'string',
      },
      request_pharmacy_stock: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name + ' - ' + row.request_pharmacy_stock.campus.name;
        },
      },
      product_supplies: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.product_generic_id == null) {
            return row.product_supplies.description;
          } else {
            return row.product_generic.description;
          }

        },
      },
      cantidad_enviada: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  constructor(
    private dialogFormService: NbDialogService,
    private requesS: PharmacyProductRequestService,
    private pharmalotStockS: PharmacyLotStockService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.validator = this.parentData;
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
    this.dialogFormService.open(FormPharmacyIncomeSuppliesComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Aceptar Insumo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeletePharInventary(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
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

}
