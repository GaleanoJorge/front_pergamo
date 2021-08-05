import { Component, OnInit, ViewChild } from '@angular/core';
import { SubareaService } from '../../../business-controller/subarea.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormSubareaComponent } from './form-subarea/form-subarea.component';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-subarea',
  templateUrl: './subarea.component.html',
  styleUrls: ['./subarea.component.scss']
})
export class SubareaComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Subárea';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Descripción', 'Estado'];
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
            'edit': this.EditSubarea.bind(this),
            'delete': this.DeleteConfirmSubarea.bind(this),
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
      description: {
        title: this.headerFields[2],
        type: 'string',
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
      name: 'Subárea',
      route: '../../setting/subarea',
    },
  ];

  constructor(
    private subareaS: SubareaService,
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

  NewSubarea() {
    this.dialogFormService.open(FormSubareaComponent, {
      context: {
        title: 'Crear nueva subárea',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditSubarea(data) {
    this.dialogFormService.open(FormSubareaComponent, {
      context: {
        title: 'Editar subárea',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    this.toastrService.info('', 'Cambiando estado');

    this.subareaS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmSubarea(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSubarea.bind(this),
      },
    });
  }

  DeleteSubarea(data) {
    return this.subareaS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}

