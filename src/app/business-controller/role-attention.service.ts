import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { RoleAttention } from '../models/role-attention';

@Injectable({
  providedIn: 'root'
})
export class RoleAttentionService {
  public role_attention: RoleAttention[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<RoleAttention[]> {
    let servObj = new ServiceObject(params ? 'role_attention?pagination=false' : 'role_attention');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.role_attention = <RoleAttention[]>servObj.data.role_attention;

        return Promise.resolve(this.role_attention);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(role_attention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('role_attention');
    servObj.data = role_attention;
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

  Update(role_attention: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('role_attention', role_attention.id ? role_attention.id : id);
    servObj.data = role_attention;
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
    let servObj = new ServiceObject('role_attention', id);
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
