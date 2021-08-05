import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityTypeService } from '../../../business-controller/entity-type.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormEntityTypeComponent } from './form-entity-type/form-entity-type.component';
import { ActionsComponent } from '../.././setting/sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-entity-type',
  templateUrl: './entity-type.component.html',
  styleUrls: ['./entity-type.component.scss']
})
export class EntityTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipos de Entidad';
  public subtitle: string = 'Gestión';
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditEntity.bind(this),
            'delete': this.DeleteEntity.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      }
    },
  };

  public routes = [
    {
      name: 'Tipos de Entidad',
      route: '../../educationalconfiguration/enity',
    },
  ];

  constructor(
    private entityS: EntityTypeService,
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

  NewEntity() {
    this.dialogFormService.open(FormEntityTypeComponent, {
      context: {
        title: 'Crear nueva entidad',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditEntity(data) {
    this.dialogFormService.open(FormEntityTypeComponent, {
      context: {
        title: 'Editar entidad',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmEntity(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteEntity.bind(this),
      },
    });
  }

  DeleteEntity(data) {
    return this.entityS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
