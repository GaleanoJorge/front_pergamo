import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ScopeOfAttention } from '../models/scope-of-attention';

@Injectable({
  providedIn: 'root'
})
export class ScopeOfAttentionService {
  public scope_of_attention: ScopeOfAttention[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ScopeOfAttention[]> {
    let servObj = new ServiceObject(params ? 'scope_of_attention?pagination=false' : 'scope_of_attention');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.scope_of_attention = <ScopeOfAttention[]>servObj.data.scope_of_attention;

        return Promise.resolve(this.scope_of_attention);
      })
      .catch(x => {
        throw x.message;
      });
  }


  GetScopeByAdmission(admission_route_id): Promise<ScopeOfAttention[]> {
    let servObj = new ServiceObject('scopeofattention/byAdmission',admission_route_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.scope_of_attention = <ScopeOfAttention[]>servObj.data.scope_of_attention;
        return Promise.resolve(this.scope_of_attention);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(scope_of_attention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('scope_of_attention');
    servObj.data = scope_of_attention;
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

  Update(scope_of_attention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('scope_of_attention', scope_of_attention.id);
    servObj.data = scope_of_attention;
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
    let servObj = new ServiceObject('scope_of_attention', id);
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
