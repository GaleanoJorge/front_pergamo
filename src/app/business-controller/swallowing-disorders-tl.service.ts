import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { SwallowingDisordersTl } from '../models/swallowing-disorders-tl';

@Injectable({
  providedIn: 'root'
})
export class SwallowingDisordersTlService {
  public swallowing_disorders_tl: SwallowingDisordersTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SwallowingDisordersTl[]> {
    let servObj = new ServiceObject(params ? 'swallowing_disorders_tl?pagination=false' : 'swallowing_disorders_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.swallowing_disorders_tl = <SwallowingDisordersTl[]>servObj.data.swallowing_disorders_tl;

        return Promise.resolve(this.swallowing_disorders_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(swallowing_disorders_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('swallowing_disorders_tl');
    servObj.data = swallowing_disorders_tl;
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

  Update(swallowing_disorders_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('swallowing_disorders_tl', swallowing_disorders_tl.id);
    servObj.data = swallowing_disorders_tl;
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
    let servObj = new ServiceObject('swallowing_disorders_tl', id);
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
