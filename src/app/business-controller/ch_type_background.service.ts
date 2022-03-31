import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChTypeBackground } from '../models/ch-type-background';

@Injectable({
  providedIn: 'root'
})
export class ChTypeBackgroundService {
  public ch_type_background: ChTypeBackground[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChTypeBackground[]> {
    let servObj = new ServiceObject(params ? 'ch_type_background?pagination=false' : 'ch_type_background');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_type_background = <ChTypeBackground[]>servObj.data.ch_type_background;

        return Promise.resolve(this.ch_type_background);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_type_background: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_background');
    servObj.data = ch_type_background;
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

  Update(ch_type_background: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_background', ch_type_background.id);
    servObj.data = ch_type_background;
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
    let servObj = new ServiceObject('ch_type_background', id);
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
