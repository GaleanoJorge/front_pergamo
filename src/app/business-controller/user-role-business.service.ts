import { Injectable } from '@angular/core';
import { ServiceObject } from '../models/service-object';
import { UserRole } from '../models/user-role';
import { WebAPIService } from '../services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleBusinessService {

  public usersRole: UserRole[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection($roleId): Promise<UserRole[]> {
    var servObj = new ServiceObject("userRole/getByRole", $roleId);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.usersRole = <UserRole[]>servObj.data.role;
        return Promise.resolve(this.usersRole);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  Save(obj: any, entity?): Promise<ServiceObject> {
    let service = entity ? entity : 'storeStudent';
    let servObj = new ServiceObject(service);
    servObj.data = obj;
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

  Delete(id, entity?): Promise<ServiceObject> {
    let service = entity ? entity : 'storeStudent';
    let servObj = new ServiceObject(service, id);
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
