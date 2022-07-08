import { Injectable } from '@angular/core';
import { Permission } from '../models/permission';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';

@Injectable({
  providedIn: 'root'
})
export class PermissionBusinessService {

  public permissions: Permission[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(): Promise<Permission[]> {
    var servObj = new ServiceObject("permission");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.permissions = <Permission[]>servObj.data.permissions;
        return Promise.resolve(this.permissions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Update(permission: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("permission", permission.id);
    servObj.data = permission;
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

}
