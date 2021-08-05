import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Permission } from '../../../models/permission';
import { PermissionBusinessService } from '../../../business-controller/permission-business.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  public permissionForm: FormGroup;
  public isSubmitted = false;
  public messageError: string = null;
  public permission: Permission;
  public dialog;
  routes = [
    {
      name: "Permisos",
      route: "../../setting/permissions"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public permissionBS: PermissionBusinessService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    this.permissionForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      class: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      icon: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      action: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });
    this.GetPermission();
  }

  savePermission() {
    this.isSubmitted = true;
    if (!this.permissionForm.invalid)
      if (this.permission)
        this.permissionBS.Update({
          role_id: 1,
          id: this.permission.id,
          nombre: this.permissionForm.controls.name.value,
          clase: this.permissionForm.controls.class.value,
          icono: this.permissionForm.controls.icon.value,
          accion: this.permissionForm.controls.action.value,
        }).then(x => {
          this.toastrService.success("", x.message);
          this.GetPermission();
        }).catch(x => {
          this.messageError = x;
        });
  }

  Cancel() {
    this.permission = null;
    this.permissionForm.setValue({ name: '', class: '', icon: '', action: '' });
  }

  GetPermission() {
    this.isSubmitted = false;
    this.Cancel();
    this.permissionBS.GetCollection().then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

  EditPermission(permission: Permission) {
    this.permission = permission;
    this.permissionForm.setValue({
      name: permission.name,
      class: permission.class,
      icon: permission.icon,
      action: permission.action
    });
  }
}
