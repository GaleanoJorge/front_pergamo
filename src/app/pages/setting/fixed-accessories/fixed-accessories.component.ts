import { Component, OnInit, ViewChild } from '@angular/core';
import { FixedAccessoriesService } from '../../../business-controller/fixed-accessories.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormFixedAccessoriesComponent } from './form-fixed-accessories/form-fixed-accessories.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-fixed-accessories',
  templateUrl: './fixed-accessories.component.html',
  styleUrls: ['./fixed-accessories.component.scss']
})
export class FixedAccessoriesComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Accesorios en Activos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Cantidad'];
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
            'edit': this.EditFixedAssets.bind(this),
            'delete': this.DeleteConfirmFixedAssets.bind(this),
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
      amount: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Accesorios en Activos',
      route: '../../setting/fixed-accessories',
    },
  ];

  constructor(
    private FixedAccessoriesS: FixedAccessoriesService,
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

  NewFixedAssets() {
    this.dialogFormService.open(FormFixedAccessoriesComponent, {
      context: {
        title: 'Crear Accesorios en Activos',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditFixedAssets(data) {
    this.dialogFormService.open(FormFixedAccessoriesComponent, {
      context: {
        title: 'Editar Accesorios en Activos',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }
  DeleteConfirmFixedAssets(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteFixedAssets.bind(this),
      },
    });
  }

  DeleteFixedAssets(data) {
    return this.FixedAccessoriesS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
