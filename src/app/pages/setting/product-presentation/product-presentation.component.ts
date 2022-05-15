import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductPresentationService } from '../../../business-controller/product-presentation.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProductPresentationComponent } from './form-product-presentation/form-product-presentation.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-product-presentation',
  templateUrl: './product-presentation.component.html',
  styleUrls: ['./product-presentation.component.scss']
})
export class ProductPresentationComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Forma farmaceutica';
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
            'edit': this.EditProductPresentation.bind(this),
            'delete': this.DeleteConfirmProductPresentation.bind(this),
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
      name: 'Forma farmaceutica',
      route: '../../setting/product-presentation',
    },
  ];

  constructor(
    private ProductPresentationS: ProductPresentationService,
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

  NewProductPresentation() {
    this.dialogFormService.open(FormProductPresentationComponent, {
      context: {
        title: 'Crear nueva Forma farmaceutica',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProductPresentation(data) {
    this.dialogFormService.open(FormProductPresentationComponent, {
      context: {
        title: 'Editar Forma farmaceutica',
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

  DeleteConfirmProductPresentation(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProductPresentation.bind(this),
      },
    });
  }

  DeleteProductPresentation(data) {
    return this.ProductPresentationS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
