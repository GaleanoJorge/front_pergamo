import {Component, OnInit, ViewChild} from '@angular/core';
import {SpecialtymService} from '../../../business-controller/specialtym.service';
import {StatusFieldComponent} from '../../components/status-field/status-field.component.js';
import {NbToastrService, NbDialogService} from '@nebular/theme';
import {FormSpecialtymComponent} from './form-specialtym/form-specialtym.component';
import {ActionsComponent} from '../../setting/sectional-council/actions.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-specialtym',
  templateUrl: './specialtym.component.html',
  styleUrls: ['./specialtym.component.scss'],
})
export class SpecialtymComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Especialidades';
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
            'edit': this.EditSpecialtym.bind(this),
            'delete': this.DeleteConfirmSpecialtym.bind(this),
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
      status_id: {
        title: 'Estado',
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
      name: 'Specialtym',
      route: '../../educationalconfiguration/specialtym',
    },
  ];

  constructor(
    private specialtymS: SpecialtymService,
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

  NewSpecialtym() {
    this.dialogFormService.open(FormSpecialtymComponent, {
      context: {
        title: 'Crear nueva especialidad',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditSpecialtym(data) {
    this.dialogFormService.open(FormSpecialtymComponent, {
      context: {
        title: 'Editar especialidad',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    this.toastrService.info('', 'Cambiando estado');

    this.specialtymS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmSpecialtym(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSpecialtym.bind(this),
      },
    });
  }

  DeleteSpecialtym(data) {
    return this.specialtymS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
