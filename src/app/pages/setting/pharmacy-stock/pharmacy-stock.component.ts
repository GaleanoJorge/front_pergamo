import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPharmacyStockComponent } from './form-pharmacy-stock/form-pharmacy-stock.component';
import { PharmacyStockService } from '../../../business-controller/pharmacy-stock.service';
import { UserPackageComponent } from './user-package/user-package.component';
import { ActionPharmaComponent } from './actions.component';
import { ServicesPackageComponent } from './services-package/services-package.component';


@Component({
  selector: 'ngx-pharmacy-stock',
  templateUrl: './pharmacy-stock.component.html',
  styleUrls: ['./pharmacy-stock.component.scss']
})
export class PharmacyStockComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'CREAR BODEGA O FARMACIA';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'TIPO', 'NOMBRE', 'SEDE'];
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
            'services': this.ServicesAsigned.bind(this),
          };
        },
        renderComponent: ActionPharmaComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      type_pharmacy_stock: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      name: {
        title: this.headerFields[2],
        type: 'string',
      },
      campus: {
        title: this.headerFields[3],
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
      closeOnBackdropClick: false,
      context: {
        title: 'CREAR FARMACIA O BODEGA',
         saved: this.RefreshData.bind(this),
      },
    });
  }

  EditPharmacyStock(data) {
    this.dialogFormService.open(FormPharmacyStockComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'EDITAR FARMACIA O BODEGA',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  UserAsigned(data) {
    this.dialogFormService.open(UserPackageComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'CREAR USUARIOS PARA FARMACIA O BODEGA',
        data,
           saved: this.RefreshData.bind(this),
      },
    });
  }


  ServicesAsigned(data) {
    this.dialogFormService.open(ServicesPackageComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'TIPOS DE SERVICIOS',
        data: data,
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
