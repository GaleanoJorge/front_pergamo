import { Injectable } from '@angular/core';
import { ItemRolePermission } from '../models/item-role-permission';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';

@Injectable({
  providedIn: 'root'
})
export class ItemRolePermissionBusinessService {

  public itemsRolePermission: ItemRolePermission[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(idRole: number): Promise<ItemRolePermission[]> {
    var servObj = new ServiceObject("item/role/permission/byRole", idRole);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        /*Armando los permisos*/
        localStorage.setItem('permissions', JSON.stringify(servObj.data.itemRolePermission));

        /*Armando el menu*/
        const mainMenu = [];
        servObj.data.itemRolePermission.forEach(element => {
          if (!element.item.item_parent_id && element.permission_id === 1 && element.item.show_menu) {
            mainMenu.push({
              id: element.item.id,
              title: element.item.name,
              icon: element.item.icon,
              link: element.item.route,
              children: [],
            });
          } else {
            mainMenu.forEach(elementB => {
              if (elementB.id === element.item.item_parent_id && element.permission_id === 1 && element.item.show_menu) {
                if( elementB.children.findIndex(x => x.id === element.item.id) === -1){
                elementB.children.push({
                  id: element.item.id,
                  title: element.item.name,
                  icon: element.item.icon,
                  link: element.item.route,
                  children:[],
                });
              }
            }
            });
          }    
        });
        mainMenu.forEach(elementC => {
          if(elementC.children.length!=0){
              elementC.children.forEach(elementD => {
                servObj.data.itemRolePermission.forEach(element => {
                  if (elementD.id === element.item.item_parent_id && element.permission_id === 1 && element.item.show_menu) {
                  if( elementD.children.findIndex(x => x.id === element.item.id) === -1){
                    elementD.children.push({
                      id: element.item.id,
                      title: element.item.name,
                      icon: element.item.icon,
                      link: element.item.route,
                      children:[],
                    });
                  }
              }
            });
          });
        }
       });
      

      mainMenu.forEach(elementE => {
        if(elementE.children.length!=0){
          elementE.children.forEach(elementF => {
            if(elementF.children){
              elementF.children.forEach(elementG => {
                if(elementG.children){
                servObj.data.itemRolePermission.forEach(elementH => {
            if (elementG.id === elementH.item.item_parent_id && elementH.permission_id === 1 && elementH.item.show_menu) {
              if( elementG.children.findIndex(x => x.id === elementH.item.id) === -1){
              elementG.children.push({
                id: elementH.item.id,
                title: elementH.item.name,
                icon: elementH.item.icon,
                link: elementH.item.route,
              });
            }
            }
          });
        }
          });
          }
          });

      }
      
    });
        console.log(mainMenu);
        mainMenu.forEach(element => {
          if (element.children && element.children.length === 0){ 
            delete element.children;
          }else{
            element.children.forEach(elementB => {
              if (elementB.children && elementB.children.length === 0){ 
                delete elementB.children;
              }else{
                elementB.children.forEach(elementC => {
                  if (elementC.children && elementC.children.length === 0){ 
                    delete elementC.children;
                  }
                });
              }

            });
          }
     
        });

        localStorage.setItem('mainMenu', JSON.stringify(mainMenu));
        localStorage.setItem('firstMenu', JSON.stringify(mainMenu[0]));

        this.itemsRolePermission = <ItemRolePermission[]>servObj.data.itemRolePermission;
        return Promise.resolve(this.itemsRolePermission);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(itemRolePermission: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("item/role/permission");
    servObj.data = itemRolePermission;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Update(itemRolePermission: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("item/role/permission", itemRolePermission.id);
    servObj.data = itemRolePermission;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Delete(id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("item/role/permission", id);
    return this.webAPI.DeleteAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
