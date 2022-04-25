import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductSubcategoryService } from '../../../business-controller/product-subcategory.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProductSubcategoryComponent } from './form-product-subcategory/form-product-subcategory.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-product-subcategory',
  templateUrl: './product-subcategory.component.html',
  styleUrls: ['./product-subcategory.component.scss']
})
export class ProductSubcategoryComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Subcategoría del Producto';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
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
            'edit': this.EditProductSubcategory.bind(this),
            'delete': this.DeleteConfirmProductSubcategory.bind(this),
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
      name: 'Subcategoria del producto',
      route: '../../setting/product-subcategory',
    },
  ];

  constructor(
    private ProductSubcategoryS: ProductSubcategoryService,
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

  NewProductSubcategory() {
    this.dialogFormService.open(FormProductSubcategoryComponent, {
      context: {
        title: 'Crear nueva Subcategoria del producto',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProductSubcategory(data) {
    this.dialogFormService.open(FormProductSubcategoryComponent, {
      context: {
        title: 'Editar Subcategoria del producto',
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

  DeleteConfirmProductSubcategory(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProductSubcategory.bind(this),
      },
    });
  }

  DeleteProductSubcategory(data) {
    return this.ProductSubcategoryS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
