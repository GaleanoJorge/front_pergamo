import {Component, OnInit, TemplateRef, Pipe, ViewChild} from '@angular/core';
import {NbToastrService, NbDialogService, NbWindowService} from '@nebular/theme';
import {ActionsComponent} from './actions.component';
import {StatusFieldComponent} from '../../components/status-field/status-field.component';
import {UserBusinessService} from '../../../business-controller/user-business.service';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-teachers',
  templateUrl: 'teachers.component.html',
  styleUrls: ['teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  public data: any[] = [];
  public messageError: string = null;
  public dialog;
  public headerFields: any[] = ['Tipo identificación', 'Identificación', 'Nombres', 'Correo', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;

  public title = 'Formadores';
  public subtitle = 'Directorio';

  public routes = [
    {
      name: 'Formadores',
      route: '../../teacher/teachers',
    },
  ];

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            // 'edit': this.EditStudent.bind(this),
            'delete': this.DeleteConfirmTeacher.bind(this),
            'reset_password': this.UpdateResetPassword.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      identification_type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
      status_id: {
        title: this.headerFields[4],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'changeState': this.ChangeState.bind(this),
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private userS: UserBusinessService,
    private toastrService: NbToastrService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit() {

  }

  RefreshData() {
    this.table.refresh();
  }

  DeleteConfirmTeacher(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.firstname,
        data: data,
        delete: this.DeleteTeacher.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.userS.ChangeStatus(data.id).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      // this.toastrService.danger(x.message);
    });
  }

  DeleteTeacher(data) {
    return this.userS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  UpdateResetPassword(data) {
    this.userS.ChangeForceresetPassword(data.id, !data.force_reset_password).then(x => {
      this.toastrService.success('', x.message);
      this.table.refresh();
    }).catch((x) => {
      // this.toastrService.danger(x.message);
    });
  }
}
