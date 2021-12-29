import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageConditionsService } from '../../../business-controller/storage-conditions.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormStorageConditionsComponent } from './form-storage-conditions/form-storage-conditions.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-storage-conditions',
  templateUrl: './storage-conditions.component.html',
  styleUrls: ['./storage-conditions.component.scss']
})
export class StorageConditionsComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Condiciones de almacenaje';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre'];
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
            'edit': this.EditStorageConditions.bind(this),
            'delete': this.DeleteConfirmStorageConditions.bind(this),
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
      name: 'Condiciones de almacenaje',
      route: '../../setting/storage-conditions',
    },
  ];

  constructor(
    private StorageConditionsS: StorageConditionsService,
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

  NewStorageConditions() {
    this.dialogFormService.open(FormStorageConditionsComponent, {
      context: {
        title: 'Crear nuevo Condiciones de almacenaje',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditStorageConditions(data) {
    this.dialogFormService.open(FormStorageConditionsComponent, {
      context: {
        title: 'Editar Condiciones de almacenaje',
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

  DeleteConfirmStorageConditions(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteStorageConditions.bind(this),
      },
    });
  }

  DeleteStorageConditions(data) {
    return this.StorageConditionsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
