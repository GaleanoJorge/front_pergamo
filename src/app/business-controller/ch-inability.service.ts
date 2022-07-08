import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChInability } from '../models/ch-inability';

@Injectable({
  providedIn: 'root'
})
export class ChInabilityService {
  public ch_inability: ChInability[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChInability[]> {
    let servObj = new ServiceObject(params ? 'ch_inability?pagination=false' : 'ch_inability');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_inability = <ChInability[]>servObj.data.ch_inability;

        return Promise.resolve(this.ch_inability);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_inability: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_inability');
    servObj.data = ch_inability;
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

  Update(ch_inability: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_inability', ch_inability.id);
    servObj.data = ch_inability;
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
    let servObj = new ServiceObject('ch_inability', id);
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
