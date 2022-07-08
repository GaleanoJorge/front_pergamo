import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSigns } from '../models/ch-signs';

@Injectable({
  providedIn: 'root'
})
export class ChSignsService {
  public ch_signs: ChSigns[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSigns[]> {
    let servObj = new ServiceObject(params ? 'ch_signs?pagination=false' : 'ch_signs');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_signs = <ChSigns[]>servObj.data.ch_signs;

        return Promise.resolve(this.ch_signs);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_signs: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_signs');
    servObj.data = ch_signs;
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

  Update(ch_signs: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_signs', ch_signs.id);
    servObj.data = ch_signs;
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
    let servObj = new ServiceObject('ch_signs', id);
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
