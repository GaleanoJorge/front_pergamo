import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { Role } from '../../../models/role';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { StatusBusinessService } from '../../../business-controller/status-business.service';
import { RoleTypeService } from '../../../business-controller/role-type.service';

@Component({
    selector: 'ngx-roles',
    templateUrl: 'roles.component.html',
    styleUrls: ['roles.component.scss'],
})
export class RolesComponent implements OnInit {

    public roleForm: FormGroup;
    public isSubmitted = false;
    public messageError: string = null;
    public role: Role;
    public dialog;
    routes = [
        {
            name: "Roles",
            route: "../../setting/roles"
        }
    ];

    constructor(
        private formBuilder: FormBuilder,
        public roleBS: RoleBusinessService,
        private toastrService: NbToastrService,
        private dialogService: NbDialogService,
        public statusBS: StatusBusinessService,
        public RoleTypeS: RoleTypeService,
    ) { }

    ngOnInit() {
        this.roleForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            status: ['', Validators.compose([Validators.required])],
            role_type: ['', Validators.compose([Validators.required])],
        });
        this.statusBS.GetCollection().then(x => {
            this.messageError = null;
        }).catch(x => {
            this.messageError = x;
        });
        this.RoleTypeS.GetCollection().then(x => {
            this.messageError = null;
        }).catch(x => {
            this.messageError = x;
        });
        this.GetRoles();
    }

    saveRole() {
        this.isSubmitted = true;
        if (!this.roleForm.invalid)
            if (this.role)
                this.roleBS.Update({
                    id: this.role.id,
                    nombre: this.roleForm.controls.name.value,
                    estado: this.roleForm.controls.status.value,
                    tipo: this.roleForm.controls.role_type.value,
                }).then(x => {
                    this.toastrService.success("", x.message);
                    this.GetRoles();
                }).catch(x => {
                    this.messageError = x;
                });
            else
                this.roleBS.Save({
                    nombre: this.roleForm.controls.name.value,
                    estado: this.roleForm.controls.status.value,
                    tipo: this.roleForm.controls.role_type.value,
                }).then(x => {
                    this.toastrService.success("", x.message);
                    this.GetRoles();
                }).catch(x => {
                    this.messageError = x;
                });
    }

    ConfirmDelete(dialog: TemplateRef<any>) {
        this.dialog = this.dialogService.open(dialog);
    }

    DeleteRole() {
        this.dialog.close();
        if (this.role)
            this.roleBS.Delete(this.role.id).then(x => {
                this.toastrService.success("", x.message);
                this.GetRoles();
            }).catch(x => {
                this.messageError = x;
            });
    }

    EditRole(role: Role) {
        this.role = role;
        this.roleForm.setValue({ name: role.name, status: role.status_id, role_type: role.role_type_id });
    }

    Cancel() {
        this.role = null;
        this.roleForm.setValue({ name: '', status: '', role_type: '' });
    }

    GetRoles() {
        this.isSubmitted = false;
        this.Cancel();
        this.roleBS.GetCollection().then(x => {
            this.messageError = null;
        }).catch(x => {
            this.messageError = x;
        });
    }
}
