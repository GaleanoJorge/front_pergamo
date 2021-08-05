import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { ItemBusinessService } from '../../../business-controller/item-business.service';
import { PermissionBusinessService } from '../../../business-controller/permission-business.service';
import { Item } from '../../../models/item';
import { ItemRolePermissionBusinessService } from '../../../business-controller/item-role-permission-business.service';
import { ItemRolePermission } from '../../../models/item-role-permission';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Role } from '../../../models/role';

@Component({
  selector: 'ngx-roles-permissions',
  templateUrl: './roles-permissions.component.html',
  styleUrls: ['./roles-permissions.component.scss']
})
export class RolesPermissionsComponent implements OnInit {

  public roleForm: FormGroup;
  public roleSelected: Role;
  public isSubmitted = false;
  public messageError: string = null;
  public items: Item[] = [];
  public irp: ItemRolePermission;
  public dialog;

  constructor(
    private formBuilder: FormBuilder,
    public roleBS: RoleBusinessService,
    public itemBS: ItemBusinessService,
    public permissionBS: PermissionBusinessService,
    public itemRolePermission: ItemRolePermissionBusinessService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    this.roleForm = this.formBuilder.group({
      item: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
      permission: ['', Validators.compose([Validators.required])]
    });
    this.roleBS.GetCollection({
      status_id: 1,
    }).then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
    this.itemBS.GetCollection().then(x => {
      this.RecursiveItems(this.itemBS.items);
    }).catch(x => {
      this.messageError = x;
    });
    this.permissionBS.GetCollection().then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

  saveRole() {
    this.isSubmitted = true;
    if (!this.roleForm.invalid)
      this.itemRolePermission.Save({
        item: this.roleForm.controls.item.value,
        rol: this.roleForm.controls.role.value,
        permiso: this.roleForm.controls.permission.value
      }).then(x => {
        this.toastrService.success("", x.message);
        this.onMenuItemSelected(this.roleSelected.id);
      }).catch(x => {
        this.messageError = x;
      });
  }

  onMenuItemSelected(event) {
    this.roleBS.roles.forEach(element => {
      if (element.id == event)
        this.roleSelected = element;
    });
    this.itemRolePermission.GetCollection(this.roleSelected.id).then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

  RecursiveItems(items: Item[], name?: string) {
    items.forEach(element => {
      element.name = name ? name + ' - ' + element.name : element.name;
      this.items.push(element);
      if (element.subitems.length > 0)
        this.RecursiveItems(element.subitems, element.name);
    });
  }

  ConfirmDelete(dialog: TemplateRef<any>, irp: ItemRolePermission) {
    this.irp = irp;
    this.dialog = this.dialogService.open(dialog);
  }

  DeleteIRP() {
    this.dialog.close();
    if (this.irp)
      this.itemRolePermission.Delete(this.irp.id).then(x => {
        this.irp = null;
        this.toastrService.success("", x.message);
        this.onMenuItemSelected(this.roleSelected.id);
      }).catch(x => {
        this.messageError = x;
      });
  }

}
