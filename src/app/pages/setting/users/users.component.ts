import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../../components/status-field/status-field.component';
import { ActionsUsersComponent } from './actions-users.component';


@Component({
    selector: 'ngx-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {

    public role = 0;
    public roleCreate = 0;
    public data: any[] = [];
    public roles: any[] = [];
    public messageError: string = null;
    public dialog;
    public title = 'Usuarios';
    public headerFields: any[] = ['Tipo identificación', 'Identificación', 'Nombres', 'Correo', 'Estado'];
    public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
    public subtitle = 'Directorio';

    @ViewChild(BaseTableComponent) table: BaseTableComponent;

    public routes = [
        {
            name: 'Usuarios',
            route: '../../setting/users',
        },
    ];

    public settings = {

        columns: {
            actions: {
                title: 'Acciones',
                type: 'custom',
                valuePrepareFunction: (value, row) => {
                    // DATA FROM HERE GOES TO renderComponent
                    return {
                        'data': row,
                        'reset_password': this.UpdateResetPassword.bind(this),
                    };
                },
                renderComponent: ActionsUsersComponent,
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
        private roleS: RoleBusinessService,
        private toastrService: NbToastrService,
        private dialogService: NbDialogService
    ) {

    }
    ngOnInit(): void {
        this.roleS.GetCollection().then((x) => {
            this.roles = x;
        }).catch((x) => {
            this.toastrService.danger(x.message);
        });
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

    ChangeRole(role) {
        this.role = role;
        this.table.changeEntity(`user/all/${this.role}`);
        // this.RefreshData();
    }

    UpdateResetPassword(data) {
        this.userS.ChangeForceresetPassword(data.id, !data.force_reset_password).then(x => {
            this.toastrService.success('', x.message);
            this.table.refresh();
        }).catch((x) => {
            // this.toastrService.danger(x.message);
        });
    }

    open(dialog: TemplateRef<any>) {
        this.dialogService.open(dialog);
    }

}
