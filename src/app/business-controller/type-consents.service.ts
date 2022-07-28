import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TypeConsents } from '../models/type-consents';

@Injectable({
  providedIn: 'root'
})
export class TypeConsentsService {
  public type_consents: TypeConsents[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypeConsents[]> {
    let servObj = new ServiceObject(params ? 'type_consents?pagination=false' : 'type_consents');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_consents = <TypeConsents[]>servObj.data.type_consents;

        return Promise.resolve(this.type_consents);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_consents: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_consents');
    servObj.data = type_consents;
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

  Update(type_consents: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_consents', type_consents.id);
    servObj.data = type_consents;
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
    let servObj = new ServiceObject('type_consents', id);
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
