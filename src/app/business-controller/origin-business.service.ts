import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { Origin } from '../models/origin';
import { ServiceObject } from '../models/service-object';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OriginBusinessService {

  public origins: Origin[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<Origin[]> {
    var servObj = new ServiceObject("origin");
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.origins = <Origin[]>servObj.data.origins.data ?? <Origin[]>servObj.data.origins;
        return Promise.resolve(this.origins);
      })
      .catch(x => {
        throw x.message;
      });
  }
  Save(org: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('origin');
    servObj.data = org;
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

  Update(org: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('origin', org.id);
    servObj.data = org;
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
  GetByOrigin(org: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('category/categoryByOrigin', org.id);
    servObj.data = org;
    return this.webAPI.GetAction(servObj)
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
  GetOriginId(org: number): Promise<Origin[]> {
    let servObj = new ServiceObject('origin', org);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.origins = <Origin[]>servObj.data.origin[0];
        return Promise.resolve(this.origins);
      })
      .catch(x => {
        throw x.message;
      });
  }
  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('origin', id);
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

  GetByValidity(id: number): Promise<any> {
    var servObj = new ServiceObject("origin");
    var paramsMain = new HttpParams().set("validity_id", id.toString());
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj.data.origins);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
