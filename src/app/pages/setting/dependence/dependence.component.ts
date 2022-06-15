import { Component, OnInit, ViewChild } from '@angular/core';
import { DependenceService } from '../../../business-controller/dependence.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDependenceComponent } from './form-dependence/form-dependence.component';
import { ActionsComponent } from '.././sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-dependence',
  templateUrl: './dependence.component.html',
  styleUrls: ['./dependence.component.scss']
})
export class DependenceComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Dependencia';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditDependence.bind(this),
            'delete': this.DeleteConfirmDependence.bind(this),
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
      status_id: {
        title: this.headerFields[2],
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
      name: 'Dependencia',
      route: '../../setting/dependence',
    },
  ];

  constructor(
    private dependenceS: DependenceService,
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

  NewDependence() {
    this.dialogFormService.open(FormDependenceComponent, {
      context: {
        title: 'Crear Nueva dependencia',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDependence(data) {
    this.dialogFormService.open(FormDependenceComponent, {
      context: {
        title: 'Editar dependencia',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    // this.toastrService.info('', 'Cambiando estado');

    this.dependenceS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmDependence(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDependence.bind(this),
      },
    });
  }

  DeleteDependence(data) {
    return this.dependenceS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
