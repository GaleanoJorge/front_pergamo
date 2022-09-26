import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TechnologicalMedium } from '../models/technological-medium';

@Injectable({
  providedIn: 'root'
})
export class TechnologicalMediumService {
  public technological_medium: TechnologicalMedium[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TechnologicalMedium[]> {
    let servObj = new ServiceObject(params ? 'technological_medium?pagination=false' : 'technological_medium');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.technological_medium = <TechnologicalMedium[]>servObj.data.technological_medium;

        return Promise.resolve(this.technological_medium);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(technological_medium: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('technological_medium');
    servObj.data = technological_medium;
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

  Update(technological_medium: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('technological_medium', technological_medium.id);
    servObj.data = technological_medium;
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
    let servObj = new ServiceObject('technological_medium', id);
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
