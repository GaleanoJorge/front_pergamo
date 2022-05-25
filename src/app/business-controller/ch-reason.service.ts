import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChReason } from '../models/ch-reason';

@Injectable({
  providedIn: 'root'
})
export class ChReasonService {
  public ch_reason: ChReason[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChReason[]> {
    let servObj = new ServiceObject(params ? 'ch_reason?pagination=false' : 'ch_reason');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_reason = <ChReason[]>servObj.data.ch_reason;

        return Promise.resolve(this.ch_reason);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_reason: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_reason');
    servObj.data = ch_reason;
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

  Update(ch_reason: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_reason', ch_reason.id);
    servObj.data = ch_reason;
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
    let servObj = new ServiceObject('ch_reason', id);
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
