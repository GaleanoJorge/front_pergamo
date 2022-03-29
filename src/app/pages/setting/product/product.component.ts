import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../business-controller/product.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProductComponent } from './form-product/form-product.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Productos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre'];
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditProduct.bind(this),
            'delete': this.DeleteConfirmProduct.bind(this),
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
    },
  };

  public routes = [
    {
      name: 'Productos',
      route: '../../setting/product',
    },
  ];

  constructor(
    private ProductS: ProductService,
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

  NewProduct() {
    this.dialogFormService.open(FormProductComponent, {
      context: {
        title: 'Crear producto',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProduct(data) {
    this.dialogFormService.open(FormProductComponent, {
      context: {
        title: 'Editar producto',
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

  DeleteConfirmProduct(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProduct.bind(this),
      },
    });
  }

  DeleteProduct(data) {
    return this.ProductS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
