import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleBusinessService {

  public roles: Role[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<Role[]> {
    var servObj = new ServiceObject(params ? 'role?pagination=false' : 'role');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.roles = <Role[]>servObj.data.roles;
        return Promise.resolve(this.roles);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetSingle(id: number): Promise<Role[]> {
    var servObj = new ServiceObject("role", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.roles = <Role[]>servObj.data.role;
        return Promise.resolve(this.roles);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  Save(role: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("role");
    servObj.data = role;
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

  Update(role: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("role", role.id);
    servObj.data = role;
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
    var servObj = new ServiceObject("role", id);
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

  GetCustomFields(id: number): Promise<any[]> {
    var servObj = new ServiceObject("customField/allByUserRole", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any[]>servObj.data.customFieldUserRole);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }
}
