import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductConcentrationService } from '../../../business-controller/product-concentration.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProductConcentrationComponent } from './form-product-concentration/form-product-concentration.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-product-concentration',
  templateUrl: './product-concentration.component.html',
  styleUrls: ['./product-concentration.component.scss']
})
export class ProductConcentrationComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Concentración del Producto';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Valor'];
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
            'edit': this.EditProductConcentration.bind(this),
            'delete': this.DeleteConfirmProductConcentration.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      value: {
        title: this.headerFields[1],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Concentración del producto',
      route: '../../setting/product-concentration',
    },
  ];

  constructor(
    private ProductConcentrationS: ProductConcentrationService,
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

  NewProductConcentration() {
    this.dialogFormService.open(FormProductConcentrationComponent, {
      context: {
        title: 'Crear nueva Concentración del producto',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProductConcentration(data) {
    this.dialogFormService.open(FormProductConcentrationComponent, {
      context: {
        title: 'Editar Concentración del producto',
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

  DeleteConfirmProductConcentration(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProductConcentration.bind(this),
      },
    });
  }

  DeleteProductConcentration(data) {
    return this.ProductConcentrationS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
