import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Ostomy } from '../models/ostomy';

@Injectable({
  providedIn: 'root'
})
export class OstomyService {
  public ostomy: Ostomy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Ostomy[]> {
    let servObj = new ServiceObject(params ? 'ostomy?pagination=false' : 'ostomy');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ostomy = <Ostomy[]>servObj.data.ostomy;

        return Promise.resolve(this.ostomy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ostomy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ostomy');
    servObj.data = ostomy;
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

  Update(ostomy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ostomy', ostomy.id);
    servObj.data = ostomy;
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
    let servObj = new ServiceObject('ostomy', id);
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
