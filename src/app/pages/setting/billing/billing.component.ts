import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingService } from '../../../business-controller/billing.service';
import { NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBillingComponent } from './form-billing/form-billing.component';


@Component({
  selector: 'ngx-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Orden de compra';
  public subtitle: string = '';
  public headerFields: any[] = ['Identificador', 'Proveedor', 'Enviada a'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];

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
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditBilling.bind(this),
            'delete': this.DeleteConfirmBilling.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      company: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      pharmacy_stock: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  constructor(
    private BillingS: BillingService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewBilling() {
    this.dialogFormService.open(FormBillingComponent, {
      context: {
        title: 'Crear orden de compra',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditBilling(data) {
    this.dialogFormService.open(FormBillingComponent, {
      context: {
        title: 'Editar orden de compra',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmBilling(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBilling.bind(this),
      },
    });
  }

  DeleteBilling(data) {
    return this.BillingS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
