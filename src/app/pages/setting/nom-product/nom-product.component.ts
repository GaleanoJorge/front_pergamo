import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormNomProductComponent } from './form-nom-product/form-nom-product.component';
import { NomProductService } from '../../../business-controller/nom-product.service';


@Component({
  selector: 'ngx-nom-product',
  templateUrl: './nom-product.component.html',
  styleUrls: ['./nom-product.component.scss']
})
export class NomProductComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Nombre del Producto';
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

  constructor(
    private NomProductS: NomProductService,
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
    this.dialogFormService.open(FormNomProductComponent, {
      context: {
        title: 'Crear nueva Subcategoria del producto',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProductSubcategory(data) {
    this.dialogFormService.open(FormNomProductComponent, {
      context: {
        title: 'Editar Subcategoria del producto',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

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
    return this.NomProductS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
