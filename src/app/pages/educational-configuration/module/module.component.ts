import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActionsComponent} from '../../setting/sectional-council/actions.component';
import {FormModuleComponent} from '../module/form-module/form-module.component';
import {NbDialogService} from '@nebular/theme';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {ModuleBusinessService} from '../../../business-controller/module-business.service';

@Component({
  selector: 'ngx-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit {
  @Input() category_id: number = null;

  public title = 'Módulos';
  public messageError = null;
  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditModule.bind(this),
            'delete': this.DeleteConfirmModule.bind(this),
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
      },
      description: {
        title: 'Descripción',
        type: 'html',
        valuePrepareFunction: (value, row) => {
          return value;
        },
      },
      entity_type: {
        title: 'Tipo',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      specialtym: {
        title: 'Especialidad',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private dialogFormService: NbDialogService,
    private moduleBS: ModuleBusinessService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewModule() {
    this.dialogFormService.open(FormModuleComponent, {
      context: {
        title: 'Crear nuevo módulo',
        saved: this.RefreshData.bind(this),
        category_id: this.category_id,
        moduleEdit: false,
      },
    });
  }

  EditModule(data) {
    this.dialogFormService.open(FormModuleComponent, {
      context: {
        title: 'Editar módulo',
        data,
        saved: this.RefreshData.bind(this),
        moduleEdit: false,
        category_id: this.category_id,
      },
    });
  }

  DeleteConfirmModule(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteModule.bind(this),
      },
    });
  }

  DeleteModule(data) {
    return this.moduleBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
