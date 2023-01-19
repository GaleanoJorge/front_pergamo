import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecialtyService } from '../../../business-controller/specialty.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../sectional-council/status-field.component'
import { ActionsComponent } from '../sectional-council/actions.component';
import { FormSpecialtyComponent } from './form-specialty/form-specialty.component';

@Component({
  selector: 'ngx-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Especialidad';
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
          return {
            'data': row,
            'edit': this.EditSpecialty.bind(this),
            'delete': this.DeleteConfirmSpecialty.bind(this),
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
        type: 'string'
      },
      status_id: {
        title: this.headerFields[2],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'changeState': this.ChangeState.bind(this)
          };
        },
        renderComponent: StatusFieldComponent
      },
    },
  };

  public routes = [
    {
      name: 'Especialidades',
      route: '../../setting/specialty',
    },
  ]
  constructor(
    private especialtyS: SpecialtyService,
    private toastrEspecialty: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) { }

  ngOnInit(): void {
  }

  refreshData() {
    this.table.refresh();
  }

  NewSpecialty() {
    this.dialogFormService.open(FormSpecialtyComponent, {
      context: {
        title: 'Crear una nueva especialidad',
        saved: this.refreshData.bind(this),
      },
    });
  }

  EditSpecialty(data) {
    this.dialogFormService.open(FormSpecialtyComponent, {
      context: {
        title: 'Crear nueva especialidad',
        data,
        saved: this.refreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;
    this.toastrEspecialty.info('', 'Cambiando estado');
    this.especialtyS.Update(data).then(x => {
      this.toastrEspecialty.success('', x.message);
      this.table.refresh();
    }).catch(x => {
      this.toastrEspecialty.danger(x.message);
    });
  }

  DeleteConfirmSpecialty(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSpecialty.bind(this),
      },
    });
  }

  DeleteSpecialty(data) {
    return this.especialtyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
