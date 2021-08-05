import { Component, ViewChild } from '@angular/core';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ActionsComponent } from './actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-students',
  templateUrl: 'students.component.html',
  styleUrls: ['students.component.scss'],
})

export class StudentsComponent {
  public data: any[] = [];
  public messageError: string = null;
  public dialog;
  public title = 'Discentes';
  public headerFields: any[] = ['Tipo identificación', 'Identificación', 'Nombres', 'Correo', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public subtitle = 'Directorio';

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public routes = [
    {
      name: 'Discentes',
      route: '../../student/students',
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
            'delete': this.DeleteConfirmStudent.bind(this),
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

  constructor(
    private userS: UserBusinessService,
    private toastrService: NbToastrService,
    private deleteConfirmService: NbDialogService,
  ) {

  }

  RefreshData() {
    this.table.refresh();
  }

  ChangeState(data) {
    this.userS.ChangeStatus(data.id).then((x) => {
      this.toastrService.success('', x.message);
      this.RefreshData();
    }).catch((x) => {
      // this.toastrService.danger(x.message);
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

  DeleteConfirmStudent(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.firstname,
        data: data,
        delete: this.DeleteStudent.bind(this),
      },
    });
  }

  DeleteStudent(data) {
    return this.userS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
