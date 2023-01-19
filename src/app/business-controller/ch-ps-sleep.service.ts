import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsSleep } from '../models/ch-ps-sleep';

@Injectable({
  providedIn: 'root'
})
export class ChPsSleepService {
  public ch_ps_sleep: ChPsSleep[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsSleep[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_sleep?pagination=false' : 'ch_ps_sleep');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_sleep = <ChPsSleep[]>servObj.data.ch_ps_sleep;

        return Promise.resolve(this.ch_ps_sleep);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_sleep: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_sleep');
    servObj.data = ch_ps_sleep;
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

  Update(ch_ps_sleep: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_sleep', ch_ps_sleep.id);
    servObj.data = ch_ps_sleep;
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
    let servObj = new ServiceObject('ch_ps_sleep', id);
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
