import { Component, OnInit, ViewChild } from '@angular/core';
import { FixedAssetsService } from '../../../business-controller/fixed-assets.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormFixedAssetsComponent } from './form-fixed-assets/form-fixed-assets.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})
export class FixedAssetsComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Activos Fijos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Descripción', 'Marca', 'Modelo', 'Serial', 'Sede'];
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
      fixed_nom_product: {
        title: this.headerFields[1],
        type: 'string', 
        valuePrepareFunction: (value, row) => {
          return value.name;
        },   
      },
      mark: {
        title: this.headerFields[2],
        type: 'string',
      },

      model: {
        title: this.headerFields[3],
        type: 'string',
      },

      serial: {
        title: this.headerFields[4],
        type: 'string',
      },
      campus: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_stock.campus.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Activos Fijos',
      route: '../../setting/fixed-assets',
    },
  ];

  constructor(
    private FixedAssetsS: FixedAssetsService,
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
    this.dialogFormService.open(FormFixedAssetsComponent, {
      context: {
        title: 'Crear activos Fijos',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditFixedAssets(data) {
    this.dialogFormService.open(FormFixedAssetsComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Editar activos Fijos',
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
    return this.FixedAssetsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
