import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';

import { PharmacyLotService } from '../../../business-controller/pharmacy-lot.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsComponent } from '../../contract/briefcase/actions.component';
import { FormPharmacyLotComponent } from './form-pharmacy-lot/form-pharmacy-lot.component';



@Component({
  selector: 'ngx-pharmacy-lot',
  templateUrl: './pharmacy-lot.component.html',
  styleUrls: ['./pharmacy-lot.component.scss']
})
export class PharmacyLotComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'INGRESO DE MEDICAMENTOS';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'Producto', 'Cantidad', 'Lote', 'Fecha vencimiento'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing_stock.product.name + ' - ' + row.billing_stock.product.factory.name;
        },
      },
      enter_amount: {
        title: this.headerFields[2],
        type: 'string',
      },
      lot: {
        title: this.headerFields[3],
        type: 'string',
      },
      expiration_date: {
        title: this.headerFields[4],
        type: 'string',
      }
    },
  };

  constructor(
    private pharmacyS: PharmacyLotService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewPharmacy() {
    this.dialogFormService.open(FormPharmacyLotComponent, {
      context: {
        title: 'Crear nueva factura',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  receiveMessage($event) {
    if($event==true){
this.RefreshData();
    }
  }

  EditPharmacy(data) {
    this.dialogFormService.open(FormPharmacyLotComponent, {
      context: {
        title: 'Editar factura',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmPharmacy(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePharmacy.bind(this),
      },
    });
  }

  DeletePharmacy(data) {
    return this.pharmacyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
