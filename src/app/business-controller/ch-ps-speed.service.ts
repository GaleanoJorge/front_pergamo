import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsSpeed } from '../models/ch-ps-speed';

@Injectable({
  providedIn: 'root'
})
export class ChPsSpeedService {
  public ch_ps_speed: ChPsSpeed[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsSpeed[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_speed?pagination=false' : 'ch_ps_speed');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_speed = <ChPsSpeed[]>servObj.data.ch_ps_speed;

        return Promise.resolve(this.ch_ps_speed);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_speed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_speed');
    servObj.data = ch_ps_speed;
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

  Update(ch_ps_speed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_speed', ch_ps_speed.id);
    servObj.data = ch_ps_speed;
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
    let servObj = new ServiceObject('ch_ps_speed', id);
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
