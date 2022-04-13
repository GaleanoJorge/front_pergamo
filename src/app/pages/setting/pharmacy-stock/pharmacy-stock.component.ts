import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPharmacyStockComponent } from './form-pharmacy-stock/form-pharmacy-stock.component';
import { PharmacyStockService } from '../../../business-controller/pharmacy-stock.service';


@Component({
  selector: 'ngx-pharmacy-stock',
  templateUrl: './pharmacy-stock.component.html',
  styleUrls: ['./pharmacy-stock.component.scss']
})
export class PharmacyStockComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Usuarios';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'Nombre', 'Sede'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]},${this.headerFields[2]}`;
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
            'edit': this.EditPharmacyStock.bind(this),
            'delete': this.DeleteConfirmPharmacyStock.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      campus_id: {
        title: this.headerFields[2],
        type: 'string',
      }
    },
  };

  public routes = [
    {
      name: 'PharmacyStock',
      route: '../../setting/pharmacy-stock',
    },
  ];


  constructor(
    private PharmacyStockS: PharmacyStockService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewPharmacyStock() {
    this.dialogFormService.open(FormPharmacyStockComponent, {
      context: {
        title: 'Crear Usuario',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditPharmacyStock(data) {
    this.dialogFormService.open(FormPharmacyStockComponent, {
      context: {
        title: 'Editar Usuario',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmPharmacyStock(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePharmacyStock.bind(this),
      },
    });
  }

  DeletePharmacyStock(data) {
    return this.PharmacyStockS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
