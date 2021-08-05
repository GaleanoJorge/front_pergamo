import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { UserRoleBusinessService } from '../../../../business-controller/user-role-business.service';
import { Group } from '../../../../models/group';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { ActionsExtraordinaryComponent } from '../actions-extraordinary.component';
import { FormExtraordinaryActionCoordinatorComponent } from '../form-extraordinary-action-coordinator/form-extraordinary-action-coordinator.component';
import { FormExtraordinaryActionFormerComponent } from '../form-extraordinary-action-former/form-extraordinary-action-former.component';
import { FormExtraordinaryActionComponent } from '../form-extraordinary-action/form-extraordinary-action.component';

@Component({
  selector: 'ngx-extraordinary-action-former',
  templateUrl: './extraordinary-action-former.component.html',
  styleUrls: ['./extraordinary-action-former.component.scss'],
})
export class ExtraordinaryActionFormerComponent implements OnInit {

  public role: number;
  public id: number;
  public routes = [];

  public data: any[] = [];
  public messageError: string = null;
  public title = 'Acciones Extraordinarias';
  public roleName = '';
  public headerFields: any[] = ['Programa', 'Estado'];
  public subtitle = 'Directorio';

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {

    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.Update.bind(this),
            'delete': this.Delete.bind(this),
          };
        },
        renderComponent: ActionsExtraordinaryComponent,
      },
      category_name: {
        title: this.headerFields[0],
        type: 'string',
        // valuePrepareFunction(value) {
        //   return value?.name;
        // },
      },
      inscription_status_name: {
        title: this.headerFields[1],
        type: 'string',
        // valuePrepareFunction(value) {
        //   return value?.coursebase.name;
        // },
      }
    },
  };

  constructor(
    private route: ActivatedRoute,
    public userBS: UserBusinessService,
    public roleS: RoleBusinessService,
    private dialogFormService: NbDialogService,
    private userRoleBS: UserRoleBusinessService
  ) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.params.roleId;
    this.id = this.route.snapshot.params.id;
    this.routes = [
      {
        name: 'Usuarios',
        route: '../../../../../setting/users',
      },
      {
        name: 'Acciones Extraordinarias',
        route: '../../../../../setting/users/extraordinary-action-former/' + this.route.snapshot.params['id'] + '/' + this.role,
      },
    ];
    this.userBS.GetUserById(this.id);
    this.roleS.GetSingle(this.role).then(x => {
      this.roleName = 'Cargo "' + x[0].name + '"';
    }).catch(x => {
      throw new Error('Method not implemented.');
    });
  }

  New() {
    this.dialogFormService.open(FormExtraordinaryActionFormerComponent, {
      context: {
        title: 'Asociar formador "Extraordinario"',
        saved: this.RefreshData.bind(this),
        data: {
          user_id: this.id,
          role_id: this.role
        }
      },
    });
  }

  Update(rowData) {
    this.dialogFormService.open(FormExtraordinaryActionFormerComponent, {
      context: {
        title: 'Actualizar formador "Extraordinario"',
        saved: this.RefreshData.bind(this),
        data: {
          user_id: this.id,
          role_id: this.role,
          course: rowData
        }
      },
    });
  }

  Delete(rowData) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        delete: this.DeleteURG.bind(this),
        data: rowData
      },
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  DeleteURG(data) {
    return this.userRoleBS.Delete(data.user_role_category_inscription_id, 'destroyFormer').then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
