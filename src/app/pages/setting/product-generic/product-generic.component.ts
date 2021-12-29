import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductGenericService } from '../../../business-controller/product-generic.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProductGenericComponent } from './form-product-generic/form-product-generic.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-product-generic',
  templateUrl: './product-generic.component.html',
  styleUrls: ['./product-generic.component.scss']
})
export class ProductGenericComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Productos Genericos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Descripción'];
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
            'edit': this.EditProductGeneric.bind(this),
            'delete': this.DeleteConfirmProductGeneric.bind(this),
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
      description: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Productos Genericos',
      route: '../../setting/product-generic',
    },
  ];

  constructor(
    private ProductGenericS: ProductGenericService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewProductGeneric() {
    this.dialogFormService.open(FormProductGenericComponent, {
      context: {
        title: 'Crear producto generico',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProductGeneric(data) {
    this.dialogFormService.open(FormProductGenericComponent, {
      context: {
        title: 'Editar producto generico',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.regionS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmProductGeneric(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProductGeneric.bind(this),
      },
    });
  }

  DeleteProductGeneric(data) {
    return this.ProductGenericS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
