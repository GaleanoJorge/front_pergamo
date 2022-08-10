import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwActivity } from '../models/ch-sw-activity';

@Injectable({
  providedIn: 'root'
})
export class ChSwActivityService {
  public ch_sw_activity: ChSwActivity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwActivity[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_activity?pagination=false' : 'ch_sw_activity');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_activity = <ChSwActivity[]>servObj.data.ch_sw_activity;

        return Promise.resolve(this.ch_sw_activity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_activity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_activity');
    servObj.data = ch_sw_activity;
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

  Update(ch_sw_activity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_activity', ch_sw_activity.id);
    servObj.data = ch_sw_activity;
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
    let servObj = new ServiceObject('ch_sw_activity', id);
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
