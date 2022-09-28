import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsAttitude } from '../models/ch-ps-attitude';

@Injectable({
  providedIn: 'root'
})
export class ChPsAttitudeService {
  public ch_ps_attitude: ChPsAttitude[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsAttitude[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_attitude?pagination=false' : 'ch_ps_attitude');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_attitude = <ChPsAttitude[]>servObj.data.ch_ps_attitude;

        return Promise.resolve(this.ch_ps_attitude);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_attitude: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_attitude');
    servObj.data = ch_ps_attitude;
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

  Update(ch_ps_attitude: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_attitude', ch_ps_attitude.id);
    servObj.data = ch_ps_attitude;
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
    let servObj = new ServiceObject('ch_ps_attitude', id);
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
