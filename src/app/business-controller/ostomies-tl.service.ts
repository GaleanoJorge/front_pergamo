import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { OstomiesTl } from '../models/ostomies-tl';

@Injectable({
  providedIn: 'root'
})
export class OstomiesTlService {
  public ostomies_tl: OstomiesTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<OstomiesTl[]> {
    let servObj = new ServiceObject(params ? 'ostomies_tl?pagination=false' : 'ostomies_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ostomies_tl = <OstomiesTl[]>servObj.data.ostomies_tl;

        return Promise.resolve(this.ostomies_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ostomies_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ostomies_tl');
    servObj.data = ostomies_tl;
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

  Update(ostomies_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ostomies_tl', ostomies_tl.id);
    servObj.data = ostomies_tl;
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
    let servObj = new ServiceObject('ostomies_tl', id);
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
