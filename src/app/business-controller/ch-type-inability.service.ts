import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChTypeInability } from '../models/ch-type-inability';

@Injectable({
  providedIn: 'root'
})
export class ChTypeInabilityService {
  public ch_type_inability: ChTypeInability[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChTypeInability[]> {
    let servObj = new ServiceObject(params ? 'ch_type_inability?pagination=false' : 'ch_type_inability');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_type_inability = <ChTypeInability[]>servObj.data.ch_type_inability;

        return Promise.resolve(this.ch_type_inability);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_type_inability: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_inability');
    servObj.data = ch_type_inability;
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

  Update(ch_type_inability: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_inability', ch_type_inability.id);
    servObj.data = ch_type_inability;
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
    let servObj = new ServiceObject('ch_type_inability', id);
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
