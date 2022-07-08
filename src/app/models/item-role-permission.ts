import { MainClass } from './main-class';
import { Role } from './role';
import { Item } from './item';
import { Permission } from './permission';

export class ItemRolePermission extends MainClass {
    id: number;
    item_id: number;
    role_id: number;
    permission_id: number;
    role: Role;
    item: Item;
    permission: Permission;
}
