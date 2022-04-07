import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { RoleType } from '../models/role-type';

@Injectable({
  providedIn: 'root'
})
export class RoleTypeService {
  public role_type: RoleType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<RoleType[]> {
    let servObj = new ServiceObject(params ? 'role_type?pagination=false' : 'role_type');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.role_type = <RoleType[]>servObj.data.role_type;

        return Promise.resolve(this.role_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(role_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('role_type');
    servObj.data = role_type;
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

  Update(role_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('role_type', role_type.id);
    servObj.data = role_type;
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

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('role_type', id);
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
