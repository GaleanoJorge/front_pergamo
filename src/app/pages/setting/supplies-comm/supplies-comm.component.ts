import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormSuppliesCommComponent } from './form-supplies-comm/form-supplies-comm.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ProductSuppliesComService } from '../../../business-controller/product-supplies-com.service';

@Component({
  selector: 'ngx-supplies-comm',
  templateUrl: './supplies-comm.component.html',
  styleUrls: ['./supplies-comm.component.scss']
})
export class SuppliesCommComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Insumo comercial';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Insumo'];
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
      product_supplies: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.description + " - " + row.name +" - "+ row.factory.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Insumos',
      route: '../../setting/supplies-comm',
    },
  ];

  constructor(
    private ProductSuppliesComS: ProductSuppliesComService,
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
    this.dialogFormService.open(FormSuppliesCommComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Crear insumo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProduct(data) {
    this.dialogFormService.open(FormSuppliesCommComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Editar insumo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

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
    return this.ProductSuppliesComS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
