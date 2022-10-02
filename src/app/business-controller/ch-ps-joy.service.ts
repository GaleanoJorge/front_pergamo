import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsJoy } from '../models/ch-ps-joy';

@Injectable({
  providedIn: 'root'
})
export class ChPsJoyService {
  public ch_ps_joy: ChPsJoy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsJoy[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_joy?pagination=false' : 'ch_ps_joy');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_joy = <ChPsJoy[]>servObj.data.ch_ps_joy;

        return Promise.resolve(this.ch_ps_joy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_joy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_joy');
    servObj.data = ch_ps_joy;
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

  Update(ch_ps_joy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_joy', ch_ps_joy.id);
    servObj.data = ch_ps_joy;
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
    let servObj = new ServiceObject('ch_ps_joy', id);
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
