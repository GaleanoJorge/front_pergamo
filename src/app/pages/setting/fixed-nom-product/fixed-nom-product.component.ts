import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { NomProductService } from '../../../business-controller/nom-product.service';
import { FixedFormNomProductComponent } from './form-fixed-nom-product/form-fixed-nom-product.component';

@Component({
  selector: 'ngx-fixed-nom-product',
  templateUrl: './fixed-nom-product.component.html',
  styleUrls: ['./fixed-nom-product.component.scss']
})
export class FixedNomProductComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Nombre del Activo';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Clasificación'];
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
      fixed_clasification: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.fixed_code.name + " - " +value.name;
      },
      },
    },
  };

  constructor(
    private NomProductS: NomProductService,
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
    this.dialogFormService.open(FixedFormNomProductComponent, {
      context: {
        title: 'Crear nueva descripción de activo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProductSubcategory(data) {
    this.dialogFormService.open(FixedFormNomProductComponent, {
      context: {
        title: 'Crear nueva descripción de activo',
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
