import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChBackground } from '../models/ch-background';

@Injectable({
  providedIn: 'root'
})
export class ChBackgroundService {
  public ch_background: ChBackground[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChBackground[]> {
    let servObj = new ServiceObject(params ? 'ch_background?pagination=false' : 'ch_background');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_background = <ChBackground[]>servObj.data.ch_background;

        return Promise.resolve(this.ch_background);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_background: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_background');
    servObj.data = ch_background;
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

  Update(ch_background: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_background', ch_background.id);
    servObj.data = ch_background;
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
    let servObj = new ServiceObject('ch_background', id);
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
