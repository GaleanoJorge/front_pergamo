import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeAssetsService } from '../../../business-controller/type-assets.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormTypeAssetsComponent } from './form-type-assets/form-type-assets.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-type-assets',
  templateUrl: './type-assets.component.html',
  styleUrls: ['./type-assets.component.scss']
})
export class TypeAssetsComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo del Activo';
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditTypeAssets.bind(this),
            'delete': this.DeleteConfirmTypeAssets.bind(this),
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
      name: 'Tipo del Activo',
      route: '../../setting/type-assets',
    },
  ];

  constructor(
    private TypeAssetsS: TypeAssetsService,
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

  NewTypeAssets() {
    this.dialogFormService.open(FormTypeAssetsComponent, {
      context: {
        title: 'Crear nuevo tipo de Activo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditTypeAssets(data) {
    this.dialogFormService.open(FormTypeAssetsComponent, {
      context: {
        title: 'Editar tipo del Activo',
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

  DeleteConfirmTypeAssets(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTypeAssets.bind(this),
      },
    });
  }

  DeleteTypeAssets(data) {
    return this.TypeAssetsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
