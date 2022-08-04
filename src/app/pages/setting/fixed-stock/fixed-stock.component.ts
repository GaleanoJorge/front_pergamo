import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { PharmacyStockService } from '../../../business-controller/pharmacy-stock.service';
import { FormFixedStockComponent } from './form-fixed-stock/form-fixed-stock.component';
import { UserFixedPackageComponent } from './user-fixed-package/user-fixed-package.component';
import { ActionFixedComponent } from './actions.component';

@Component({
  selector: 'ngx-fixed-stock',
  templateUrl: './fixed-stock.component.html',
  styleUrls: ['./fixed-stock.component.scss']
})
export class FixedStockComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'CREAR TIPO DE ACTIVOS EN SEDES';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'TIPO', 'SEDE'];
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
            'edit': this.EditPharmacyStock.bind(this),
            'delete': this.DeleteConfirmPharmacyStock.bind(this),
            'user': this.UserAsigned.bind(this),
          };
        },
        renderComponent: ActionFixedComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      fixed_type: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      campus: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      }
    },
  };

  public routes = [
    {
      name: 'PharmacyStock',
      route: '../../setting/fixed-stock',
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
    this.dialogFormService.open(FormFixedStockComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'CREAR TIPO DE ACTIVO EN SEDE',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditPharmacyStock(data) {
    this.dialogFormService.open(FormFixedStockComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'EDITAR TIPO DE ACTIVO EN SEDE',
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

  UserAsigned(data) {
    this.dialogFormService.open(UserFixedPackageComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'CREAR USUARIOS PARA ACTIVO FIJO',
        data,
        saved: this.RefreshData.bind(this),
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
