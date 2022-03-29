import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityService } from '../../../business-controller/entity.service';
import { StatusFieldComponent } from '.././sectional-council/status-field.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormEntityComponent } from './form-entity/form-entity.component';
import { ActionsComponent } from '.././sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Entidades';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Entidades', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;
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
            'delete': this.DeleteConfirmEntity.bind(this),
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
      entity: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          if(value==null){
            
          }else{
            return value.name;
          }
          //return row.name;
        },
      },
      status_id: {
        title: this.headerFields[3],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'changeState': this.ChangeState.bind(this),
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  public routes = [
    {
      name: 'Entidad',
      route: '../../setting/entity',
    },
  ];

  constructor(
    private entityS: EntityService,
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
    this.dialogFormService.open(FormEntityComponent, {
      context: {
        title: 'Crear nueva entidad',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditEntity(data) {
    this.dialogFormService.open(FormEntityComponent, {
      context: {
        title: 'Modificar entidad',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    this.toastrService.info('', 'Cambiando estado');

    this.entityS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.table.refresh();
    }).catch((x) => {
      this.toastrService.danger(x.message);
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
